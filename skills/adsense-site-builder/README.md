# AdSense Site Builder

AdSense Site Builder 是一个单一入口技能，围绕两个核心目标构建：**网站能快速通过 AdSense 首次审核**，以及**持续获得自然搜索流量**。

这两个目标驱动相同的构建标准：真实的交互功能、原创的内容深度、正确的技术 SEO、完整的信任页面（Privacy Policy 必须声明 Google AdSense 及 Cookie）。为真实用户而建，两个目标自然实现。

适合希望创建具有真实搜索需求和用户价值的利基网站资产的构建者，而不是做低质量 AI 文章站或依赖风险流量策略。

## 可构建的网站类型

该技能可帮助构建以下几类面向 AdSense 的利基网站：

| 网站类型 | 适用场景 | 示例 |
| --- | --- | --- |
| 工具站 | 计算器、生成器、转换器、检测器 | 工资计算器、JSON 格式化工具、提示词生成器 |
| 模板库 | 可复制或可下载的复用资产 | 简历模板、邮件模板、Notion 模板 |
| 目录站 | 带筛选和对比字段的精选列表 | AI 工具目录、SaaS 替代品、资源列表 |
| 对比中心 | 决策支持和产品/方案对比 | X vs Y、最佳替代品、某场景最佳工具 |
| 清单中心 | 带步骤和时间线的流程类主题 | 签证清单、搬家清单、创业上线清单 |
| 教程中心 | 逐步解决问题 | 编程错误、Excel 公式、软件工作流 |
| 混合站 | 包含多种搜索意图的利基 | 一个核心工具 + 指南、模板和对比 |

## 工作原理

该技能按阶段运行站点构建流程：

1. **验证利基**：从 Reddit、Google 自动补全、AnswerThePublic、Product Hunt 等渠道挖掘候选，核实三项需求信号（自动补全确认 + 现有结果有参与度 + ≥10 个支撑页面角度），通过 AdSense 政策安全评估（禁止类目、高风险类目、广告主需求层级、流量质量风险）逐一过滤。
2. **规划关键词和 SEO 基础**：长尾优先（新站 KD ≤ 30），为每个页面定义 title tag、meta description、schema 类型，输出含内链图谱的 site-map.json。
3. **设计页面模型**：读取 brief → Design Read → token system → 设计锚点与三档拨号 → 反 AI 默认纪律 → 定义不单薄的页面模板。
4. **构建站点**：实现所有页面和交互功能；同时生成 sitemap.xml、robots.txt、canonical、schema markup、内链图谱、广告位占位结构，并将 AdSense auto-ads 脚本嵌入 `<head>`。完成 Core Web Vitals（LCP < 2.5s、CLS < 0.1）。
5. **信任页面**：创建 About、Contact、Privacy Policy（必须声明 Google AdSense 及 Cookie）、Terms。
6. **制定发布计划（上线前完成）**：Product Hunt、目录提交、精准社区参与（先贡献再分享）、YouTube Shorts 演示、Pinterest（模板类）；14 天逐日行动计划。**必须在上线前制定好**，这样上线第一天即可执行，前 2–4 周的流量期得到充分利用。
7. **上线 + GSC 设置**：部署至生产环境，执行发布计划第 1 天的行动，注册 GSC，提交 sitemap，请求首批页面索引。
8. **AdSense 准备度审计（上线 2–4 周后）**：GSC 已有索引和曝光量后运行。逐项核查内容质量、信任页面完整性、技术要求、政策合规和流量质量，输出带明确提交建议的审计报告。
9. **GSC 增长闭环（审核通过后每月）**：从 GSC 数据中找 3 类机会——排名 8–20 位的快赢页面、高曝光低点击率的 title 问题、实际查询揭示的内容缺口，逐一改进并记录效果。

主工作流在 `SKILL.md` 中。各阶段子模块在 `references/` 中。

```txt
adsense-site-builder/
  SKILL.md
  README.md
  agents/
    openai.yaml
  references/
    niche-opportunity-researcher.md      ← 阶段 1
    keyword-cluster-planner.md           ← 阶段 2
    programmatic-seo-architect.md        ← 阶段 3
    useful-site-builder.md               ← 阶段 4
    eeat-site-builder.md                 ← 阶段 5
    distribution-launcher.md             ← 阶段 6（上线前制定）
    adsense-readiness-auditor.md         ← 阶段 8（上线 2–4 周后）
    gsc-growth-loop.md                   ← 阶段 9（审核通过后每月）
```

## 安装

使用 Vercel 的 `skills` CLI 安装：

```bash
npx skills add zisheng-ai/skills --skill adsense-site-builder
```

或手动复制到本地 skills 目录：

```bash
# Claude Code
mkdir -p ~/.claude/skills
cp -R skills/adsense-site-builder ~/.claude/skills/adsense-site-builder

# Codex
mkdir -p ~/.codex/skills
cp -R skills/adsense-site-builder ~/.codex/skills/adsense-site-builder
```

安装后，在新会话中让 agent 使用 `adsense-site-builder` 即可。

## 通用 Prompt 模板

```txt
Use adsense-site-builder to build an AdSense-ready niche website.

Goal:
- Create a useful website with real search demand and real user value.

Market:
- Language: English
- Target country: United States

Requirements:
- Validate the niche before building.
- Choose the best site type for the niche.
- Build the site with a clear homepage, one primary useful experience, and at least 10 supporting pages.
- Add About, Contact, Privacy Policy, Terms, and author/editorial information where appropriate.
- Generate SEO metadata, sitemap, robots.txt, and internal links.
- Run an AdSense readiness audit.
- Create a safe initial traffic plan.

Constraints:
- Do not create a thin AI article site.
- Do not use copied, spun, or keyword-stuffed content.
- Do not recommend traffic packages, traffic exchanges, bots, incentivized clicks, or any invalid traffic tactic.
```

## 批量建站 Prompt

```txt
Use adsense-site-builder to generate 3 AdSense-ready niche websites.

Market:
- Language: English
- Target country: United States

Process:
1. Generate at least 12 niche candidates.
2. Score them by search intent, utility potential, content depth, competition gap, AdSense safety, and build effort.
3. Select the best 3.
4. For each selected niche, choose the best site pattern: tool site, template library, directory, comparison hub, checklist hub, tutorial hub, or hybrid.
5. Build each site with one primary useful experience and at least 10 supporting pages.
6. Add trust pages.
7. Run technical SEO and AdSense readiness audits.
8. Create a 14-day safe launch plan for each site.

Output:
- Create one folder per site.
- Keep planning and audit files under outputs/<site-slug>/.
- Do not skip the readiness audit.
```

## 工具站 Prompt

```txt
Use adsense-site-builder to build a tool site.

Site type:
- Tool site

Niche:
- [describe the niche, for example: freelance hourly rate calculator]

Requirements:
- Validate search demand and user intent first.
- Build one working interactive tool with clear inputs, useful defaults, result output, examples, and edge-case handling.
- Explain the formula, assumptions, or generation logic.
- Create at least 10 supporting pages covering examples, use cases, common mistakes, comparisons, FAQs, and related calculations.
- Add About, Contact, Privacy Policy, Terms, and disclaimer text if needed.
- Generate SEO metadata, sitemap, robots.txt, and internal links.
- Run the AdSense readiness audit.
- Generate a safe launch plan.

Quality bar:
- The site must still be useful with ads disabled.
- Do not create pages that only exist to target keywords.
```

## 模板库 Prompt

```txt
Use adsense-site-builder to build a template library site.

Site type:
- Template library

Niche:
- [describe the niche, for example: job application email templates]

Requirements:
- Validate the niche and identify high-intent template searches.
- Create a homepage, category pages, and individual template pages.
- Each template page must include preview, copyable template text, use case, customization notes, common mistakes, and related templates.
- Create at least 10 supporting pages explaining workflows, examples, and selection guidance.
- Add trust pages and clear ownership/contact information.
- Add SEO metadata, internal links, sitemap, and robots.txt.
- Run an AdSense readiness audit and create a safe launch plan.

Constraints:
- Do not generate generic filler templates.
- Do not claim legal, medical, financial, or professional authority unless verified.
```

## 目录站 Prompt

```txt
Use adsense-site-builder to build a curated directory site.

Site type:
- Directory site

Niche:
- [describe the niche, for example: free AI tools for teachers]

Requirements:
- Validate search demand and directory usefulness.
- Define clear inclusion criteria.
- Create directory listing pages with filters or sortable fields.
- Create item detail pages with consistent fields, use cases, pros, cons, pricing notes, and source links where appropriate.
- Create at least 10 supporting pages such as best-for guides, comparison pages, category explainers, and FAQs.
- Add About, Contact, Privacy Policy, Terms, and editorial criteria.
- Run SEO and AdSense readiness audits.
- Create a safe launch plan.

Constraints:
- Do not invent fake listings.
- Do not scrape or copy product descriptions.
- Clearly mark unknown or unverified information.
```

## 对比中心 Prompt

```txt
Use adsense-site-builder to build a comparison hub.

Site type:
- Comparison hub

Niche:
- [describe the niche, for example: Notion vs Obsidian alternatives for students]

Requirements:
- Validate search demand around alternatives, comparisons, and best-for queries.
- Define fair comparison criteria.
- Create a homepage, comparison pages, alternative pages, and best-for pages.
- Each comparison page must include criteria, table, pros, cons, best-for recommendation, caveats, and related internal links.
- Create at least 10 supporting pages.
- Add trust pages and editorial methodology.
- Run SEO and AdSense readiness audits.
- Create a safe launch plan.

Constraints:
- Do not claim hands-on testing unless evidence is provided.
- Do not write fake reviews.
- Avoid affiliate-style over-optimization unless the user explicitly asks for affiliate monetization.
```

## 清单中心 Prompt

```txt
Use adsense-site-builder to build a checklist hub.

Site type:
- Checklist hub

Niche:
- [describe the niche, for example: study abroad application checklist]

Requirements:
- Validate search demand and user scenarios.
- Create checklists organized by phase, deadline, user type, or situation.
- Each checklist page must include action items, timeline, required documents or inputs, common mistakes, and printable or copyable format.
- Create at least 10 supporting pages with guides, examples, FAQs, and edge cases.
- Add trust pages and disclaimers where official verification is needed.
- Run SEO and AdSense readiness audits.
- Create a safe launch plan.

Constraints:
- Do not present unofficial information as official.
- Mark items that users should verify with official sources.
```

## 教程中心 Prompt

```txt
Use adsense-site-builder to build a tutorial hub.

Site type:
- Tutorial hub

Niche:
- [describe the niche, for example: Excel formula troubleshooting]

Requirements:
- Validate search demand around errors, how-to queries, and examples.
- Create a homepage, tutorial categories, and step-by-step tutorial pages.
- Each tutorial must include prerequisites, steps, expected result, examples, troubleshooting, common errors, and related guides.
- Create at least 10 supporting pages.
- Add trust pages and clear editorial information.
- Add SEO metadata, internal links, sitemap, and robots.txt.
- Run an AdSense readiness audit and safe launch plan.

Constraints:
- Do not create vague tutorials.
- Every tutorial must solve a concrete user problem.
```

## 混合站 Prompt

```txt
Use adsense-site-builder to build a hybrid niche site.

Site type:
- Hybrid site

Niche:
- [describe the niche, for example: moving cost planning]

Primary experience:
- [tool, template library, directory, comparison hub, checklist hub, or tutorial hub]

Requirements:
- Validate the niche and identify multiple search intents.
- Build one primary useful experience.
- Add supporting pages across guides, templates, comparisons, checklists, FAQs, and examples where relevant.
- Create at least 10 supporting pages with distinct search intent.
- Add trust pages.
- Run SEO and AdSense readiness audits.
- Create a safe launch plan.

Quality bar:
- The site must feel like one coherent product, not a random collection of articles.
```

## 现有站点审计 Prompt

```txt
Use adsense-site-builder to audit an existing website for AdSense readiness.

Website/project:
- [URL or local project path]

Audit:
- Check site utility, content depth, originality, navigation, trust pages, mobile usability, technical SEO, indexability, AdSense risk, and traffic quality risk.
- Identify blocking issues before AdSense submission.
- Recommend concrete fixes.
- Create an updated safe launch plan.

Output:
- Write outputs/<site-slug>/adsense-readiness-report.md.
- Use a conservative verdict: ready, needs revision, or not ready.
```

## 安全流量计划 Prompt

```txt
Use adsense-site-builder to create a safe initial traffic plan for this niche website.

Site:
- [site name or path]

Requirements:
- Recommend only real user acquisition channels.
- Include organic search, community answers, directories, creator outreach, short educational videos, Pinterest if relevant, and small legitimate paid tests only if appropriate.
- Create a 14-day launch plan.
- Define metrics to watch: organic queries, returning users, tool completions, saves, comments, backlinks, and natural shares.

Do not recommend:
- Traffic packages
- Bot visits
- Autosurf or traffic exchange networks
- Incentivized clicks
- Popunder traffic for AdSense approval
- Any tactic intended to inflate ad impressions or clicks
```

## 注意事项

该技能不保证 AdSense 一定能通过。它的目标是提升站点质量、降低低价值内容风险、避免不安全的流量策略。

发布前请务必人工审核生成内容、法律页面、事实性声明以及政策敏感主题。
