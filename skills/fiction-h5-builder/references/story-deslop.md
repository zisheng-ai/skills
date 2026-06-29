# Story Deslop

Load this reference when the user asks to remove AI flavor from novel prose, or when prose review detects template patterns.

## Core Philosophy

AI flavor is not a grammar error — it is a style problem: over-polished, symmetrical, over-explained. The goal is to pull text from over-crafted back toward specific, natural, readable. Change the minimum amount to shift the character of the passage.

**Never delete entire paragraphs.** Plot function, foreshadow, character reveals, and tension hooks must survive. If a passage is bad, rewrite it — don't erase it.

## Step 0: Detect Language

Before running any gate, check the project's content language:

```bash
head -5 content/*/world/worldbuilding.md 2>/dev/null | grep -i "language\|语言\|언어\|言語"
```

If not found, detect from chapter prose content. Then route to the correct language section below.

| Language | Section to apply |
|---|---|
| Chinese (ZH) | ZH — Chinese |
| English (EN) | EN — English |
| Japanese (JA) | JA — Japanese |
| Korean (KO) | KO — Korean |
| Spanish (ES) | ES — Spanish |
| Multiple | Run each language's section on its content |

---

## ZH — Chinese

### Detection: The 7 Gates

Run the applicable gates based on severity (see Severity Levels below).

| Gate | Problem | Signal |
|---|---|---|
| A | Banned words / high-frequency clichés | "眼中闪过一丝" "深吸一口气" "嘴角勾起一抹" |
| B | Template sentence patterns | 否定铺垫+肯定翻转, "带着…", "声音不大却…", consecutive parallel structures ≥3 |
| C | Telling not showing (psychology) | "他感到" "她意识到" "内心涌起" without grounding action |
| D | Uniform rhythm / paragraph length | Every paragraph 4–6 sentences, identical beat |
| E | Flat dialogue tags | "说道/问道/笑道" on nearly every line |
| F | Moral summary endings | Last paragraph summarizes or moralizes what just happened |
| G | Narrator intrusion / god-view | "她不知道的是…" / "之所以…是因为" / evaluative aside that steps outside character POV |

### Severity Levels

| Level | Quantity signal | Gates to run |
|---|---|---|
| Mild | ≤5 banned words/1,000 chars, no consecutive 3+ templates | A + B |
| Moderate | 6–15 banned words/1,000 chars, or 3+ consecutive templates | A + B + C + D + G |
| Severe | >15 banned words/1,000 chars, or 4+ of the 7 Gates flagged | All 7 Gates + targeted rewrites |

Deletion cap by severity: Mild ≤15%, Moderate ≤25%, Severe ≤35% of the passage. Mark anything borderline `[NEEDS REVIEW]` rather than deleting.

### Natural Writing Benchmarks

| Dimension | Natural web fiction | AI-flavored text |
|---|---|---|
| Paragraph length | 1–3 sentences; occasional 1-sentence standalone | 4–6 sentences, uniform |
| Dialogue tags | 60%+ tagless, action-attributed | Nearly every line tagged |
| Emotion | Body action ("手在抖") | Direct statement ("很紧张") |
| Simile | Everyday ("像哈士奇护食") | Literary ("如寒冰般") |
| Filler words | Colloquial ("嘤" "嘶" "靠") | Almost none |
| Detail | Specific, concrete | Vague and thorough |
| Parallel structure | At most 1–2, never 3+ consecutive | 3–5 in a row is standard |
| Endings | Action or dialogue | Summary or uplift |

### Quick Replacement Reference

| AI-flavored phrase | Natural alternative |
|---|---|
| 深吸一口气 | 胸口起伏了一下 / delete |
| 眼中闪过一丝… | 他垂下眼 / 眯起眼 |
| 嘴角勾起一抹… | 笑了一下，没到眼底 / 乐了 |
| 仿佛/犹如/宛若 | 像… / white-describe |
| 不禁… | direct action |
| 缓缓开口 | 说 / action-then-dialogue |

---

## EN — English

### Detection: The 7 Gates

| Gate | Problem | Signal |
|---|---|---|
| A | Banned phrases / AI clichés | "her breath hitched" "his eyes darkened" "something shifted between them" "she let out a breath she didn't know she was holding" "her heart hammered in her chest" "heat pooled in her stomach" "obsidian eyes" "velvet voice" "a shiver ran down her spine" |
| B | Template sentence patterns | Tricolon fragments ("Fast. Hard. His."), every chapter ends on philosophical reflection, "she didn't know when she had started [X]", opening chapter with weather or protagonist waking up |
| C | Vague causation / telling not showing | "something about him made her feel/want/think" "for some reason she felt" "she couldn't explain why" without any grounding action or detail |
| D | Uniform rhythm / paragraph length | Every paragraph 3–5 sentences; no deliberate one-sentence gut-punches; no fragments; no rhythm variation |
| E | Over-tagged or flat dialogue | "he said" / "she replied" / "he responded" on nearly every line; minimal action attribution; no interruptions or tagless exchanges |
| F | Chapter-ending summary or uplift | Final paragraph wraps the emotional meaning of the scene; no forward pull; reader doesn't need the next chapter |
| G | LLM lexicon / register drift | "delve" "tapestry" "realm" "intricate" "navigate" "myriad" "testament" "indeed" "in the tapestry of" "it was a reminder that" in narrative prose |

### Severity Levels

| Level | Quantity signal | Gates to run |
|---|---|---|
| Mild | ≤3 banned phrases/1,000 words, no consecutive templates | A + B |
| Moderate | 4–10 banned phrases/1,000 words, or 2+ consecutive templates | A + B + C + D + G |
| Severe | >10 banned phrases/1,000 words, or 4+ of the 7 Gates flagged | All 7 Gates + targeted rewrites |

Deletion cap: Mild ≤15%, Moderate ≤25%, Severe ≤35%. Mark anything borderline `[NEEDS REVIEW]`.

### Natural Writing Benchmarks

| Dimension | Natural popular writing | AI-generated |
|---|---|---|
| Paragraph rhythm | Short bursts; 1–2 sentences; deliberate fragments at emotional peaks | Uniform 3–5 sentence blocks throughout |
| Emotion | Body action ("her stomach dropped") | Named emotion ("she felt afraid") |
| Dialogue | Largely tagless; action-attributed; interrupted; overlapping | Tagged nearly every line with said-verbs |
| Specificity | Brand names, specific textures, real street names | Generic ("a nice car," "expensive clothes," "the restaurant") |
| Pacing | Tension spike → brief release → re-escalate | Steady medium tension throughout |
| Sentence length | Varies: fragments to compound sentences in same paragraph | Consistently medium-length |

### Quick Replacement Reference

| AI phrase | Natural alternative |
|---|---|
| her breath hitched | her throat closed / delete the line entirely |
| his eyes darkened | his jaw tightened / he went very still / he said nothing |
| something shifted between them | [show what shifted: a glance held two seconds too long, a step not taken back] |
| she let out a breath she didn't know she was holding | her shoulders dropped / she exhaled without meaning to |
| her heart hammered / pounded in her chest | delete / show a different physical response (hands, stomach, throat) |
| "delve" / "tapestry" / "intricate" / "navigate" | rewrite the sentence from the ground up |
| Fast. Hard. His. (tricolon fragment) | integrate into a longer sentence or restructure the scene |
| "Something about him" | name the specific thing; if you can't name it, cut the phrase |
| she bit her lip | find the character's actual nervous tell, not the generic one |
| "He let out a low chuckle" | he laughed / he made a sound that wasn't quite a laugh |

---

## JA — Japanese

### Key Patterns

| Pattern | Why it's AI-typical | Fix |
|---|---|---|
| 「なぜか」(for some reason) before an emotion | Causation-free attribution; lazy shortcut | Show the cause through a sensory detail or preceding action |
| 「思わず」(involuntarily) before action | Removes character agency; feels authored not lived | Delete or rewrite with an active verb |
| 「心臓が跳ね上がった」as the only romantic physical tell | Single response used every chapter; no variation | Rotate: 喉、手、息、胃 — find a different body response each chapter |
| Protagonist internal monologue that re-explains what just happened | Doubles the scene; treats reader as slow | Cut entirely; trust the scene to land |
| Mirror opening (character describes themselves to themselves) | LLM default open; immediately recognizable as template | Start in action or dialogue; appearance detail emerges through interaction |
| Status screen dump inserted at an emotional peak | Breaks immersion at the wrong moment | Move system notifications to neutral scene transitions |
| All characters share identical speech cadence | No voice differentiation between characters | Each character needs at least one verbal tic or register difference |
| 「やれやれ」as protagonist reaction | Overused self-aware sigh; meme-adjacent | Find the character's actual resignation expression |

### Severity Assessment

- Mild: ≤2 patterns present, not recurring
- Moderate: 3–5 patterns, some recurring each episode
- Severe: 5+ patterns; core prose rhythm relies on them

---

## KO — Korean

### Key Patterns

| Pattern | Why it's AI-typical | Fix |
|---|---|---|
| 「왠지 모르게」(for some reason) before emotion | Direct equivalent of JA 「なぜか」; causation-free | Show the cause through context, preceding event, or body response |
| 「심장이 두근거렸다」(heart pounded) as the only romantic tell | Used every chapter with no variation | Rotate: 손, 목, 숨, 배 — find a different response each time |
| 「그의 눈이 흔들렸다」(his eyes wavered) for every male-lead shift | Over-used micro-expression; signals AI wrote the scene | Use behavioral change instead: he turned away, he paused, his answer came slower |
| Opening chapter as pure inner monologue with no external action | No reader hook; nothing to hold onto | Start at a specific moment; inner monologue can follow the opening action |
| Regression protagonist explaining the original timeline for 2+ episodes | Exposition dump; reader already understands the premise | Reveal through contrast with changed events, not narration |
| Identical 사이다 scene structure (tea party → revelation → antagonist collapses → bystanders gasp) | Template comeuppance; reads as generic | Build vindication across multiple episodes; vary the setting and antagonist reaction |
| Every side character has the same reaction to the heroine | No individual voice; all reactions feel authored | Give each side character one distinct behavioral tell or speech register |

### Severity Assessment

- Mild: ≤2 patterns, isolated appearances
- Moderate: 3–4 patterns recurring across episodes
- Severe: 5+ patterns; 사이다 moments are rushed and unearned; male lead has no behavioral differentiation

---

## ES — Spanish

### Key Patterns

| Pattern | Why it's AI-typical | Fix |
|---|---|---|
| "Suspiró profundamente" (sighed deeply) on every emotional beat | Single response used for any intensity of emotion | Find the character's specific physical response for this moment |
| "Su corazón se aceleró / latió con fuerza" | Overused romantic physical tell | Rotate: manos, garganta, estómago, mandíbula — vary by intensity |
| "Mariposas en el estómago" | Most overused sensation in ES romance; readers notice immediately | Replace with something specific to this character's personality and history |
| "Ojos oscuros como la noche / del color del chocolate" | Generic beauty description; doesn't characterize the gaze | Describe the quality of the gaze (cómo lo mira, no de qué color), not the color |
| All characters speak in neutral Castilian regardless of regional setting | No regional voice; indistinguishable | Decide on a register and apply it consistently: Argentine voseo, Mexican slang, or neutral Castilian |
| "Intrincado" / "tapiz" / "navegar" / "pilar" / "resonar" | LLM Spanish lexicon; formal register bleed | Rewrite the sentence in the character's natural voice |
| Run-on internal monologue with no rhythm breaks or action interruption | Wall-of-thought; no pacing | Break every 3–4 sentences with an action, dialogue line, or line break |

### Severity Assessment

- Mild: ≤3 patterns, not systematic
- Moderate: 4–6 patterns recurring each chapter
- Severe: 6+ patterns; prose voice indistinguishable from machine translation of English

---

## Three-Pass Method

Gate letters (A–G) are defined per language section above. Apply the gates of the detected language.

- **Pass 1 — Deabstract**: Gates A (clichés), C (vague causation/telling not showing), D (uniform rhythm), G (narrator intrusion / register drift)
- **Pass 2 — Deliteralize**: Gates A (literary/AI register), B (sentence templates)
- **Pass 3 — Restore natural voice**: Gates D (short/long rhythm mix), E (dialogue differentiation), F (ending de-moralization or de-summary), add specific sensory detail

- Mild: Pass 1 only
- Moderate: Pass 1 + Pass 2
- Severe: All 3 passes + targeted rewrites of worst paragraphs

## Whitelist

If the project root contains `.deslop-whitelist`, skip flagging any phrase that appears there. Format: one entry per line, `#` for comments. Use for world-building terms, character nicknames, or intentional stylistic choices that happen to match banned patterns.

## Deslop Report Format

```
## De-Slop Report

Language: {ZH / EN / JA / KO / ES}
AI flavor level: {mild / moderate / severe}
Gates applied: {A B C ...}
Deletion rate: {X%}

### Change Log
| Location | Gate | Original | Revised | Note |
|----------|------|----------|---------|------|

### [NEEDS REVIEW]
{Any passages marked for human review rather than auto-rewrite}
```
