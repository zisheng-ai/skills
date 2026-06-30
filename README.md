# Skills

个人 AI 技能仓库，沉淀可复用的 Claude Code / Codex / Cursor 等编辑器技能（Skills）。

## 可用技能

| 技能 | 目录 | 触发词 | 说明 |
| --- | --- | --- | --- |
| AdSense Site Builder | [`adsense-site-builder`](./adsense-site-builder) | `adsense-site-builder` | 从 niche 验证到上线的 AdSense 站点构建与审计 |
| Fiction H5 Builder | [`fiction-site-builder`](./fiction-site-builder) | `fiction-site-builder` | 构建移动优先的小说阅读 H5 站点，支持多语言、多页面模板与 oh-story 数据接入 |

## 安装方式

### 方式一：npx skills（推荐）

使用 Vercel 的 [`skills`](https://github.com/vercel-labs/agent-skills) CLI 直接从 GitHub 仓库安装。

```bash
# 列出本仓库所有可用技能
npx skills add zisheng-ai/skills --list

# 安装指定技能到当前项目
npx skills add zisheng-ai/skills --skill adsense-site-builder
npx skills add zisheng-ai/skills --skill fiction-site-builder

# 安装到 Claude Code 全局
npx skills add zisheng-ai/skills --skill adsense-site-builder --agent claude-code --global
npx skills add zisheng-ai/skills --skill fiction-site-builder --agent claude-code --global

# 安装到 Codex 全局
npx skills add zisheng-ai/skills --skill adsense-site-builder --agent codex --global
npx skills add zisheng-ai/skills --skill fiction-site-builder --agent codex --global
```

> 将 `zisheng-ai` 替换为你的 GitHub 用户名。技能目录位于仓库根目录下，`npx skills` 会优先发现根目录的技能。

### 方式二：Claude Code

Claude Code 默认从 `~/.claude/skills/` 加载技能。

```bash
# 安装
mkdir -p ~/.claude/skills
cp -R adsense-site-builder ~/.claude/skills/adsense-site-builder
cp -R fiction-site-builder ~/.claude/skills/fiction-site-builder

# 更新（直接覆盖）
rm -rf ~/.claude/skills/adsense-site-builder
cp -R adsense-site-builder ~/.claude/skills/adsense-site-builder
rm -rf ~/.claude/skills/fiction-site-builder
cp -R fiction-site-builder ~/.claude/skills/fiction-site-builder
```

安装后，在 Claude Code 中输入 `/adsense-site-builder` 或在 prompt 中写 `Use adsense-site-builder to ...` 即可触发。

### 方式三：Codex

Codex 默认从 `~/.codex/skills/` 加载技能。

```bash
# 安装
mkdir -p ~/.codex/skills
cp -R adsense-site-builder ~/.codex/skills/adsense-site-builder
cp -R fiction-site-builder ~/.codex/skills/fiction-site-builder

# 更新
rm -rf ~/.codex/skills/adsense-site-builder
cp -R adsense-site-builder ~/.codex/skills/adsense-site-builder
rm -rf ~/.codex/skills/fiction-site-builder
cp -R fiction-site-builder ~/.codex/skills/fiction-site-builder
```

### 方式四：Cursor / 其他编辑器

Cursor 目前不原生支持 `SKILL.md` 技能系统。可通过以下方式使用：

1. 将技能目录复制到项目工作区，例如 `.cursor/rules/`。
2. 把 `SKILL.md` 的内容作为 system prompt / custom instruction 粘贴到编辑器设置中。
3. 在对话开始时引用 `SKILL.md` 文件。

```bash
mkdir -p .cursor/rules
cp adsense-site-builder/SKILL.md .cursor/rules/adsense-site-builder.md
```

## 更新方式

| 安装方式 | 更新命令 |
| --- | --- |
| `npx skills` | 重新执行 `npx skills add ...` 覆盖安装 |
| Claude Code 手动 | 重新执行 `cp -R` 覆盖 `~/.claude/skills/<skill>` |
| Codex 手动 | 重新执行 `cp -R` 覆盖 `~/.codex/skills/<skill>` |

## 技能使用说明

### 通用触发方式

在支持技能的 AI 编辑器中，直接使用技能名作为 prompt 开头：

```txt
Use adsense-site-builder to build an AdSense-ready niche website.
```

或在 Claude Code / Codex 中使用 slash command：

```txt
/adsense-site-builder
```

### AdSense Site Builder 示例

```txt
Use adsense-site-builder to build 3 English AdSense-ready niche websites.

Market:
- Language: English
- Target country: United States

Requirements:
- Validate niches before building.
- Build one primary useful experience per site.
- Add About, Contact, Privacy Policy, Terms.
- Run AdSense readiness audits.
- Create safe launch plans.
```

更多 prompt 模板请查看 [`adsense-site-builder/README.md`](./adsense-site-builder/README.md)。

### Fiction H5 Builder 示例

```txt
Use fiction-site-builder to build a polished English web novel H5 template from oh-story Markdown.
```

```txt
Use fiction-site-builder to build a Japanese light novel mobile reader with a work list, detail page, and vertical-layout option.
```

```txt
Use fiction-site-builder to review this Spanish novela H5 for reading comfort and desktop responsiveness.
```

## 开发新技能

1. 在根目录创建新目录，例如 `my-skill/`。
2. 编写 `SKILL.md`，首行必须为 frontmatter：

```yaml
---
name: my-skill
description: one-line description of what this skill does and when to use it.
---
```
3. 补充 `README.md` 说明使用场景和 prompt 模板。

## 目录结构

```txt
.
  README.md              # 本文件
  adsense-site-builder/
    SKILL.md             # 技能入口，含 frontmatter
    README.md            # 使用说明与 prompt 模板
    references/          # 阶段性子模块
    agents/              # 可选：Agent 配置
    outputs/             # 运行时输出（gitignored）
  fiction-site-builder/
    SKILL.md             # 技能入口，含 frontmatter
    references/          # 子模块：设计、UX、国际化、QA 等
    agents/              # 可选：Agent 配置
    assets/              # 静态资源说明
    scripts/             # 辅助脚本（如 parse-oh-story-claudecode.mjs）
  image-gen/
    SKILL.md             # 技能入口，含 frontmatter
```

## License

MIT
