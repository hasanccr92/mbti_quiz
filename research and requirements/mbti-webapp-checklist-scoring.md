# mbti-webapp-checklist-scoring.md
Last updated: Feb 2026

This document is a build checklist plus a scoring design that’s similar to adaptive quizzes (like the reference site), but more transparent and robust for borderline results.

---

## 1) What else you need (shipping checklist)

### Product & UX
- Onboarding: “what this is / isn’t” (preferences, not abilities; not clinical; not for hiring/selection).
- Instructions: answer as you typically are when relaxed, not as your job forces you to be.
- Progress UI: progress bar, time estimate, ability to go back (optional).
- Results UX:
  - Show type code + short summary first.
  - Provide detailed sections (career, relationships, social interactions, stress/growth) via progressive disclosure.
  - Show dimension percentages + confidence/borderline label.

### Content operations
- Store content as data (not hardcoded):
  - questions.json (id, dimension, prompt, A/B text, scoring key, weight)
  - profiles.json or profiles/*.md (16 profiles: short + detailed)
- Version your content (v1, v2…) so you can update without breaking old links.
- Style guide: keep tone consistent across all 16 types; avoid deterministic phrasing (“you will…”) and prefer “you may…” language.

### Measurement & QA
- Question coverage balance:
  - Ensure each dichotomy has enough items (ideally 12–20 per dichotomy if non-adaptive).
- Check for leading items (one option obviously “better”).
- Add “borderline handling” rules (see scoring).
- Analytics to improve your test:
  - completion rate, drop-off points, average time/question, distribution of types.

### Engineering
- Clear separation:
  - Frontend renders questions and collects responses.
  - Scoring module computes: raw counts, percents, confidence, final type.
  - Content module loads type writeups.
- Provide exports:
  - “Download results” as Markdown/PDF.
  - Optional: shareable link (only if you implement privacy-safe storage).
- Accessibility:
  - keyboard navigation, readable font sizes, contrast, mobile layout.

### Ethics, privacy, and compliance
- Prominent disclaimer:
  - MBTI-like results are for self-reflection/communication; not diagnosis; not for hiring/selection.
- Privacy:
  - Collect minimal data; clear consent; allow deleting results.
  - If you store results, explain retention and what is stored.

---

## 2) Scoring: what to do (and why)

### Goals
- Keep it understandable (users trust transparent scores).
- Handle borderline results gracefully.
- Support adaptive questioning (ask fewer questions overall).

### Key terms
- Each dichotomy: E/I, S/N, T/F, J/P
- For each dichotomy, compute:
  - counts (or weighted sums)
  - percent split
  - confidence band

---

## 3) Scoring option A (recommended default)
### Binary forced-choice counts + confidence (simple, robust)

How it works
- Each question maps to one dichotomy and gives 1 point to one pole.
- Total points per pole → percent.

Pseudocode
```js
const scores = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};

for (const response of responses) {
  // response.key is one of E/I/S/N/T/F/J/P
  scores[response.key] += 1;
}

function percent(a,b){ return a/(a+b); }

const pE = percent(scores.E, scores.I);
const pS = percent(scores.S, scores.N);
const pT = percent(scores.T, scores.F);
const pJ = percent(scores.J, scores.P);

const type =
  (pE > 0.5 ? 'E':'I') +
  (pS > 0.5 ? 'S':'N') +
  (pT > 0.5 ? 'T':'F') +
  (pJ > 0.5 ? 'J':'P');

Borderline rule

    If any percent is in [0.45, 0.55], label that dimension “borderline”.

    In UI, show:

        “You’re close on S/N—read both S and N sections and see which fits better.”

4) Scoring option B
5-point response scale (strongly A … strongly B) + weighted sums

How it works
Instead of only A/B, the user chooses:

    Strongly A, Slightly A, Neutral, Slightly B, Strongly B

Map these to weights, e.g.:

    Strongly A = +2 toward pole A

    Slightly A = +1

    Neutral = 0

    Slightly B = +1 toward pole B

    Strongly B = +2 toward pole B

Pseudocode

js
// For a question keyed to EI:
const weightMap = {strongA:2, slightA:1, neutral:0, slightB:1, strongB:2};

if (answer === 'strongA' || answer === 'slightA') scores.E += weightMap[answer];
if (answer === 'strongB' || answer === 'slightB') scores.I += weightMap[answer];
// neutral adds nothing

Pros

    Better signal from each item.

    Reduces randomness when users feel “it depends”.

Cons

    Slightly longer cognitive load per question.

    Need careful UI to keep it fast.

5) Scoring option C
Adaptive questioning (recommended) + stopping rule

You can keep the quiz short by focusing later questions on the most uncertain dichotomies.

Simple adaptive algorithm

    Ask an initial set: 2–3 items per dichotomy (8–12 total).

    Compute percent splits and identify “closest to 50/50” dimension(s).

    Ask another question targeting the most uncertain dimension.

    Stop when:

        all dimensions are non-borderline, or

        you hit max questions (e.g., 40), or

        uncertainty improvement becomes negligible.

Stopping rule example

    Stop if all four dims have confidence ≥ “moderate”, e.g., percent ≥ 0.60 for one side (or ≤ 0.40).

    Otherwise continue up to a max.

Pseudocode

js
function uncertainty(p){ return Math.abs(p - 0.5); }

while (asked < MAX_Q) {
  const dims = [
    {d:'EI', p: pE},
    {d:'SN', p: pS},
    {d:'TF', p: pT},
    {d:'JP', p: pJ},
  ].sort((a,b)=> uncertainty(a.p) - uncertainty(b.p));

  // If every dimension is at least 60/40, stop
  if (uncertainty(dims.p) >= 0.10) break;

  askNextQuestion({ targetDimension: dims.d });
  // recompute pE, pS, pT, pJ after recording answer
}

Why adaptive works well

    Users finish faster.

    You spend questions where they matter most.

6) What I’d choose (practical recommendation)

    Keep adaptive questioning (Option C) for UX.

    Use counts + percentages + borderline labeling (Option A) for transparency.

    If you want a step up, add the 5-point scale (Option B) once the UI is stable.

7) Sources (for your credibility footer)

    Myers & Briggs Foundation — Reliability/Validity:
    https://www.myersbriggs.org/research-and-library/validity-reliability/

    Myers & Briggs Foundation — Careers:
    https://www.myersbriggs.org/type-in-my-life/personality-type-and-careers/home.htm

    Myers & Briggs Foundation — Relationships:
    https://www.myersbriggs.org/type-in-my-life/personality-type-and-relationships/

    Myers‑Briggs Company (EU) — Reliability/Validity PDF:
    https://eu.themyersbriggs.com/-/media/Files/PDFs/Technical-information/MBTI_reliability_and_validity_info.pdf

    Jíleček Archetypes analysis (context/inspiration):
    https://archetypes.jilecek.cz/analysis/