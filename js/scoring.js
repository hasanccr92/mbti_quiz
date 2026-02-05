/**
 * Scoring Module
 * Handles MBTI type calculation from quiz responses
 */

const Scoring = {
    // Likert scale weights: 1=strongly A, 2=slightly A, 3=neutral, 4=slightly B, 5=strongly B
    // Weight mappings: how much each Likert value contributes
    likertWeights: {
        1: { a: 2.0, b: 0.0 },   // Strongly A
        2: { a: 1.0, b: 0.0 },   // Slightly A
        3: { a: 0.5, b: 0.5 },   // Neutral (equal contribution)
        4: { a: 0.0, b: 1.0 },   // Slightly B
        5: { a: 0.0, b: 2.0 }    // Strongly B
    },

    // Initialize empty scores
    createEmptyScores() {
        return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    },

    // Add a Likert response to scores
    addLikertResponse(scores, aKey, bKey, likertValue) {
        const weights = this.likertWeights[likertValue];
        if (weights && scores.hasOwnProperty(aKey) && scores.hasOwnProperty(bKey)) {
            scores[aKey] += weights.a;
            scores[bKey] += weights.b;
        }
        return scores;
    },

    // Remove a Likert response from scores (for back button)
    removeLikertResponse(scores, aKey, bKey, likertValue) {
        const weights = this.likertWeights[likertValue];
        if (weights && scores.hasOwnProperty(aKey) && scores.hasOwnProperty(bKey)) {
            scores[aKey] = Math.max(0, scores[aKey] - weights.a);
            scores[bKey] = Math.max(0, scores[bKey] - weights.b);
        }
        return scores;
    },

    // Legacy: Add a binary response to scores (kept for compatibility)
    addResponse(scores, key, weight = 1) {
        if (scores.hasOwnProperty(key)) {
            scores[key] += weight;
        }
        return scores;
    },

    // Legacy: Remove a binary response from scores
    removeResponse(scores, key, weight = 1) {
        if (scores.hasOwnProperty(key)) {
            scores[key] = Math.max(0, scores[key] - weight);
        }
        return scores;
    },

    // Calculate percentage for a dimension pair
    calculatePercent(a, b) {
        const total = a + b;
        if (total === 0) return 0.5; // Default to middle if no data
        return a / total;
    },

    // Get all dimension percentages
    getDimensionPercents(scores) {
        return {
            EI: this.calculatePercent(scores.E, scores.I),
            SN: this.calculatePercent(scores.S, scores.N),
            TF: this.calculatePercent(scores.T, scores.F),
            JP: this.calculatePercent(scores.J, scores.P)
        };
    },

    // Check if a dimension is borderline (between 45% and 55%)
    isBorderline(percent) {
        return percent >= 0.45 && percent <= 0.55;
    },

    // Get borderline status for all dimensions
    getBorderlineStatus(percents) {
        return {
            EI: this.isBorderline(percents.EI),
            SN: this.isBorderline(percents.SN),
            TF: this.isBorderline(percents.TF),
            JP: this.isBorderline(percents.JP)
        };
    },

    // Calculate uncertainty for a dimension (0 = most uncertain, 0.5 = most certain)
    calculateUncertainty(percent) {
        return Math.abs(percent - 0.5);
    },

    // Get uncertainty for all dimensions
    getUncertainties(percents) {
        return {
            EI: this.calculateUncertainty(percents.EI),
            SN: this.calculateUncertainty(percents.SN),
            TF: this.calculateUncertainty(percents.TF),
            JP: this.calculateUncertainty(percents.JP)
        };
    },

    // Determine the final MBTI type code
    getTypeCode(percents) {
        const e = percents.EI > 0.5 ? 'E' : 'I';
        const s = percents.SN > 0.5 ? 'S' : 'N';
        const t = percents.TF > 0.5 ? 'T' : 'F';
        const j = percents.JP > 0.5 ? 'J' : 'P';
        return e + s + t + j;
    },

    // Get display percentages (as whole numbers)
    getDisplayPercents(percents) {
        return {
            E: Math.round(percents.EI * 100),
            I: Math.round((1 - percents.EI) * 100),
            S: Math.round(percents.SN * 100),
            N: Math.round((1 - percents.SN) * 100),
            T: Math.round(percents.TF * 100),
            F: Math.round((1 - percents.TF) * 100),
            J: Math.round(percents.JP * 100),
            P: Math.round((1 - percents.JP) * 100)
        };
    },

    // Get complete results object
    getResults(scores) {
        const percents = this.getDimensionPercents(scores);
        const uncertainties = this.getUncertainties(percents);
        const borderline = this.getBorderlineStatus(percents);
        const typeCode = this.getTypeCode(percents);
        const displayPercents = this.getDisplayPercents(percents);

        return {
            scores,
            percents,
            uncertainties,
            borderline,
            typeCode,
            displayPercents
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Scoring;
}
