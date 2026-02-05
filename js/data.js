/**
 * Embedded Quiz Data
 * Contains questions and type profiles to avoid CORS issues with file:// URLs
 */

const QuizData = {
    questions: [
        { "id": 1, "dimension": "EI", "prompt": "At a party do you:", "aText": "Interact with many, including strangers", "bText": "Interact with a few, known well", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 2, "dimension": "SN", "prompt": "Which describes you better?", "aText": "Focused on facts and what's real", "bText": "Focused on ideas and possibilities", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 3, "dimension": "TF", "prompt": "Which feels worse to you?", "aText": "Being unfair to someone", "bText": "Being unkind to someone", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 4, "dimension": "JP", "prompt": "Do you prefer things that are:", "aText": "Settled and decided", "bText": "Unsettled and just beginning", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 5, "dimension": "TF", "prompt": "In making a decision, are you more likely to go by:", "aText": "What seems reasonable", "bText": "What you actually feel", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 6, "dimension": "EI", "prompt": "In your social circles, do you:", "aText": "Stay updated on everyone's news", "bText": "Lose track of what's happening with others", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 7, "dimension": "SN", "prompt": "Are you more of a:", "aText": "Practical realist", "bText": "Dreamer with a vivid imagination", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 8, "dimension": "SN", "prompt": "Do you prefer to interact with people who are:", "aText": "Sensible", "bText": "Imaginative", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 9, "dimension": "SN", "prompt": "Are you more interested in:", "aText": "What is actual", "bText": "What is possible", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 10, "dimension": "TF", "prompt": "When judging a situation, do you focus more on:", "aText": "Rules and principles", "bText": "Individual circumstances", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 11, "dimension": "TF", "prompt": "In approaching others, is your inclination more:", "aText": "Objective", "bText": "Personal", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 12, "dimension": "JP", "prompt": "Are you more:", "aText": "Punctual", "bText": "Leisurely", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 13, "dimension": "JP", "prompt": "Does it bother you more having things:", "aText": "Incomplete", "bText": "Completed", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 14, "dimension": "TF", "prompt": "Which appeals to you more:", "aText": "Consistency of thought", "bText": "Harmonious human relationships", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 15, "dimension": "TF", "prompt": "Are you more comfortable in making:", "aText": "Logical judgments", "bText": "Value judgments", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 16, "dimension": "JP", "prompt": "Do you want things:", "aText": "Settled and decided", "bText": "Unsettled and undecided", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 17, "dimension": "JP", "prompt": "Would you say you are more:", "aText": "Serious and determined", "bText": "Easy-going", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 18, "dimension": "EI", "prompt": "Before making a phone call, do you:", "aText": "Just call without much thought", "bText": "Plan what you're going to say", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 19, "dimension": "SN", "prompt": "Do you believe facts:", "aText": "Are most important on their own", "bText": "Are most useful for understanding bigger patterns", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 20, "dimension": "SN", "prompt": "People who talk about big visions and theories are:", "aText": "Sometimes impractical", "bText": "Inspiring and interesting", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 21, "dimension": "TF", "prompt": "Are you more often:", "aText": "A cool-headed person", "bText": "A warm-hearted person", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 22, "dimension": "SN", "prompt": "Do you think 'common sense' is:", "aText": "Usually reliable and trustworthy", "bText": "Often worth questioning", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 23, "dimension": "SN", "prompt": "What do children need more of?", "aText": "Practical skills and responsibilities", "bText": "Creative play and imagination", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 24, "dimension": "TF", "prompt": "In making decisions, do you feel more comfortable with:", "aText": "Standards", "bText": "Feelings", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 25, "dimension": "TF", "prompt": "Are you more:", "aText": "Convinced by logic", "bText": "Convinced by emotion and personal values", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 26, "dimension": "JP", "prompt": "Do you prefer:", "aText": "Planned events", "bText": "Unplanned events", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 27, "dimension": "JP", "prompt": "Do you more often prefer:", "aText": "The final and unalterable statement", "bText": "The tentative and preliminary statement", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 28, "dimension": "JP", "prompt": "Are you more comfortable:", "aText": "After a decision", "bText": "Before a decision", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 29, "dimension": "EI", "prompt": "Do you:", "aText": "Speak easily and at length with strangers", "bText": "Find little to say to strangers", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 30, "dimension": "SN", "prompt": "Are you more interested in:", "aText": "What is happening now", "bText": "What could happen", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 31, "dimension": "TF", "prompt": "In evaluating someone's character, are you more swayed by:", "aText": "Objective facts", "bText": "How much you personally like them", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 32, "dimension": "EI", "prompt": "At the end of a social event, do you:", "aText": "Stay until the very end or last to leave", "bText": "Often leave earlier than most", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 33, "dimension": "JP", "prompt": "In your daily life, do you:", "aText": "Prefer structure and routine", "bText": "Prefer spontaneity and flexibility", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 34, "dimension": "TF", "prompt": "When faced with a problem, do you typically:", "aText": "Think it through logically", "bText": "Consider how it affects people involved", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 35, "dimension": "JP", "prompt": "Which appeals to you more:", "aText": "Making definite plans", "bText": "Keeping your options open", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 36, "dimension": "SN", "prompt": "Are you more drawn to:", "aText": "Practical, useful information", "bText": "Abstract theories and ideas", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 37, "dimension": "EI", "prompt": "In a group discussion, are you more likely to:", "aText": "Speak up early", "bText": "Listen and think before responding", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 38, "dimension": "SN", "prompt": "Do you trust more:", "aText": "What you can see and verify", "bText": "Your intuition and hunches", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 39, "dimension": "TF", "prompt": "When making important decisions, do you rely more on:", "aText": "Objective criteria", "bText": "Personal values and beliefs", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 40, "dimension": "JP", "prompt": "Do you prefer to:", "aText": "Get things done quickly", "bText": "Take time to explore options", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 41, "dimension": "EI", "prompt": "In social situations, do you:", "aText": "Enjoy meeting new people", "bText": "Prefer spending time with close friends", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 42, "dimension": "TF", "prompt": "Are you more:", "aText": "Hard-headed", "bText": "Soft-hearted", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 43, "dimension": "JP", "prompt": "Do you prefer:", "aText": "Clear, definite answers", "bText": "Open-ended exploration", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 44, "dimension": "TF", "prompt": "Which is more important to you:", "aText": "Fairness and consistency", "bText": "Compassion and understanding", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 45, "dimension": "SN", "prompt": "Do you find that you are more:", "aText": "Realistic and practical", "bText": "Idealistic and imaginative", "aKey": "S", "bKey": "N", "weight": 1 },
        { "id": 46, "dimension": "TF", "prompt": "In relationships, do you prioritize:", "aText": "Logical compatibility", "bText": "Emotional connection", "aKey": "T", "bKey": "F", "weight": 1 },
        { "id": 47, "dimension": "JP", "prompt": "Are you more of a:", "aText": "Planner", "bText": "Improviser", "aKey": "J", "bKey": "P", "weight": 1 },
        { "id": 48, "dimension": "EI", "prompt": "After a long day, do you prefer to:", "aText": "Go out and socialize", "bText": "Stay home and recharge alone", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 49, "dimension": "EI", "prompt": "When working on a project, do you prefer:", "aText": "Collaborating with others", "bText": "Working independently", "aKey": "E", "bKey": "I", "weight": 1 },
        { "id": 50, "dimension": "EI", "prompt": "At social gatherings, do you:", "aText": "Stay until the end, often leaving last", "bText": "Leave early, feeling drained", "aKey": "E", "bKey": "I", "weight": 1 }
    ],

    typeProfiles: {
        "INTJ": {
            "code": "INTJ",
            "title": "The Strategic Architect",
            "oneLiner": "A future-focused strategist who prefers deep thinking, independence, and building systems that work.",
            "strengths": ["Long-horizon planning and pattern recognition", "Clear standards and principled problem solving", "Self-directed learning and disciplined improvement"],
            "watchOuts": ["May appear blunt or distant when stressed", "Can neglect emotional signals or social maintenance"],
            "career": {
                "motivators": "Complex problems, autonomy, intellectual challenge, measurable impact.",
                "environments": "High trust, low politics, strong competence culture; room for long-term work.",
                "roles": "Research/engineering, systems design, data/ML, strategy, product architecture, technical leadership.",
                "tips": "Build feedback loops for people-impact (stakeholder check-ins; empathy rituals)."
            },
            "relationships": {
                "values": "Loyalty, competence, autonomy, honesty.",
                "conflict": "May default to 'fixing' rather than validating.",
                "helps": "Start with validation, then solutions: 'That makes sense. Want comfort or a plan?'"
            },
            "social": "Often prefers fewer, deeper relationships; energizes with ideas and purpose.",
            "stressGrowth": {
                "stressSigns": "Rigidity, impatience, cynicism.",
                "growthEdge": "Presence, play, and relational maintenance."
            }
        },
        "INTP": {
            "code": "INTP",
            "title": "The Conceptual Analyst",
            "oneLiner": "An idea-driven analyst who prefers understanding how things work, with lots of mental freedom.",
            "strengths": ["Deep reasoning and model-building", "Intellectual curiosity and originality", "Precision with concepts and definitions"],
            "watchOuts": ["Can get stuck in analysis; difficulty finishing", "May under-communicate feelings or needs"],
            "career": {
                "motivators": "Exploration, complexity, autonomy, elegant solutions.",
                "environments": "Flexible structures, research time, minimal micromanagement.",
                "roles": "Research, software, math/engineering, architecture, writing/analysis.",
                "tips": "Use lightweight execution systems: milestones, accountability partner, shipping rituals."
            },
            "relationships": {
                "values": "Intellectual companionship, independence, authenticity.",
                "conflict": "Can intellectualize; partner may feel unseen.",
                "helps": "Reflect feelings in simple language before analyzing."
            },
            "social": "Often prefers small groups and long-form conversation.",
            "stressGrowth": {
                "stressSigns": "Withdrawal, procrastination, dismissiveness.",
                "growthEdge": "Follow-through and emotional attunement."
            }
        },
        "ENTJ": {
            "code": "ENTJ",
            "title": "The Systems Commander",
            "oneLiner": "A decisive organizer who prefers leading, optimizing systems, and pursuing ambitious goals.",
            "strengths": ["Strategic execution; mobilizes people/resources", "Clear decisions and high standards", "Builds scalable structures and accountability"],
            "watchOuts": ["Can over-prioritize results over relationships", "May push pace too hard for others"],
            "career": {
                "motivators": "Ownership, responsibility, scaling impact, measurable outcomes.",
                "environments": "Authority aligned with responsibility; clear goals and autonomy.",
                "roles": "Leadership, operations, product, entrepreneurship, consulting.",
                "tips": "Add 'people metrics': retention, psychological safety, stakeholder satisfaction."
            },
            "relationships": {
                "values": "Competence, loyalty, growth, honesty.",
                "conflict": "May treat conflict as a problem to solve quickly.",
                "helps": "Make room for emotions as data; slow down for repair conversations."
            },
            "social": "Often networks strategically; prefers purposeful social time.",
            "stressGrowth": {
                "stressSigns": "Controlling behavior, impatience, harshness.",
                "growthEdge": "Empathy, rest, and letting others lead."
            }
        },
        "ENTP": {
            "code": "ENTP",
            "title": "The Inventive Debater",
            "oneLiner": "A fast-thinking explorer who prefers novelty, debate, and discovering new angles on ideas.",
            "strengths": ["Ideation and reframing problems", "Rapid learning and creative persuasion", "Plays with possibilities; energized by change"],
            "watchOuts": ["May start more than they finish", "Debate style can accidentally feel personal"],
            "career": {
                "motivators": "Variety, innovation, autonomy, intellectual play.",
                "environments": "High-change contexts; roles with experimentation.",
                "roles": "Entrepreneurship, product innovation, marketing strategy, consulting, R&D.",
                "tips": "Use constraints: deadlines, scope limits, 'one project at a time' rules."
            },
            "relationships": {
                "values": "Mental chemistry, humor, independence, growth.",
                "conflict": "Can argue for fun while partner experiences it as conflict.",
                "helps": "Ask consent for debate: 'Brainstorm mode or support mode?'"
            },
            "social": "Often wide circles; thrives in lively conversation.",
            "stressGrowth": {
                "stressSigns": "Restless avoidance, provocations, scattered focus.",
                "growthEdge": "Commitment, routine, and deeper emotional presence."
            }
        },
        "INFJ": {
            "code": "INFJ",
            "title": "The Insightful Advocate",
            "oneLiner": "An insight-driven idealist who prefers depth, meaning, and purposeful contribution.",
            "strengths": ["Deep empathy combined with pattern insight about people", "Values-driven persistence", "High-quality one-to-one support and mentorship"],
            "watchOuts": ["Over-responsibility for others", "Perfectionism; burnout when ideals meet messy reality"],
            "career": {
                "motivators": "Meaning, growth, improving systems for humans, autonomy + trust.",
                "environments": "Mission-driven orgs, research/strategy roles with impact, supportive culture.",
                "roles": "Counseling/coaching, education, research, writing, product/user research, org development.",
                "tips": "Schedule recovery; practice 'good enough' delivery."
            },
            "relationships": {
                "values": "Depth, loyalty, emotional honesty, shared meaning.",
                "conflict": "May withdraw if misunderstood; may overthink.",
                "helps": "Direct needs language + reassurance; don't rely on hints."
            },
            "social": "Often small circles; prefers deep conversation over frequent casual contact.",
            "stressGrowth": {
                "stressSigns": "Rumination, irritability, 'door slam' withdrawal.",
                "growthEdge": "Present-moment grounding and boundaries."
            }
        },
        "INFP": {
            "code": "INFP",
            "title": "The Values-Centered Idealist",
            "oneLiner": "A gentle idealist who prefers authenticity, personal meaning, and exploring possibilities.",
            "strengths": ["Strong inner compass and integrity", "Creativity and emotional nuance", "Empathy and perspective-taking"],
            "watchOuts": ["Can struggle with structure, deadlines, or impersonal criticism", "May delay decisions to keep options open"],
            "career": {
                "motivators": "Meaning, autonomy, creative expression, humane culture.",
                "environments": "Flexible roles with mission alignment; supportive feedback.",
                "roles": "Writing/design/creative work, helping roles (education, counseling, community work).",
                "tips": "Use gentle structure: weekly planning, time-boxing, 'minimum viable completion.'"
            },
            "relationships": {
                "values": "Authenticity, emotional safety, shared values.",
                "conflict": "Avoidance then sudden intensity if values feel threatened.",
                "helps": "Normalize conflict as repair; use clear requests."
            },
            "social": "Often selective; prefers a few intimate bonds.",
            "stressGrowth": {
                "stressSigns": "Escapism, self-criticism, withdrawal.",
                "growthEdge": "External structure and assertive communication."
            }
        },
        "ENFJ": {
            "code": "ENFJ",
            "title": "The Growth-Oriented Organizer",
            "oneLiner": "A relational leader who prefers guiding people toward growth and building harmony.",
            "strengths": ["Motivates and coordinates people", "High emotional intelligence in groups", "Communicates vision in human terms"],
            "watchOuts": ["Overextension and people-pleasing", "Difficulty tolerating conflict or disappointment"],
            "career": {
                "motivators": "Mentoring, culture-building, meaningful leadership.",
                "environments": "Collaborative orgs, education, people operations, community roles.",
                "roles": "Teaching/training, HR/people leadership, coaching, program management.",
                "tips": "Practice saying 'no' and protecting deep work time."
            },
            "relationships": {
                "values": "Commitment, shared goals, emotional openness.",
                "conflict": "May manage emotions too much; can become resentful.",
                "helps": "Ask directly for needs; allow others to carry responsibility."
            },
            "social": "Often broad networks; enjoys hosting and connecting people.",
            "stressGrowth": {
                "stressSigns": "Burnout, controlling harmony, guilt.",
                "growthEdge": "Self-care, boundaries, and tolerating disagreement."
            }
        },
        "ENFP": {
            "code": "ENFP",
            "title": "The Possibility Catalyst",
            "oneLiner": "A high-energy explorer of people and ideas who prefers novelty, meaning, and freedom.",
            "strengths": ["Inspires and energizes others", "Sees potential and connections quickly", "Strong storytelling and idea generation"],
            "watchOuts": ["Can scatter attention; struggles with routine", "May chase novelty when anxious"],
            "career": {
                "motivators": "Variety, autonomy, people, creativity, mission.",
                "environments": "Dynamic teams; roles with ideation + relationship-building.",
                "roles": "Product/marketing/communications, community building, coaching, education, entrepreneurship.",
                "tips": "Use simple systems: one priority per quarter, weekly review, finish rituals."
            },
            "relationships": {
                "values": "Emotional openness, play, growth, authenticity.",
                "conflict": "Can over-interpret signals; needs reassurance and clarity.",
                "helps": "Direct communication + shared plans that still allow spontaneity."
            },
            "social": "Often wide circles; needs decompression time after intense social output.",
            "stressGrowth": {
                "stressSigns": "Overcommitment, anxiety spirals, avoidance of boring tasks.",
                "growthEdge": "Consistency and grounded follow-through."
            }
        },
        "ISTJ": {
            "code": "ISTJ",
            "title": "The Dependable Logistician",
            "oneLiner": "A steady, detail-aware planner who prefers clarity, responsibility, and proven methods.",
            "strengths": ["Reliability and follow-through", "Strong standards and consistency", "Detail accuracy and methodical execution"],
            "watchOuts": ["Can be rigid under stress", "May undervalue novelty or ambiguous ideas"],
            "career": {
                "motivators": "Clear expectations, stable systems, measurable quality.",
                "environments": "Structured roles, clear authority, high trust in competence.",
                "roles": "Operations, finance/accounting, engineering with procedures, compliance.",
                "tips": "Schedule small experiments; practice curiosity about alternative approaches."
            },
            "relationships": {
                "values": "Loyalty, dependability, respect.",
                "conflict": "Can become 'rule-focused.'",
                "helps": "Translate standards into needs: 'I feel safe when we…'"
            },
            "social": "Often prefers a smaller, long-term circle; shows care through practical support.",
            "stressGrowth": {
                "stressSigns": "Stubbornness, judgment, over-control.",
                "growthEdge": "Flexibility and emotional expression."
            }
        },
        "ISFJ": {
            "code": "ISFJ",
            "title": "The Supportive Protector",
            "oneLiner": "A caring stabilizer who prefers helping through service, details, and consistency.",
            "strengths": ["Warm reliability; remembers what matters to people", "Steady support and practical care", "Conscientious follow-through"],
            "watchOuts": ["Overgiving; difficulty saying no", "Takes criticism personally"],
            "career": {
                "motivators": "Helping others concretely; stable routines; appreciation.",
                "environments": "Supportive teams, predictable operations, clear roles.",
                "roles": "Healthcare support, education support, administration, quality roles.",
                "tips": "Build boundary habits: capacity limits, protected time."
            },
            "relationships": {
                "values": "Security, loyalty, daily thoughtfulness.",
                "conflict": "Avoidance until overwhelmed.",
                "helps": "Make needs explicit early; normalize disagreement."
            },
            "social": "Often a 'quiet backbone' friend; shows up reliably.",
            "stressGrowth": {
                "stressSigns": "Resentment, worry, over-functioning.",
                "growthEdge": "Assertiveness and self-prioritization."
            }
        },
        "ESTJ": {
            "code": "ESTJ",
            "title": "The Practical Executive",
            "oneLiner": "A results-focused organizer who prefers structure, clarity, and getting things done.",
            "strengths": ["Fast execution and strong coordination", "Builds systems, standards, accountability", "Handles logistics and decisions under pressure"],
            "watchOuts": ["Can be blunt; may overlook emotional impact", "Can overemphasize rules when flexibility is needed"],
            "career": {
                "motivators": "Responsibility, authority aligned with accountability, clear KPIs.",
                "environments": "Structured orgs, operations-heavy contexts, leadership tracks.",
                "roles": "Operations, management, project/program leadership, logistics.",
                "tips": "Add 'people check-ins' to avoid friction and improve retention."
            },
            "relationships": {
                "values": "Loyalty, responsibility, shared goals.",
                "conflict": "Can become solution-driven quickly.",
                "helps": "Validate feelings before solutions; soften tone."
            },
            "social": "Often community-oriented and organized; may take charge of group logistics.",
            "stressGrowth": {
                "stressSigns": "Controlling, impatient, critical.",
                "growthEdge": "Empathy, flexibility, and rest."
            }
        },
        "ESFJ": {
            "code": "ESFJ",
            "title": "The Harmonizing Contributor",
            "oneLiner": "A people-centered organizer who prefers harmony, belonging, and practical care.",
            "strengths": ["Social attunement and inclusion", "Reliable follow-through on commitments", "Builds community rituals and cohesion"],
            "watchOuts": ["Over-focus on approval", "Can struggle with impersonal critique"],
            "career": {
                "motivators": "Helping people, teamwork, appreciation, clear roles.",
                "environments": "Collaborative orgs with stable processes.",
                "roles": "People ops, education, healthcare coordination, customer success, events.",
                "tips": "Practice boundaries and independent decision-making."
            },
            "relationships": {
                "values": "Commitment, warmth, shared social life.",
                "conflict": "May personalize conflict; may 'manage' emotions.",
                "helps": "Use direct requests; separate behavior from identity."
            },
            "social": "Often thrives in community; remembers details; creates traditions.",
            "stressGrowth": {
                "stressSigns": "People-pleasing, gossip/triangulation, burnout.",
                "growthEdge": "Self-assertion and tolerating disagreement."
            }
        },
        "ISTP": {
            "code": "ISTP",
            "title": "The Troubleshooter",
            "oneLiner": "A pragmatic problem solver who prefers autonomy, skill, and real-world experimentation.",
            "strengths": ["Calm under pressure; fast troubleshooting", "Learns by doing; practical logic", "Efficient, minimalistic problem framing"],
            "watchOuts": ["Can disengage from long emotional processing", "May avoid long-term commitment when it feels constraining"],
            "career": {
                "motivators": "Real problems, tools/systems, autonomy, immediate feedback.",
                "environments": "Flexible workflows, competence-based trust, low bureaucracy.",
                "roles": "Engineering (hardware/software), SRE/ops, security, trades/technical crafts.",
                "tips": "Build habits that scale: documentation, handoffs, proactive status updates."
            },
            "relationships": {
                "values": "Independence, loyalty, low drama, shared activities.",
                "conflict": "Partner may want more verbal reassurance.",
                "helps": "Use 'action + words': do the supportive act and say why it matters."
            },
            "social": "Often prefers small groups and activity-based friendships.",
            "stressGrowth": {
                "stressSigns": "Withdrawal, irritability, sensation-seeking.",
                "growthEdge": "Emotional vocabulary and long-horizon planning."
            }
        },
        "ISFP": {
            "code": "ISFP",
            "title": "The Authentic Creator",
            "oneLiner": "A gentle, values-led person who prefers authenticity, creative expression, and harmony.",
            "strengths": ["Artistic/aesthetic sensitivity and craftsmanship", "Warm, nonjudgmental presence", "Adaptable and present-focused"],
            "watchOuts": ["Conflict avoidance; may not voice needs early", "Sensitive to harsh critique or rigid control"],
            "career": {
                "motivators": "Meaningful work, beauty/craft, autonomy, humane culture.",
                "environments": "Flexible structure; respectful feedback; room for individual style.",
                "roles": "Design (visual/UX), arts/media, crafts, care roles.",
                "tips": "Learn boundary scripts and direct requests."
            },
            "relationships": {
                "values": "Kindness, authenticity, calm, shared experience.",
                "conflict": "Avoids escalation; may shut down if pushed.",
                "helps": "Use low-intensity conflict tools: 'When X happens, I feel Y; I need Z.'"
            },
            "social": "Often prefers smaller gatherings; bonds through shared experiences.",
            "stressGrowth": {
                "stressSigns": "Withdrawal, emotional flooding, 'going along' then resentment.",
                "growthEdge": "Self-advocacy and gentle structure."
            }
        },
        "ESTP": {
            "code": "ESTP",
            "title": "The Action Improviser",
            "oneLiner": "An energetic doer who prefers solving problems fast, adapting in real time, and learning on the fly.",
            "strengths": ["Quick action and high situational awareness", "Persuasion and negotiation", "Practical risk-taking and resilience"],
            "watchOuts": ["Can underweight long-term consequences", "Boredom with maintenance work"],
            "career": {
                "motivators": "Variety, speed, autonomy, tangible wins.",
                "environments": "Fast feedback loops; real-world stakes; room to move.",
                "roles": "Sales/BD, entrepreneurship, field operations, emergency roles, product iteration.",
                "tips": "Add reflection rituals: postmortems, long-term metrics, planning blocks."
            },
            "relationships": {
                "values": "Fun, loyalty, honesty, shared experiences.",
                "conflict": "Can escalate quickly or push for immediate resolution.",
                "helps": "Pause before reacting; practice 'slow listening.'"
            },
            "social": "Often thrives in groups; energizes the atmosphere.",
            "stressGrowth": {
                "stressSigns": "Impulsivity, conflict seeking, escapism.",
                "growthEdge": "Patience and long-term responsibility."
            }
        },
        "ESFP": {
            "code": "ESFP",
            "title": "The Warm Energizer",
            "oneLiner": "A friendly connector who prefers shared experiences, practical positivity, and bringing people together.",
            "strengths": ["Social warmth and builds belonging", "Practical realism; meets immediate needs", "Adaptable learning through experience"],
            "watchOuts": ["May avoid negative emotions or long-term planning", "Can over-prioritize approval or excitement"],
            "career": {
                "motivators": "People interaction, variety, visible impact.",
                "environments": "Social, active roles with real-time feedback.",
                "roles": "Hospitality/events, education, customer success, community work, sales, content creation.",
                "tips": "Simple planning tools: weekly review, budget, calendar rituals."
            },
            "relationships": {
                "values": "Affection, appreciation, playfulness, shared activities.",
                "conflict": "May want to 'move on' too quickly.",
                "helps": "Schedule short but regular serious conversations."
            },
            "social": "Often broad circles; needs occasional quiet time despite social energy.",
            "stressGrowth": {
                "stressSigns": "Comfort seeking, avoidance, over-socializing.",
                "growthEdge": "Tolerating discomfort and planning ahead."
            }
        }
    }
};
