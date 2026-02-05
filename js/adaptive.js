/**
 * Adaptive Question Selection Module
 * Selects questions based on uncertainty in each dimension
 */

const Adaptive = {
    // Mode configurations
    modes: {
        quick: {
            maxQuestions: 20,
            minQuestions: 12, // Minimum before early stopping allowed
            initialPerDimension: 1,
            uncertaintyThreshold: 0.15 // Higher threshold = stricter early stop
        },
        full: {
            maxQuestions: 40,
            minQuestions: 24, // Minimum before early stopping allowed
            initialPerDimension: 2,
            uncertaintyThreshold: 0.20
        }
    },

    // Shuffle array using Fisher-Yates algorithm
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    // Group questions by dimension
    groupByDimension(questions) {
        const groups = { EI: [], SN: [], TF: [], JP: [] };
        questions.forEach(q => {
            if (groups[q.dimension]) {
                groups[q.dimension].push(q);
            }
        });
        // Shuffle each group
        Object.keys(groups).forEach(dim => {
            groups[dim] = this.shuffle(groups[dim]);
        });
        return groups;
    },

    // Initialize quiz state
    initQuiz(questions, mode = 'quick') {
        const config = this.modes[mode] || this.modes.quick;
        const grouped = this.groupByDimension(questions);

        // Build initial question queue
        const initialQueue = [];
        const dimensions = ['EI', 'SN', 'TF', 'JP'];

        // Add initial questions from each dimension
        dimensions.forEach(dim => {
            const dimQuestions = grouped[dim];
            for (let i = 0; i < config.initialPerDimension && i < dimQuestions.length; i++) {
                initialQueue.push(dimQuestions[i]);
            }
        });

        // Shuffle initial queue for variety
        const shuffledInitial = this.shuffle(initialQueue);

        // Track which questions have been used
        const usedIds = new Set(shuffledInitial.map(q => q.id));

        return {
            mode,
            config,
            grouped,
            usedIds,
            currentQueue: shuffledInitial,
            answered: [],
            scores: Scoring.createEmptyScores()
        };
    },

    // Get the next question to ask
    getNextQuestion(state) {
        if (state.currentQueue.length > 0) {
            return state.currentQueue[0];
        }
        return null;
    },

    // Check if quiz should stop
    shouldStop(state) {
        const { config, answered, scores, grouped, usedIds } = state;

        // Stop if we've reached max questions
        if (answered.length >= config.maxQuestions) {
            return true;
        }

        // Only allow early stopping after minimum questions
        if (answered.length >= config.minQuestions) {
            const percents = Scoring.getDimensionPercents(scores);
            const uncertainties = Scoring.getUncertainties(percents);

            // Check if all dimensions have sufficient certainty
            const allResolved = Object.values(uncertainties).every(
                u => u >= config.uncertaintyThreshold
            );

            if (allResolved) {
                return true;
            }
        }

        // Check if we've run out of questions
        const remainingQuestions = ['EI', 'SN', 'TF', 'JP'].some(dim => {
            return grouped[dim].some(q => !usedIds.has(q.id));
        });

        return !remainingQuestions;
    },

    // Record a Likert answer and update state
    recordLikertAnswer(state, question, likertValue) {
        // Remove question from current queue
        state.currentQueue = state.currentQueue.filter(q => q.id !== question.id);

        // Add to answered list with Likert value
        state.answered.push({
            question,
            likertValue,
            aKey: question.aKey,
            bKey: question.bKey
        });

        // Update scores using Likert weights
        Scoring.addLikertResponse(state.scores, question.aKey, question.bKey, likertValue);

        // If not stopping, add next question based on uncertainty
        if (!this.shouldStop(state)) {
            this.addNextQuestion(state);
        }

        return state;
    },

    // Legacy: Record a binary answer (kept for compatibility)
    recordAnswer(state, question, selectedKey) {
        // Remove question from current queue
        state.currentQueue = state.currentQueue.filter(q => q.id !== question.id);

        // Add to answered list
        state.answered.push({
            question,
            selectedKey,
            weight: question.weight || 1
        });

        // Update scores
        Scoring.addResponse(state.scores, selectedKey, question.weight || 1);

        // If not stopping, add next question based on uncertainty
        if (!this.shouldStop(state)) {
            this.addNextQuestion(state);
        }

        return state;
    },

    // Add the next most needed question
    addNextQuestion(state) {
        const { grouped, usedIds, scores, config } = state;
        const percents = Scoring.getDimensionPercents(scores);
        const uncertainties = Scoring.getUncertainties(percents);

        // Sort dimensions by uncertainty (most uncertain first)
        const sortedDims = Object.entries(uncertainties)
            .sort((a, b) => a[1] - b[1])
            .map(([dim]) => dim);

        // Find an unused question from the most uncertain dimension
        for (const dim of sortedDims) {
            const unusedQuestion = grouped[dim].find(q => !usedIds.has(q.id));
            if (unusedQuestion) {
                usedIds.add(unusedQuestion.id);
                state.currentQueue.push(unusedQuestion);
                return;
            }
        }
    },

    // Go back one question (supports both Likert and binary)
    goBack(state) {
        if (state.answered.length === 0) {
            return state;
        }

        // Get last answer
        const lastAnswer = state.answered.pop();
        const { question, likertValue, selectedKey, weight, aKey, bKey } = lastAnswer;

        // Remove from used IDs
        state.usedIds.delete(question.id);

        // Reverse score - check if it's a Likert or binary answer
        if (likertValue !== undefined) {
            // Likert answer
            Scoring.removeLikertResponse(state.scores, aKey, bKey, likertValue);
        } else {
            // Binary answer
            Scoring.removeResponse(state.scores, selectedKey, weight);
        }

        // Add question back to front of queue
        state.currentQueue.unshift(question);

        return state;
    },

    // Get current progress info
    getProgress(state) {
        const { answered, config } = state;
        return {
            current: answered.length,
            max: config.maxQuestions,
            percent: Math.min(100, (answered.length / config.maxQuestions) * 100)
        };
    },

    // Get dimension resolution status
    getDimensionStatus(state) {
        const percents = Scoring.getDimensionPercents(state.scores);
        const uncertainties = Scoring.getUncertainties(percents);
        const threshold = state.config.uncertaintyThreshold;

        return {
            EI: {
                resolved: uncertainties.EI >= threshold,
                uncertainty: uncertainties.EI,
                percent: percents.EI
            },
            SN: {
                resolved: uncertainties.SN >= threshold,
                uncertainty: uncertainties.SN,
                percent: percents.SN
            },
            TF: {
                resolved: uncertainties.TF >= threshold,
                uncertainty: uncertainties.TF,
                percent: percents.TF
            },
            JP: {
                resolved: uncertainties.JP >= threshold,
                uncertainty: uncertainties.JP,
                percent: percents.JP
            }
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Adaptive;
}
