/**
 * Main Application Module
 * Handles UI interactions and quiz flow
 */

const App = {
    // Application state
    state: {
        questions: [],
        typeProfiles: {},
        quizState: null,
        selectedMode: null
    },

    // Initialize the application
    init() {
        try {
            // Load data from embedded QuizData object
            this.loadData();

            // Set up event listeners
            this.setupEventListeners();

            console.log('App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            alert('Failed to load quiz data. Please refresh the page.');
        }
    },

    // Load questions and type profiles from embedded data
    loadData() {
        // Use embedded QuizData instead of fetch (avoids CORS issues with file://)
        if (typeof QuizData === 'undefined') {
            throw new Error('QuizData not found. Make sure data.js is loaded before app.js');
        }

        this.state.questions = QuizData.questions;
        this.state.typeProfiles = QuizData.typeProfiles;
    },

    // Set up all event listeners
    setupEventListeners() {
        // Mode selection
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectMode(e.currentTarget));
        });

        // Likert scale buttons
        document.querySelectorAll('.likert-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectLikertAnswer(e.currentTarget));
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => this.goBack());

        // Results actions
        document.getElementById('download-btn').addEventListener('click', () => this.downloadResults());
        document.getElementById('retake-btn').addEventListener('click', () => this.retakeQuiz());

        // Profile toggle button
        document.getElementById('profile-toggle-btn').addEventListener('click', () => this.toggleProfile());

        // Accordion headers
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', (e) => this.toggleAccordion(e.currentTarget));
        });

        // Social share buttons
        document.getElementById('share-card-btn').addEventListener('click', () => this.shareCard());
        document.getElementById('download-card-btn').addEventListener('click', () => this.downloadCard());
        document.getElementById('copy-card-btn').addEventListener('click', () => this.copyCardToClipboard());
    },

    // Handle mode selection and start quiz
    selectMode(card) {
        // Clear previous selection
        document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));

        // Select new mode
        card.classList.add('selected');
        this.state.selectedMode = card.dataset.mode;

        // Start quiz after brief delay for visual feedback
        setTimeout(() => this.startQuiz(), 300);
    },

    // Start the quiz
    startQuiz() {
        // Initialize quiz state
        this.state.quizState = Adaptive.initQuiz(
            this.state.questions,
            this.state.selectedMode
        );

        // Switch to quiz screen
        this.showScreen('quiz-screen');

        // Update progress text for selected mode
        const maxQ = this.state.quizState.config.maxQuestions;
        document.getElementById('progress-text').textContent = `0 / ${maxQ}`;

        // Show first question
        this.showQuestion();
    },

    // Show current question
    showQuestion() {
        const question = Adaptive.getNextQuestion(this.state.quizState);

        if (!question || Adaptive.shouldStop(this.state.quizState)) {
            this.showResults();
            return;
        }

        const progress = Adaptive.getProgress(this.state.quizState);
        const dimStatus = Adaptive.getDimensionStatus(this.state.quizState);

        // Update progress bar
        document.getElementById('progress-fill').style.width = `${progress.percent}%`;
        document.getElementById('progress-text').textContent =
            `${progress.current} / ${this.state.quizState.config.maxQuestions}`;

        // Update dimension badges
        document.querySelectorAll('.dim-badge').forEach(badge => {
            const dim = badge.dataset.dim;
            badge.classList.remove('active', 'resolved');

            if (dimStatus[dim].resolved) {
                badge.classList.add('resolved');
            }
            if (question.dimension === dim) {
                badge.classList.add('active');
            }
        });

        // Update question content with animation
        const card = document.getElementById('question-card');
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'slideIn 0.4s ease';

        document.getElementById('question-number').textContent =
            `Question ${progress.current + 1}`;
        document.getElementById('question-text').textContent = question.prompt;

        // Update Likert labels with the two options
        document.getElementById('label-a').textContent = question.aText;
        document.getElementById('label-b').textContent = question.bText;

        // Clear previous selections
        document.querySelectorAll('.likert-btn').forEach(btn => btn.classList.remove('selected'));

        // Update back button state
        document.getElementById('back-btn').disabled = progress.current === 0;
    },

    // Handle Likert scale answer selection
    selectLikertAnswer(btn) {
        const question = Adaptive.getNextQuestion(this.state.quizState);
        if (!question) return;

        const likertValue = parseInt(btn.dataset.value, 10);

        // Visual feedback - highlight selected button briefly
        btn.classList.add('selected');

        // Record the Likert answer
        Adaptive.recordLikertAnswer(this.state.quizState, question, likertValue);

        // Brief delay for visual feedback, then show next question
        setTimeout(() => {
            this.showQuestion();
        }, 150);
    },

    // Go back to previous question
    goBack() {
        Adaptive.goBack(this.state.quizState);
        this.showQuestion();
    },

    // Show results screen
    showResults() {
        const results = Scoring.getResults(this.state.quizState.scores);
        const profile = this.state.typeProfiles[results.typeCode];

        if (!profile) {
            console.error('Profile not found for type:', results.typeCode);
            return;
        }

        // Switch to results screen
        this.showScreen('results-screen');

        // Populate header
        document.getElementById('type-badge').textContent = results.typeCode;
        document.getElementById('type-title').textContent = profile.title;
        document.getElementById('type-oneliner').textContent = profile.oneLiner;

        // Populate dimension bars
        this.renderDimensionBars(results);

        // Populate strengths and watch-outs
        this.renderList('strengths-list', profile.strengths);
        this.renderList('watchouts-list', profile.watchOuts);

        // Populate accordion content
        this.renderCareerContent(profile.career);
        this.renderRelationshipsContent(profile.relationships);
        this.renderSocialContent(profile.social);
        this.renderGrowthContent(profile.stressGrowth);

        // Populate detailed profile content
        this.renderProfileContent(results.typeCode, results);

        // Reset profile section to closed
        document.querySelector('.personality-profile-section').classList.remove('open');

        // Store results for export
        this.state.currentResults = { results, profile };

        // Populate share card
        this.populateShareCard();
    },

    // Render dimension bars
    renderDimensionBars(results) {
        const container = document.getElementById('dimension-bars');
        const dimensions = [
            { dim: 'EI', left: 'E', right: 'I', leftName: 'Extraversion', rightName: 'Introversion' },
            { dim: 'SN', left: 'S', right: 'N', leftName: 'Sensing', rightName: 'Intuition' },
            { dim: 'TF', left: 'T', right: 'F', leftName: 'Thinking', rightName: 'Feeling' },
            { dim: 'JP', left: 'J', right: 'P', leftName: 'Judging', rightName: 'Perceiving' }
        ];

        container.innerHTML = dimensions.map(d => {
            const percent = results.percents[d.dim];
            const leftPercent = Math.round(percent * 100);
            const rightPercent = 100 - leftPercent;
            const isBorderline = results.borderline[d.dim];
            const winner = percent > 0.5 ? 'left' : 'right';

            return `
                <div class="dimension-row ${isBorderline ? 'borderline' : ''}">
                    <div class="dimension-labels">
                        <span class="dim-label ${winner === 'left' ? 'active' : 'inactive'}">
                            <strong>${d.left}</strong> ${d.leftName}
                            <span class="dim-percent">${leftPercent}%</span>
                        </span>
                        <span class="dim-label ${winner === 'right' ? 'active' : 'inactive'}">
                            <span class="dim-percent">${rightPercent}%</span>
                            ${d.rightName} <strong>${d.right}</strong>
                        </span>
                    </div>
                    <div class="dim-bar-container">
                        <div class="dim-bar-fill" style="width: ${leftPercent}%; background: var(--dim-${d.left.toLowerCase()});"></div>
                    </div>
                    ${isBorderline ? '<span class="borderline-marker">⚠️ Borderline — you may relate to both sides</span>' : ''}
                </div>
            `;
        }).join('');

        // Animate bars after a brief delay
        setTimeout(() => {
            document.querySelectorAll('.dim-bar-fill').forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }, 100);
    },

    // Render a list
    renderList(elementId, items) {
        const ul = document.getElementById(elementId);
        ul.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    },

    // Render career content
    renderCareerContent(career) {
        document.getElementById('career-content').innerHTML = `
            <div class="accordion-inner">
                <h4>What Motivates You</h4>
                <p>${career.motivators}</p>
                
                <h4>Best-Fit Environments</h4>
                <p>${career.environments}</p>
                
                <h4>Example Role Clusters</h4>
                <p>${career.roles}</p>
                
                <h4>Growth Tips</h4>
                <p>${career.tips}</p>
            </div>
        `;
    },

    // Render relationships content
    renderRelationshipsContent(rel) {
        document.getElementById('relationships-content').innerHTML = `
            <div class="accordion-inner">
                <h4>What You Often Value</h4>
                <p>${rel.values}</p>
                
                <h4>Common Conflict Pattern</h4>
                <p>${rel.conflict}</p>
                
                <h4>What Helps</h4>
                <p>${rel.helps}</p>
            </div>
        `;
    },

    // Render social content
    renderSocialContent(social) {
        document.getElementById('social-content').innerHTML = `
            <div class="accordion-inner">
                <p>${social}</p>
            </div>
        `;
    },

    // Render growth content
    renderGrowthContent(growth) {
        document.getElementById('growth-content').innerHTML = `
            <div class="accordion-inner">
                <h4>Stress Signs</h4>
                <p>${growth.stressSigns}</p>
                
                <h4>Growth Edge</h4>
                <p>${growth.growthEdge}</p>
            </div>
        `;
    },

    // Toggle accordion
    toggleAccordion(header) {
        const accordion = header.closest('.accordion');
        const isOpen = accordion.classList.contains('open');

        // Close all accordions
        document.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));

        // Open clicked one if it was closed
        if (!isOpen) {
            accordion.classList.add('open');
        }
    },

    // Toggle personality profile section
    toggleProfile() {
        const section = document.querySelector('.personality-profile-section');
        section.classList.toggle('open');
    },

    // Render detailed profile content
    renderProfileContent(typeCode, results) {
        // Type descriptions for each personality type
        const typeDescriptions = {
            'INTJ': `INTJs are strategic visionaries who approach life with a unique blend of imagination and analytical thinking. They see patterns others miss and enjoy developing long-term plans to achieve ambitious goals. Their minds naturally work on systems and theories, constantly refining their understanding of how things work.\n\nIn their personal world, INTJs value competence highly—both in themselves and others. They set high standards and work systematically toward self-improvement. While they may appear reserved, they form deep connections with those who share their intellectual curiosity and respect their need for independence.`,
            'INTP': `INTPs are philosophical innovators who live in a world of ideas and theoretical possibilities. They possess an unusual ability to focus deeply on solving complex problems, often losing track of time as they explore the logical structures underlying reality. Their minds are like precision instruments for detecting inconsistencies and developing original frameworks.\n\nSocially, INTPs may seem detached, but beneath their analytical exterior lies genuine curiosity about people and ideas. They value authenticity and intellectual freedom, preferring relationships where ideas can be exchanged freely without judgment.`,
            'ENTJ': `ENTJs are natural-born leaders who see inefficiency as a challenge to be conquered. They possess a rare combination of vision and pragmatism, allowing them to not only imagine better systems but also organize people and resources to build them. Their confidence and decisiveness inspire others to action.\n\nIn relationships, ENTJs bring the same strategic thinking they apply to business. They invest in people they believe in and expect growth from both themselves and their partners. While they may prioritize achievement, they also develop deep loyalty to those in their inner circle.`,
            'ENTP': `ENTPs are intellectual explorers who thrive on challenging the status quo. They possess quick minds that jump effortlessly between ideas, often making innovative connections that others miss. Debates energize them—not to win, but to test ideas and discover new perspectives.\n\nSocially, ENTPs are often the life of intellectual discussions, bringing energy and wit to any conversation. They value mental chemistry highly and enjoy relationships where ideas can be playfully challenged. Their adaptability makes them engaging companions, though they may struggle with routine.`,
            'INFJ': `INFJs are insightful idealists who combine deep empathy with a drive for meaningful change. They possess an almost uncanny ability to understand people's motivations and potential, often seeing what others could become before they see it themselves. This insight guides their quiet but persistent efforts to help others grow.\n\nIn relationships, INFJs seek depth and authenticity above all. They give generously of themselves but need reciprocal emotional honesty. While they may have many acquaintances, they reserve their deepest connections for those who truly understand and appreciate their complexity.`,
            'INFP': `INFPs are creative dreamers who navigate life guided by their deeply held values. They possess rich inner worlds filled with imagination, emotion, and idealism. Their sensitivity to authenticity helps them detect pretense quickly, and they're drawn to expressing themselves through creative outlets.\n\nIn relationships, INFPs offer genuine acceptance and understanding. They seek partners who appreciate their depth and share their values, even if those values are expressed differently. While they may appear gentle, they possess quiet determination when their principles are at stake.`,
            'ENFJ': `ENFJs are charismatic guides who naturally draw people together toward shared goals. They possess exceptional emotional intelligence, reading group dynamics intuitively and helping individuals find their place. Their warmth and enthusiasm create environments where people feel motivated to grow.\n\nIn relationships, ENFJs invest deeply, often anticipating their loved ones' needs before they're expressed. They thrive when helping others flourish but must remember to nurture themselves as well. Their idealism about relationships can sometimes lead to disappointment when reality falls short.`,
            'ENFP': `ENFPs are enthusiastic catalysts who see life as full of exciting possibilities. They possess infectious energy that draws people to them and helps others see potential they might have missed. Their minds make creative leaps naturally, connecting ideas in unexpected ways.\n\nIn relationships, ENFPs bring warmth, spontaneity, and genuine interest in their partners' inner worlds. They value emotional depth and intellectual stimulation equally. While their enthusiasm can scatter in many directions, they bring wonderful passion to the people and causes they care about.`,
            'ISTJ': `ISTJs are reliable stabilizers who form the backbone of many organizations and families. They possess exceptional attention to detail and take their commitments seriously. When they say they'll do something, it gets done—thoroughly and on time.\n\nIn relationships, ISTJs show love through actions rather than words. They build security and stability for their loved ones, handling practical matters so others don't have to worry. While they may not be expressive, their loyalty and dependability run deep.`,
            'ISFJ': `ISFJs are nurturing protectors who remember the details that matter to people. They possess exceptional awareness of others' needs and derive satisfaction from meeting them. Their reliability and warmth create safe spaces where people feel cared for.\n\nIn relationships, ISFJs are devoted and attentive, often putting loved ones' needs before their own. They show love through practical care and remember important details that others might overlook. They value tradition and work hard to maintain harmony in their relationships.`,
            'ESTJ': `ESTJs are efficient organizers who bring order to chaos and get things done. They possess natural executive ability, coordinating people and resources toward practical goals. Their clear communication and high standards help groups function effectively.\n\nIn relationships, ESTJs are committed and expect the same in return. They show love through providing security and handling practical matters efficiently. While they may seem focused on logistics, they develop strong bonds with those who share their values of responsibility and loyalty.`,
            'ESFJ': `ESFJs are warm connectors who create community wherever they go. They possess exceptional awareness of social dynamics and work to ensure everyone feels included. Their genuine interest in people's lives helps build the social fabric that holds groups together.\n\nIn relationships, ESFJs are devoted and expressive, often going above and beyond to meet their partners' needs. They value traditions and create meaningful rituals that strengthen bonds. Their sensitivity to others' feelings makes them supportive partners who notice when something is wrong.`,
            'ISTP': `ISTPs are practical problem-solvers who understand how things work. They possess exceptional mechanical and analytical abilities, approaching systems with hands-on curiosity. Their calm under pressure and ability to improvise make them invaluable in crises.\n\nIn relationships, ISTPs show affection through shared activities and practical help rather than verbal declarations. They value independence and need partners who understand their need for space. While they may seem reserved, they're loyal to those who earn their trust.`,
            'ISFP': `ISFPs are gentle artists who experience the world through their senses and values. They possess keen aesthetic awareness and often express themselves through creative mediums. Their acceptance of others as they are creates space for authenticity.\n\nIn relationships, ISFPs are warm and loyal, showing love through thoughtful actions and quality time. They shy away from conflict but stand firm on matters of personal values. Their genuine nature and appreciation for simple pleasures make them calming partners.`,
            'ESTP': `ESTPs are energetic realists who thrive on action and immediate results. They possess exceptional situational awareness and quick reflexes, both mental and physical. Their ability to read people and situations makes them effective negotiators and problem-solvers.\n\nIn relationships, ESTPs bring excitement and spontaneity. They prefer partners who can keep up with their active lifestyle and appreciate their direct communication style. While they may resist long-term planning, they're generous and present with those they care about.`,
            'ESFP': `ESFPs are vivacious performers who bring joy and energy to those around them. They possess exceptional awareness of the present moment and help others appreciate life's pleasures. Their warmth and enthusiasm are contagious, lifting the mood wherever they go.\n\nIn relationships, ESFPs are affectionate and fun-loving partners who prioritize quality time and shared experiences. They show love through playful attention and generous gestures. While they may avoid heavy conversations, they provide genuine emotional support when it matters most.`
        };

        // Cognitive functions for each type
        const cognitiveFunctions = {
            'INTJ': [
                { position: '1st', name: 'Introverted Intuition (Ni)', desc: 'Synthesizes patterns into future visions' },
                { position: '2nd', name: 'Extraverted Thinking (Te)', desc: 'Organizes the external world efficiently' },
                { position: '3rd', name: 'Introverted Feeling (Fi)', desc: 'Evaluates through personal values' },
                { position: '4th', name: 'Extraverted Sensing (Se)', desc: 'Engages with the physical present' }
            ],
            'INTP': [
                { position: '1st', name: 'Introverted Thinking (Ti)', desc: 'Builds precise internal logical frameworks' },
                { position: '2nd', name: 'Extraverted Intuition (Ne)', desc: 'Explores possibilities and connections' },
                { position: '3rd', name: 'Introverted Sensing (Si)', desc: 'References past experiences' },
                { position: '4th', name: 'Extraverted Feeling (Fe)', desc: 'Considers group harmony' }
            ],
            'ENTJ': [
                { position: '1st', name: 'Extraverted Thinking (Te)', desc: 'Organizes systems for maximum efficiency' },
                { position: '2nd', name: 'Introverted Intuition (Ni)', desc: 'Develops strategic long-term vision' },
                { position: '3rd', name: 'Extraverted Sensing (Se)', desc: 'Takes decisive action in the moment' },
                { position: '4th', name: 'Introverted Feeling (Fi)', desc: 'Holds deep personal values' }
            ],
            'ENTP': [
                { position: '1st', name: 'Extraverted Intuition (Ne)', desc: 'Generates endless possibilities' },
                { position: '2nd', name: 'Introverted Thinking (Ti)', desc: 'Analyzes ideas for logical consistency' },
                { position: '3rd', name: 'Extraverted Feeling (Fe)', desc: 'Reads and influences social dynamics' },
                { position: '4th', name: 'Introverted Sensing (Si)', desc: 'Draws on past experience' }
            ],
            'INFJ': [
                { position: '1st', name: 'Introverted Intuition (Ni)', desc: 'Perceives deep patterns about people' },
                { position: '2nd', name: 'Extraverted Feeling (Fe)', desc: 'Attunes to others\' emotional needs' },
                { position: '3rd', name: 'Introverted Thinking (Ti)', desc: 'Analyzes through logical frameworks' },
                { position: '4th', name: 'Extraverted Sensing (Se)', desc: 'Engages with sensory experience' }
            ],
            'INFP': [
                { position: '1st', name: 'Introverted Feeling (Fi)', desc: 'Navigates by deeply held values' },
                { position: '2nd', name: 'Extraverted Intuition (Ne)', desc: 'Explores creative possibilities' },
                { position: '3rd', name: 'Introverted Sensing (Si)', desc: 'Cherishes meaningful memories' },
                { position: '4th', name: 'Extraverted Thinking (Te)', desc: 'Organizes tasks efficiently' }
            ],
            'ENFJ': [
                { position: '1st', name: 'Extraverted Feeling (Fe)', desc: 'Harmonizes and motivates groups' },
                { position: '2nd', name: 'Introverted Intuition (Ni)', desc: 'Sees people\'s potential' },
                { position: '3rd', name: 'Extraverted Sensing (Se)', desc: 'Responds to immediate needs' },
                { position: '4th', name: 'Introverted Thinking (Ti)', desc: 'Seeks logical understanding' }
            ],
            'ENFP': [
                { position: '1st', name: 'Extraverted Intuition (Ne)', desc: 'Sees exciting possibilities everywhere' },
                { position: '2nd', name: 'Introverted Feeling (Fi)', desc: 'Guided by authentic values' },
                { position: '3rd', name: 'Extraverted Thinking (Te)', desc: 'Organizes for practical results' },
                { position: '4th', name: 'Introverted Sensing (Si)', desc: 'Draws on past experiences' }
            ],
            'ISTJ': [
                { position: '1st', name: 'Introverted Sensing (Si)', desc: 'Relies on proven methods and experience' },
                { position: '2nd', name: 'Extraverted Thinking (Te)', desc: 'Organizes efficiently' },
                { position: '3rd', name: 'Introverted Feeling (Fi)', desc: 'Holds quiet personal values' },
                { position: '4th', name: 'Extraverted Intuition (Ne)', desc: 'Considers new possibilities' }
            ],
            'ISFJ': [
                { position: '1st', name: 'Introverted Sensing (Si)', desc: 'Remembers what matters to people' },
                { position: '2nd', name: 'Extraverted Feeling (Fe)', desc: 'Nurtures and supports others' },
                { position: '3rd', name: 'Introverted Thinking (Ti)', desc: 'Analyzes practical matters' },
                { position: '4th', name: 'Extraverted Intuition (Ne)', desc: 'Considers possibilities' }
            ],
            'ESTJ': [
                { position: '1st', name: 'Extraverted Thinking (Te)', desc: 'Organizes people and processes' },
                { position: '2nd', name: 'Introverted Sensing (Si)', desc: 'Applies proven methods' },
                { position: '3rd', name: 'Extraverted Intuition (Ne)', desc: 'Considers alternatives' },
                { position: '4th', name: 'Introverted Feeling (Fi)', desc: 'Holds personal values quietly' }
            ],
            'ESFJ': [
                { position: '1st', name: 'Extraverted Feeling (Fe)', desc: 'Creates harmony and connection' },
                { position: '2nd', name: 'Introverted Sensing (Si)', desc: 'Maintains traditions and routines' },
                { position: '3rd', name: 'Extraverted Intuition (Ne)', desc: 'Considers new approaches' },
                { position: '4th', name: 'Introverted Thinking (Ti)', desc: 'Seeks logical clarity' }
            ],
            'ISTP': [
                { position: '1st', name: 'Introverted Thinking (Ti)', desc: 'Understands how things work' },
                { position: '2nd', name: 'Extraverted Sensing (Se)', desc: 'Engages hands-on with reality' },
                { position: '3rd', name: 'Introverted Intuition (Ni)', desc: 'Anticipates outcomes' },
                { position: '4th', name: 'Extraverted Feeling (Fe)', desc: 'Considers social impact' }
            ],
            'ISFP': [
                { position: '1st', name: 'Introverted Feeling (Fi)', desc: 'Guided by personal values' },
                { position: '2nd', name: 'Extraverted Sensing (Se)', desc: 'Appreciates sensory beauty' },
                { position: '3rd', name: 'Introverted Intuition (Ni)', desc: 'Has quiet insights' },
                { position: '4th', name: 'Extraverted Thinking (Te)', desc: 'Organizes when needed' }
            ],
            'ESTP': [
                { position: '1st', name: 'Extraverted Sensing (Se)', desc: 'Reads and responds to situations quickly' },
                { position: '2nd', name: 'Introverted Thinking (Ti)', desc: 'Analyzes problems pragmatically' },
                { position: '3rd', name: 'Extraverted Feeling (Fe)', desc: 'Charms and persuades' },
                { position: '4th', name: 'Introverted Intuition (Ni)', desc: 'Develops strategic insight' }
            ],
            'ESFP': [
                { position: '1st', name: 'Extraverted Sensing (Se)', desc: 'Lives fully in the moment' },
                { position: '2nd', name: 'Introverted Feeling (Fi)', desc: 'Acts from authentic values' },
                { position: '3rd', name: 'Extraverted Thinking (Te)', desc: 'Gets things done' },
                { position: '4th', name: 'Introverted Intuition (Ni)', desc: 'Develops deeper meaning' }
            ]
        };

        // Render description
        const descHtml = `
            <h3>About Your Type</h3>
            ${typeDescriptions[typeCode].split('\\n\\n').map(p => `<p>${p}</p>`).join('')}
        `;
        document.getElementById('profile-description').innerHTML = descHtml;

        // Render cognitive functions
        const functions = cognitiveFunctions[typeCode] || [];
        const funcHtml = `
            <h3>Your Cognitive Function Stack</h3>
            <div class="function-stack">
                ${functions.map(f => `
                    <div class="function-item">
                        <span class="function-position">${f.position}</span>
                        <div>
                            <div class="function-name">${f.name}</div>
                            <div class="function-desc">${f.desc}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById('cognitive-functions').innerHTML = funcHtml;

        // Render dimension explanations
        const dimData = [
            {
                letter: typeCode[0], dim: 'EI', E: 'Extraversion', I: 'Introversion',
                Edesc: 'Energized by external activity and interaction',
                Idesc: 'Energized by internal reflection and solitude'
            },
            {
                letter: typeCode[1], dim: 'SN', S: 'Sensing', N: 'Intuition',
                Sdesc: 'Focuses on concrete details and present reality',
                Ndesc: 'Focuses on patterns, possibilities, and meanings'
            },
            {
                letter: typeCode[2], dim: 'TF', T: 'Thinking', F: 'Feeling',
                Tdesc: 'Makes decisions based on logic and objective analysis',
                Fdesc: 'Makes decisions based on values and emotional impact'
            },
            {
                letter: typeCode[3], dim: 'JP', J: 'Judging', P: 'Perceiving',
                Jdesc: 'Prefers structure, planning, and closure',
                Pdesc: 'Prefers flexibility, spontaneity, and options'
            }
        ];

        const dimHtml = `
            <h3>What Your Letters Mean</h3>
            <div class="dimension-explain-grid">
                ${dimData.map(d => `
                    <div class="dimension-explain-item">
                        <h4><span>${d.letter}</span> — ${d.letter === 'E' || d.letter === 'I' ? (d.letter === 'E' ? d.E : d.I) :
                (d.letter === 'S' || d.letter === 'N' ? (d.letter === 'S' ? d.S : d.N) :
                    (d.letter === 'T' || d.letter === 'F' ? (d.letter === 'T' ? d.T : d.F) :
                        (d.letter === 'J' ? d.J : d.P)))}</h4>
                        <p>${d.letter === 'E' ? d.Edesc : d.letter === 'I' ? d.Idesc :
                d.letter === 'S' ? d.Sdesc : d.letter === 'N' ? d.Ndesc :
                    d.letter === 'T' ? d.Tdesc : d.letter === 'F' ? d.Fdesc :
                        d.letter === 'J' ? d.Jdesc : d.Pdesc}</p>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById('dimension-explanations').innerHTML = dimHtml;
    },

    // Download results as Markdown
    downloadResults() {
        const { results, profile } = this.state.currentResults;
        const dp = results.displayPercents;

        const markdown = `# My Personality Type: ${results.typeCode}

## ${profile.title}

${profile.oneLiner}

---

## Dimension Scores

| Dimension | Score |
|-----------|-------|
| Extraversion (E) / Introversion (I) | ${dp.E}% E — ${dp.I}% I ${results.borderline.EI ? '⚠️ Borderline' : ''} |
| Sensing (S) / Intuition (N) | ${dp.S}% S — ${dp.N}% N ${results.borderline.SN ? '⚠️ Borderline' : ''} |
| Thinking (T) / Feeling (F) | ${dp.T}% T — ${dp.F}% F ${results.borderline.TF ? '⚠️ Borderline' : ''} |
| Judging (J) / Perceiving (P) | ${dp.J}% J — ${dp.P}% P ${results.borderline.JP ? '⚠️ Borderline' : ''} |

---

## Strengths

${profile.strengths.map(s => `- ${s}`).join('\n')}

## Watch-Outs

${profile.watchOuts.map(w => `- ${w}`).join('\n')}

---

## Career & Work

**Motivators:** ${profile.career.motivators}

**Best-Fit Environments:** ${profile.career.environments}

**Example Roles:** ${profile.career.roles}

**Growth Tips:** ${profile.career.tips}

---

## Relationships

**What You Value:** ${profile.relationships.values}

**Conflict Pattern:** ${profile.relationships.conflict}

**What Helps:** ${profile.relationships.helps}

---

## Social Interactions

${profile.social}

---

## Stress & Growth

**Stress Signs:** ${profile.stressGrowth.stressSigns}

**Growth Edge:** ${profile.stressGrowth.growthEdge}

---

*Generated by Personality Type Quiz*

**Disclaimer:** This assessment is for self-reflection only. It is not a clinical diagnostic tool and should not be used for hiring, selection, or placement decisions.
`;

        // Create and download file
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `personality-type-${results.typeCode}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Get share URL
    getShareUrl() {
        return 'https://hasanccr92.github.io/mbti_quiz/';
    },

    // Show hint message
    showShareHint(message) {
        const hint = document.getElementById('share-hint');
        hint.textContent = message;
        hint.classList.remove('visible');
        void hint.offsetWidth; // Trigger reflow
        hint.classList.add('visible');
        setTimeout(() => hint.classList.remove('visible'), 3000);
    },

    // Populate the share card with current results
    populateShareCard() {
        const { results, profile } = this.state.currentResults;

        // Update card content
        document.getElementById('card-type-badge').textContent = results.typeCode;
        document.getElementById('card-title').textContent = profile.title;
        document.getElementById('card-oneliner').textContent = profile.oneLiner;

        // Generate dimension bars
        const dimensions = [
            { dim: 'EI', left: 'E', right: 'I', leftName: 'Extraversion', rightName: 'Introversion', color: '#38ef7d' },
            { dim: 'SN', left: 'S', right: 'N', leftName: 'Sensing', rightName: 'Intuition', color: '#f2994a' },
            { dim: 'TF', left: 'T', right: 'F', leftName: 'Thinking', rightName: 'Feeling', color: '#00d4ff' },
            { dim: 'JP', left: 'J', right: 'P', leftName: 'Judging', rightName: 'Perceiving', color: '#ffd93d' }
        ];

        const container = document.getElementById('card-dimensions');
        container.innerHTML = dimensions.map(d => {
            const percent = results.percents[d.dim];
            const leftPercent = Math.round(percent * 100);
            const rightPercent = 100 - leftPercent;

            return `
                <div class="card-dim-row">
                    <div class="card-dim-labels">
                        <span class="card-dim-left"><strong>${d.left}</strong> ${d.leftName} ${leftPercent}%</span>
                        <span class="card-dim-right">${rightPercent}% ${d.rightName} <strong>${d.right}</strong></span>
                    </div>
                    <div class="card-dim-bar">
                        <div class="card-dim-fill" style="width: ${leftPercent}%; background: ${d.color};"></div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Generate image from the card using Canvas
    async generateCardImage() {
        const card = document.getElementById('share-card');
        const { results, profile } = this.state.currentResults;

        // Create canvas with card dimensions
        const canvas = document.createElement('canvas');
        const scale = 2; // For higher resolution
        canvas.width = 400 * scale;
        canvas.height = 520 * scale;
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 520);
        gradient.addColorStop(0, '#0f0f1a');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 520);

        // Border
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, 400, 520);

        // Type badge
        const typeGradient = ctx.createLinearGradient(0, 0, 200, 0);
        typeGradient.addColorStop(0, '#667eea');
        typeGradient.addColorStop(1, '#764ba2');
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillStyle = typeGradient;
        ctx.textAlign = 'center';
        ctx.fillText(results.typeCode, 200, 60);

        // Title
        ctx.font = '600 22px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(profile.title, 200, 100);

        // One-liner (word wrap)
        ctx.font = '400 14px Inter, sans-serif';
        ctx.fillStyle = '#a0a0b8';
        this.wrapText(ctx, profile.oneLiner, 200, 130, 360, 20);

        // Dimension bars
        const dimensions = [
            { dim: 'EI', left: 'E', right: 'I', leftName: 'Extraversion', rightName: 'Introversion', color: '#38ef7d' },
            { dim: 'SN', left: 'S', right: 'N', leftName: 'Sensing', rightName: 'Intuition', color: '#f2994a' },
            { dim: 'TF', left: 'T', right: 'F', leftName: 'Thinking', rightName: 'Feeling', color: '#00d4ff' },
            { dim: 'JP', left: 'J', right: 'P', leftName: 'Judging', rightName: 'Perceiving', color: '#ffd93d' }
        ];

        let y = 190;
        dimensions.forEach(d => {
            const percent = results.percents[d.dim];
            const leftPercent = Math.round(percent * 100);
            const rightPercent = 100 - leftPercent;

            // Row background
            ctx.fillStyle = 'rgba(22, 33, 62, 0.8)';
            this.roundRect(ctx, 20, y, 360, 60, 8);
            ctx.fill();

            // Labels
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.fillStyle = d.color;
            ctx.textAlign = 'left';
            ctx.fillText(d.left, 30, y + 22);

            ctx.font = '400 12px Inter, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(` ${d.leftName} ${leftPercent}%`, 42, y + 22);

            ctx.textAlign = 'right';
            ctx.fillStyle = '#6b6b80';
            ctx.fillText(`${rightPercent}% ${d.rightName} `, 358, y + 22);
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.fillText(d.right, 370, y + 22);

            // Bar background
            ctx.fillStyle = '#1a1a2e';
            this.roundRect(ctx, 30, y + 35, 340, 10, 5);
            ctx.fill();

            // Bar fill
            ctx.fillStyle = d.color;
            const fillWidth = (leftPercent / 100) * 340;
            this.roundRect(ctx, 30, y + 35, fillWidth, 10, 5);
            ctx.fill();

            y += 70;
        });

        // CTA section
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(20, 470, 360, 1);

        ctx.font = '600 16px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('🔗 Find Yours', 200, 495);

        ctx.font = '400 12px Inter, sans-serif';
        ctx.fillStyle = '#667eea';
        ctx.fillText('hasanccr92.github.io/mbti_quiz', 200, 512);

        return canvas;
    },

    // Helper: Wrap text for canvas
    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
    },

    // Helper: Draw rounded rectangle
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    },

    // Download card as PNG image
    async downloadCard() {
        try {
            const canvas = await this.generateCardImage();
            const link = document.createElement('a');
            link.download = `personality-${this.state.currentResults.results.typeCode}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            this.showShareHint('📥 Card downloaded! Share it on your socials!');
        } catch (error) {
            console.error('Error generating card:', error);
            this.showShareHint('❌ Error generating card. Please try again.');
        }
    },

    // Copy card image to clipboard
    async copyCardToClipboard() {
        try {
            const canvas = await this.generateCardImage();
            canvas.toBlob(async (blob) => {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    this.showShareHint('📋 Card copied! Paste it anywhere!');
                } catch (err) {
                    // Fallback: download instead
                    this.downloadCard();
                    this.showShareHint('📥 Copied not supported, downloading instead...');
                }
            }, 'image/png');
        } catch (error) {
            console.error('Error copying card:', error);
            this.showShareHint('❌ Error copying card. Please try downloading.');
        }
    },

    // Share card directly to social apps using Web Share API
    async shareCard() {
        try {
            const canvas = await this.generateCardImage();
            const { results, profile } = this.state.currentResults;

            // Convert canvas to blob
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const file = new File([blob], `personality-${results.typeCode}.png`, { type: 'image/png' });

            // Check if Web Share API with files is supported
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: `I'm an ${results.typeCode} - ${profile.title}!`,
                    text: `🧠 Discover your personality type! Take the quiz: ${this.getShareUrl()}`,
                    files: [file]
                });
                this.showShareHint('✨ Shared successfully!');
            } else if (navigator.share) {
                // Fallback: Share without image (text only)
                await navigator.share({
                    title: `I'm an ${results.typeCode} - ${profile.title}!`,
                    text: `🧠 I'm an ${results.typeCode} - "${profile.title}"! Discover your personality type!`,
                    url: this.getShareUrl()
                });
                this.showShareHint('✨ Shared! Download the card to attach the image.');
            } else {
                // Web Share API not supported, fallback to download
                this.downloadCard();
                this.showShareHint('📥 Sharing not supported on this device. Card downloaded!');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                // User cancelled sharing
                return;
            }
            console.error('Error sharing card:', error);
            // Fallback to download
            this.downloadCard();
            this.showShareHint('📥 Sharing failed. Card downloaded instead!');
        }
    },

    // Retake quiz
    retakeQuiz() {
        // Reset state
        this.state.quizState = null;
        this.state.selectedMode = null;
        this.state.currentResults = null;

        // Clear mode selection
        document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));

        // Close all accordions
        document.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));

        // Show intro screen
        this.showScreen('intro-screen');
    },

    // Show a specific screen
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');

        // Scroll to top
        window.scrollTo(0, 0);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
