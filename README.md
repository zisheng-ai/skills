# Skills

个人 AI 技能仓库，沉淀可复用的 Claude Code / Codex / Cursor 等编辑器技能（Skills）。

## 可用技能

| 技能 | 目录 | 触发词 | 说明 |
| --- | --- | --- | --- |
| AdSense Site Builder | [`skills/adsense-site-builder`](./skills/adsense-site-builder) | `adsense-site-builder` | 从 niche 验证到上线的 AdSense 站点构建与审计 |

## 安装方式

### 方式一：npx skills（推荐）

使用 Vercel 的 [`skills`](https://github.com/vercel-labs/agent-skills) CLI 直接从 GitHub 仓库安装。

```bash
# 列出本仓库所有可用技能
npx skills add zisheng-ai/skills --list

# 安装指定技能到当前项目
npx skills add zisheng-ai/skills --skill adsense-site-builder

# 安装到 Claude Code 全局
npx skills add zisheng-ai/skills --skill adsense-site-builder --agent claude-code --global

# 安装到 Codex 全局
npx skills add zisheng-ai/skills --skill adsense-site-builder --agent codex --global
```

> 将 `zisheng-ai` 替换为你的 GitHub 用户名。技能目录必须位于仓库根目录的 `skills/` 下。

### 方式二：Claude Code

Claude Code 默认从 `~/.claude/skills/` 加载技能。

```bash
# 安装
mkdir -p ~/.claude/skills
cp -R skills/adsense-site-builder ~/.claude/skills/adsense-site-builder

# 更新（直接覆盖）
rm -rf ~/.claude/skills/adsense-site-builder
cp -R skills/adsense-site-builder ~/.claude/skills/adsense-site-builder
```

安装后，在 Claude Code 中输入 `/adsense-site-builder` 或在 prompt 中写 `Use adsense-site-builder to ...` 即可触发。

### 方式三：Codex

Codex 默认从 `~/.codex/skills/` 加载技能。

```bash
# 安装
mkdir -p ~/.codex/skills
cp -R skills/adsense-site-builder ~/.codex/skills/adsense-site-builder

# 更新
rm -rf ~/.codex/skills/adsense-site-builder
cp -R skills/adsense-site-builder ~/.codex/skills/adsense-site-builder
```

### 方式四：Cursor / 其他编辑器

Cursor 目前不原生支持 `SKILL.md` 技能系统。可通过以下方式使用：

1. 将技能目录复制到项目工作区，例如 `.cursor/rules/`。
2. 把 `SKILL.md` 的内容作为 system prompt / custom instruction 粘贴到编辑器设置中。
3. 在对话开始时引用 `SKILL.md` 文件。

```bash
mkdir -p .cursor/rules
cp skills/adsense-site-builder/SKILL.md .cursor/rules/adsense-site-builder.md
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

更多 prompt 模板请查看 [`skills/adsense-site-builder/README.md`](./skills/adsense-site-builder/README.md)。

## 开发新技能

1. 在 `skills/` 目录创建新目录，例如 `skills/my-skill/`。
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
  template/              # 新技能模板
  skills/
    adsense-site-builder/
      SKILL.md           # 技能入口，含 frontmatter
      README.md          # 使用说明与 prompt 模板
      references/        # 阶段性子模块
      agents/            # 可选：Agent 配置
      outputs/           # 运行时输出（gitignored）
```

## License

MIT
