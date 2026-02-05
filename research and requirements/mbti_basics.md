# MBTI Webapp Research & Content Pack (for an MBTI-like quiz)

Last updated: Feb 2026.  
Goal: Help you build a webapp like mbti.jilecek.cz with (1) a question bank, (2) scoring/adaptive flow, and (3) high-quality, user-friendly result writeups (short + detailed), with appropriate scientific caveats.

---

## 1) What this test is (and is not)

**MBTI (Myers‑Briggs Type Indicator)** is a personality *preference* framework that sorts people into 16 “types” based on four dichotomies (E–I, S–N, T–F, J–P). [web:17]  
It is primarily intended for **self-reflection, communication, and development**, not for clinical diagnosis or employment selection. [web:17]

What it is good for:
- Giving users a vocabulary to discuss differences in attention, information-gathering, decision-making, and lifestyle preferences. [web:17]

What it is not good for:
- Diagnosing mental health conditions.
- Predicting job performance with high accuracy.
- Making hiring or firing decisions (legal/ethical risk).

---

## 2) Origins and attribution (credibility)

### Carl Jung (original theoretical root)
The MBTI framework is historically rooted in Carl Gustav Jung’s ideas about psychological “types,” especially the attitudes of **extraversion/introversion** and function-like differences in perception and judgment. [web:17]

### Katharine Cook Briggs & Isabel Briggs Myers (MBTI creators)
Katharine Briggs and Isabel Briggs Myers developed the MBTI instrument over time, adding the **Judging/Perceiving** dimension to create the modern 16-type code system. [web:17]

**Important:** The official MBTI assessment is proprietary. You can build an “MBTI-like” webapp (inspired by the dichotomies) without copying proprietary items verbatim.

---

## 3) Who should take it (and how to position it)

**Good fit users**
- Curious users who want a structured reflection tool. [web:17]
- Students exploring work styles and learning preferences.
- Teams/couples who want a neutral language for differences (with disclaimers). [web:17]

**Not a good fit users**
- Users looking for medical or clinical conclusions.
- Users forced to take it for hiring/selection.

**UX copy suggestion**
- “This quiz suggests your *preferences*—not your abilities, intelligence, or worth.”
- “If your scores are close to the middle, your type may be less stable across retakes.”

---

## 4) How it works (user-level explanation)

Most MBTI-like quizzes work by:
1. Asking forced-choice questions that map to one of the poles (e.g., E vs I).  
2. Summing scores across each dichotomy.  
3. Assigning the letter for the higher side in each pair.  
4. Presenting a 4-letter type plus interpretive text.

Best practice: also show **percentages** or **confidence bands** per dichotomy so users can see borderline results.

---

## 5) Accuracy, reliability, validity (what to say honestly)

You should be transparent and balanced.

### Reliability (consistency)
The Myers & Briggs Foundation notes that debates about MBTI reliability/validity often hinge on “type” (dichotomous) vs “trait” (continuous) measurement assumptions, and cites evidence that MBTI can show acceptable reliability in certain studies. [web:17]  
An official Myers‑Briggs Company technical info PDF summarizes evidence and cites (among other items) Capraro & Capraro (2002), reporting generally strong internal consistency/test–retest reliability with some variation across scales and studies. [web:26]

### Validity (measuring what it claims)
The Myers & Briggs Foundation argues there is evidence across multiple validity approaches (relationships with other measures, internal structure, practical validity), but acknowledges ongoing debate with trait-based models. [web:17]  
Your webapp should not oversell predictive claims (e.g., “this type will be a better engineer”), and should frame outputs as tendencies and reflection prompts.

**Recommended disclaimer block (plain language)**
- “This is a self-report questionnaire; your results can vary with context, mood, and life stage.”
- “If you score near 50/50 on a dimension, consider reading both sides or adjacent types.”
- “Use this as a starting point for reflection, not a label.”

---

## 6) Building a strong question bank (and adding “a few more”)

### Use a blueprint (coverage)
Target: 48–80 questions total (or adaptive 25–45 shown to each user).

Coverage goals:
- E/I: 12–20 items
- S/N: 12–20 items
- T/F: 12–20 items
- J/P: 12–20 items

### Item writing rules (important)
- Each question should target **one** dimension primarily.
- Avoid double-barreled items (“Do you like planning and also hate surprises?”).
- Keep both options equally socially desirable.
- Rotate which side is option A vs B.
- Write in concrete situations (work, study, friends, conflict, deadlines).

### Add question variety (examples of themes)
E/I themes:
- Recharge method, group vs 1:1, external processing vs internal processing.

S/N themes:
- Detail vs pattern, practical vs conceptual, present facts vs future possibilities.

T/F themes:
- Principle vs harmony, critique vs empathy, fairness vs compassion.

J/P themes:
- Planning vs flexibility, closure vs exploration, deadlines vs open-ended.

### Adaptive selection (like jilecek)
A simple adaptive strategy:
1. Start with 2–3 broad questions per dimension.
2. Estimate probabilities for each pole.
3. Continue asking questions **only** in the dimensions that are closest to 50/50.
4. Stop when each dimension confidence passes threshold or question budget is used.

---

## 7) Scoring + “confidence” you can show users

For each dimension pair (example E/I):
- `E_count`, `I_count`
- `E_percent = E_count / (E_count + I_count)`

Confidence heuristics:
- 50–55%: Slight preference (low confidence)
- 56–65%: Moderate preference
- 66–80%: Clear preference
- 81–100%: Very strong preference (rare; watch for response bias)

Also consider detecting response bias:
- Too-fast completions
- Always choosing option A
- Contradictory items if you include reversals

---

## 8) Result writeups: short + detailed (template)

### A) Short summary (what user sees first)
Structure:
- Type code + title
- 1–2 sentence essence
- 4 bullets: strengths
- 2 bullets: watch-outs
- 4 dimension bars (percentages)

**Example template**
**Your type: INTP**
- Essence: You prefer analyzing systems and ideas, and you recharge with solitude.
- Strengths: Conceptual clarity; independent thinking; curiosity; problem decomposition.
- Watch-outs: Overthinking; delaying decisions when information is incomplete.

### B) Detailed version (career, relationships, social life, etc.)
Keep it supportive, non-deterministic, and scenario-based.

Recommended sections (per type):
1. How you recharge and communicate (E/I)
2. How you take in information (S/N)
3. How you decide (T/F)
4. How you structure life (J/P)
5. Strengths in action (work + study)
6. Common stress patterns + growth suggestions
7. Career environment fit (not “jobs you must do”)
8. Relationships: conflict style, needs, appreciation language
9. Social life: group size preference, friendships, boundaries
10. Practical tips (3–6 actionable habits)

**Career (probable effects) – how to write**
- Prefer: “You may enjoy roles that…”  
- Avoid: “You will be successful only in…”

**Relationships (probable effects) – how to write**
- Prefer: “You may need…” / “You might value…”  
- Avoid: “You are incompatible with…”

---

## 9) Ethical + legal notes for an MBTI-like app

Do:
- Provide disclaimers (self-report, not clinical, not hiring). [web:17]
- Respect privacy; allow deleting results.
- Avoid discriminatory language; avoid ranking types.
- Make “borderline” results explicit.

Don’t:
- Claim medical accuracy.
- Recommend hiring based on type.
- Present the output as fate.

---

## 10) “Original MBTI” availability and licensing reality

The official MBTI assessment (items, scoring, manuals) is proprietary to its publishers. [web:26]  
So your best route is: build an **MBTI-inspired** instrument with original wording and transparent limitations, and cite historical roots + psychometric discussions rather than copying test items verbatim. [web:17][web:26]

---

## 11) Engineering notes (practical webapp)

Data model suggestion:
- `questions`: {id, dimension, prompt, optionA, optionB, keyA, keyB, weight}
- `results`: raw counts + percents + confidence + final type string
- `profiles`: per-type content blocks for summary and detailed writeup

Output:
- Show the summary immediately.
- Put the detailed profile behind “Read more” (progressive disclosure).
- Provide “Download results” as PDF/Markdown.

---

## 12) Credible references (minimum set)

- Myers & Briggs Foundation – “Reliability and Validity of the Myers‑Briggs Type Indicator® Instrument” (discussion + citations, incl. Capraro 2002, and a 1,721-adult global sample example). [web:17]
- The Myers‑Briggs Company (EU) – “Reliability and validity of the MBTI® instrument” technical information PDF (summary of reliability/validity evidence; cites Capraro & Capraro 2002). [web:26]

---

## 13) Next step (so I can tailor it)

Tell me:
1) Do you want your app to be strictly **4 dichotomies** only, or also show **cognitive functions** as an optional “advanced view”?  
2) What stack: React/Next.js, Vue/Nuxt, or plain HTML/JS?
