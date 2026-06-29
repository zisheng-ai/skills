# Cover Styles

Reference for `story-cover.md`. Genre-to-visual-style mapping for cover image generation prompts.

## Site-Level Style Decision

**Before generating any covers, determine the site's primary visual register.** All books on the same site use the same render style — do not mix styles across books unless the site explicitly mixes genres (e.g. a general fiction platform).

| Site theme | Visual register | When to use |
|---|---|---|
| **Cinematic Drama** | AI film-still quality, photorealistic real actors, high contrast, emotion-first composition | Site hosts 都市 / 现言 / 悬疑 / 古言 content — contemporary or historical drama where characters feel human and real |
| **Dark Fantasy Illustration** | Hyperrealistic 3D render, near-black atmospheric background, gold/silver metallic typography, epic world elements | Site hosts 玄幻 / 仙侠 / 西幻 / 科幻 / 末世 content — power systems, cultivation, fantasy worlds, sci-fi |

Determine which register fits the site during **Phase 6 (Design plan)** and record it in the design-system notes. All Phase 3 cover generation for that site uses the same register.

If the site mixes genres, default to **Cinematic Drama** for realism-leaning titles and **Dark Fantasy Illustration** for genre-fantasy titles, but keep color palettes harmonized across covers so the homepage grid feels cohesive.

---

## Visual Style Standard

Both registers target **photorealistic or hyperrealistic 3D render quality** — not painted, not anime, not watercolor. The reference aesthetic is:

- **Cinematic Drama** (都市 / 现言 / 悬疑 / 古言): AI-generated film-still quality. Characters look like real actors in a directed scene. High contrast, shallow depth of field, emotion-first composition. Think: prestige drama movie poster or streaming series thumbnail.
- **Dark Fantasy Illustration** (西幻 / 玄幻 / 仙侠 / 科幻): Hyperrealistic 3D render, dark gradient background (deep black → navy/purple), character in detailed fantasy or sci-fi attire, dramatic atmospheric lighting. Gold/silver/chrome metallic typography is large and dominant in the lower 35% of the frame.

**Shared quality keywords (include in every prompt):**
`photorealistic, ultra-detailed, cinematic lighting, 8K render, professional book cover, shallow depth of field, dramatic atmosphere`

---

## Composition Templates

Pick the template that best matches the book's core tension. These mirror the reference visual language.

| Template | When to use | Description |
|---|---|---|
| **Power Inversion** | 都市/现言 revenge, humiliation, domination arcs | **TWO characters.** One standing figure (powerful, cold, composed) looks down at a kneeling/crying/bound figure. Third character optional as witness. Setting: luxury interior, parking garage, ballroom. |
| **Intimate Tension** | 现言/都市 romance, billionaire arcs | **TWO characters.** Two figures in close proximity — woman wrapped in white bed sheet with bare shoulders and legs visible to mid-thigh, clutching sheet to chest, expression of shock or conflict; man in open-collar shirt at rest on rumpled bed watching her. Luxury penthouse bedroom, floor-to-ceiling cityscape windows. Foreground props: champagne flute, scattered luxury items (jewelry, lipstick). |
| **Rain Shelter** | 悬疑/现言 dark romance, protection arcs | **TWO characters.** Two figures on a wet night street, one holding a black umbrella over the other. The protected figure looks downcast; the protector looks stern or conflicted. City lights reflect on the wet pavement. Setting can be European street or Asian neon city. |
| **Grand Humiliation** | 现言/都市 gala/elite society arcs | **TWO characters.** Glamorous dominant figure in deep-V plunging neckline floor-length gown (thigh-high slit, jeweled décolletage, red lips, chandelier jewels) stands elevated or turns away in contempt while a male figure kneels or collapses crying at her feet. Grand ballroom setting: chandeliers, champagne tower, roses, crowd of onlookers. |
| **Lone Hero** | 西幻/科幻/玄幻 cultivation/system/isekai | **ONE character.** Single powerful protagonist fills center-left frame, facing slightly away from camera. Epic world behind: ruined city + energy portal (sci-fi), snowy mountains + dark castle (fantasy), cloud sea + ancient pagodas (xianxia). Title in large metallic font occupies lower 35% of frame. |
| **Duo Confrontation** | 西幻/古言 romance + power | **TWO characters.** Two characters pressed together — powerful male behind or beside protected female. Dark dramatic background. Matching detailed costumes. Both look into distance or at camera with intensity. |

---

## Genre Detection Keywords

| Keywords in title | Genre | Style tag |
|---|---|---|
| 仙/道/剑/灵/修/宗/天/帝/尊/神 | 玄幻/仙侠 | `hyperrealistic 3D xianxia fantasy, dark misty atmosphere, divine golden light` |
| 都市/总裁/校园/重生/系统/学霸/医生/兵王 | 都市 | `cinematic photorealistic urban drama, film still quality, high contrast` |
| 妃/皇/侯/宫/嫡/庶/后/朝/凤/鸾 | 古言 | `hyperrealistic ancient Chinese palace drama, rich imperial colors, candlelight` |
| 总裁/契约/替嫁/甜宠/娇妻/萌宝/闪婚 | 现言 | `cinematic photorealistic modern romance, soft luxury atmosphere, warm glow` |
| 诡/案/侦探/悬疑/推理/密室/连环 | 悬疑 | `dark cinematic thriller, noir rainy atmosphere, chiaroscuro lighting` |
| 星际/末世/机甲/赛博/废土/进化 | 科幻 | `photorealistic sci-fi composite, dark blue black palette, glowing energy, futuristic cityscape` |
| 龙/骑/魔法/异世界/精灵/领主 | 西幻 | `hyperrealistic dark fantasy 3D render, black background, gold silver metallic elements` |
| 三国/大明/大唐/战场/将军/谋士 | 历史 | `cinematic historical war epic, dramatic battlefield lighting, iron and fire` |
| 鬼/僵尸/阴阳/风水/盗墓/咒 | 灵异 | `dark horror atmosphere, eerie green glow, cinematic supernatural tension` |
| 萌/喵/团宠/娇/转生 | 轻小说 | `vibrant anime-adjacent illustration, bright colors, expressive characters` |

---

## Title Font Style by Genre

| Genre | Title font keywords |
|---|---|
| 玄幻/仙侠 | `large bold golden embossed calligraphy with metallic glow, ornate separator lines above and below` |
| 都市 | `bold modern sans-serif in silver-white with subtle metallic sheen, clean layout` |
| 古言/宫斗 | `elegant golden traditional Kai script, ornate red-gold border frame` |
| 现言/甜宠 | `soft white rounded serif, warm glow, tagline in small italic below` |
| 悬疑/推理 | `stark white or blood-red condensed sans, sharp and cold` |
| 科幻/末世 | `chrome metallic condensed sans-serif, electric blue edge glow, large and aggressive` |
| 西幻 | `large gold embossed fantasy serif with glow halo, tagline text above and below in small spaced serif` |
| 历史/军事 | `heavy stone-carved seal script in deep red-gold` |
| 灵异/恐怖 | `eerie dripping gothic in sickly green-black` |
| 轻小说 | `colorful cartoon outlined bubbly font with star accents` |

---

## Author Name Style by Genre

| Genre | Author name keywords |
|---|---|
| 玄幻/仙侠 | `small refined white serif, faint golden glow, flanked by cloud-scroll ornaments, thin gold horizontal line` |
| 都市 | `small clean white modern sans, subtle drop shadow, thin silver divider` |
| 古言/宫斗 | `small elegant dark red traditional text, thin golden rectangular border` |
| 现言/甜宠 | `small soft white serif, tiny heart or petal motif, light sparkle` |
| 悬疑/推理 | `small pale grey, near-hidden in shadows, thin cracked line underneath` |
| 科幻/末世 | `small crisp white monospace, cyan scanline overlay, geometric bracket flanks` |
| 西幻 | `small bronze medieval script, decorative shield or crest shape` |
| 历史/军事 | `small dignified white Song typeface, double red horizontal line` |
| 灵异/恐怖 | `small faded grey-green, slightly tilted, dripping ink line above` |
| 轻小说 | `small playful rounded white, pastel outline, star decorations` |

---

## Genre Visual Details

### 玄幻/仙侠
- **Render style:** Hyperrealistic 3D dark fantasy render. Character fills 60% of frame, atmospheric world behind.
- **Colors:** Deep black → cold blue gradient base; gold and teal accent; divine white light beams
- **Characters:** Male — long tied or loose hair, sword or artifact held up, flowing dark robes with gold trim. Female — translucent fairy dress, glowing spiritual beast companion, lotus motif.
- **Background:** Vast cloud sea, sacred snow-capped mountains, ancient glowing pagodas, spiritual energy vortex
- **Lighting:** `divine golden light rays breaking through storm clouds, mystical mist, spiritual energy glow radiating from artifact`
- **Composition:** Lone Hero template; title in large gold in lower 35%

### 都市
- **Render style:** Cinematic photorealistic. Film still quality — characters look like real actors in a directed scene.
- **Colors:** Deep grey + cool blue base; warm amber/gold accent for luxury interiors; neon color for night streets
- **Characters:** Power dynamic compositions dominate. Male — tailored suit, sharp jawline, cold or dominant expression. Female — designer clothes or disheveled vulnerability.
- **Background:** Luxury penthouse interior, underground parking, corporate lobby, rainy city streets, gala ballroom
- **Lighting:** `dramatic chiaroscuro, harsh overhead light for power scenes, golden sunset for luxury interiors, neon reflections on wet streets`
- **Composition:** Power Inversion / Intimate Tension / Grand Humiliation templates

### 古言/宫斗
- **Render style:** Hyperrealistic period drama photography. Rich fabric textures, intricate costume detail.
- **Colors:** Imperial red + gold + deep ink black; jade green and imperial yellow accents
- **Characters:** Female — full elaborate court dress, phoenix crown, heavy ornate makeup, hair with gold hairpins. Male — emperor robes or general armor.
- **Background:** Grand palace halls, red-wall courtyards, silk curtains, golden lantern rows, cherry blossom garden
- **Lighting:** `warm golden candle and lantern glow, silk fabric shimmering, shafts of light through palace lattice`
- **Composition:** Duo Confrontation template; female in foreground, imperial setting dominant

### 现言/甜宠
- **Render style:** Cinematic photorealistic. Warm film grain quality, dreamy atmosphere.
- **Colors:** Warm cream + blush pink + soft gold; rainy blue-grey for dramatic variants
- **Characters:** Couple — emotional tension is the subject. Female often vulnerable (white bed sheet clutched to chest, bare shoulders and thighs exposed; or wet, disheveled). Male in open-collar shirt, at rest or looming, watching her. Foreground props: champagne flute, scattered jewelry, luxury items on glass table.
- **Background:** Luxury penthouse bedroom with floor-to-ceiling city skyline windows (golden sunset preferred); or rainy Asian or European street
- **Lighting:** `golden sunset pouring through panoramic windows, warm rim light on her bare shoulders, cool shadow on the man behind`
- **Composition:** Intimate Tension template (white sheet variant at highest intensity) / Rain Shelter template

### 悬疑/推理
- **Render style:** Cinematic dark photography. Stark, high-contrast, emotionally cold.
- **Colors:** Near-black + deep charcoal + cold blue; single accent in blood red or pale yellow
- **Characters:** Silhouette or partial reveal; calm/stone-faced expression. Rain Shelter composition is common — power gap between protector and protected.
- **Background:** Rain-slicked cobblestone streets, European stone buildings, dark alleys, foggy night bridges
- **Lighting:** `dramatic chiaroscuro, single hard overhead light or street lamp, rain-slicked surface reflections`
- **Composition:** Rain Shelter template with cold power-gap energy

### 科幻/末世
- **Render style:** Photorealistic composite / dark digital painting. Gritty and cinematic.
- **Colors:** Deep blue-black base; electric blue / cyan / purple energy glow; chrome silver
- **Characters:** Male in tactical armor or mech suit, back or side profile, one knee up on a ledge. Expression: steely, determined.
- **Background:** Futuristic cityscape from high above; energy portal / dimensional rift in sky; floating structures, neon corporate towers, crashed ships
- **Lighting:** `electric blue energy glow from portal above, city neon light from below, rim light on armor edges`
- **Composition:** Lone Hero template (back-to-viewer); title in large chrome lower 40%
- **Tagline:** Small serif text at very bottom: short punchy lines referencing the system/power concept

### 西幻
- **Render style:** Hyperrealistic dark fantasy 3D render. Near-black background with dramatic spot lighting on characters.
- **Colors:** Near-black base; deep navy/charcoal atmosphere; gold, silver, and burgundy accent
- **Characters:** Male protagonist in dark ornate robes/armor with gold detailing; female in matching dark dress with crown or tiara. Together or side-by-side.
- **Background:** Snow-covered mountains and dark gothic castle with glowing windows; stormy clouded sky; falling snow or embers
- **Lighting:** `moody dramatic backlight from glowing castle, falling snow catching light, gold trim on costumes catching a rim light`
- **Composition:** Duo Confrontation template (upper 65%); large gold title lower 35%; tagline text top and bottom in small spaced serif
- **Typography note:** Title is the most visually prominent element after characters. Two-line title common: first line smaller, second line very large.

### 历史/军事
- **Render style:** Cinematic historical epic photography. Textured, weighty, grand scale.
- **Colors:** Iron grey + deep red + earth yellow; amber fire glow accent
- **Characters:** General in battle-worn armor, sword or spear, commanding posture. Army or battlefield context.
- **Background:** Battlefield panorama, fortress walls at dusk, beacon fire towers, war smoke
- **Lighting:** `dramatic sunset over battlefield, beacon fire glow, smoke-filled sky, armor glinting in dying light`
- **Composition:** Lone Hero (general facing battlefield) or Duo Confrontation (rivals)

### 灵异/恐怖
- **Render style:** Dark atmospheric photography with supernatural compositing.
- **Colors:** Ink black + sickly green + dark red; faded paper yellow accent
- **Characters:** Ordinary person (fearful) contrasted with supernatural presence (ghost, demon). Taoist in yellow ritual robes optional.
- **Background:** Night cemetery, crumbling ancient temple, dark alley with paper lanterns, coffin-lined passage
- **Lighting:** `eerie green ghost glow, flickering yellow candlelight, cold moonlight, shadows swallowing periphery`
- **Composition:** Lone figure at center, supernatural threat looming from darkness behind

### 轻小说/二次元
- **Render style:** High-quality anime illustration style — bright, clean linework, expressive faces.
- **Colors:** Bright multi-color; star / petal / sparkle accents; pastel or vivid depending on tone
- **Characters:** Moe/cute protagonist; cat ears, wings, fantasy school uniform, chibi options
- **Background:** Fantasy isekai world, sparkling academy, starry night sky
- **Lighting:** `magical particle sparkles, soft luminous backlighting, vivid colored light`
- **Composition:** Character facing forward, friendly expression, colorful background

---

## Prompt Quality Checklist

Before sending a prompt to the image API, verify:
- [ ] Render style keyword included (`photorealistic`, `hyperrealistic 3D render`, `cinematic`)
- [ ] Color palette specified
- [ ] Lighting description included
- [ ] Composition template selected and described
- [ ] Title text placement described (lower 35–40% for fantasy/sci-fi; overlay for drama)
- [ ] `portrait orientation, 2:3 ratio, 1024x1536` specified
- [ ] `professional book cover, ultra-detailed, no watermark` included
- [ ] `keep text inside central safe area (inner 85%)` included
