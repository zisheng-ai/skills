# Design System Planning

This reference adapts the useful parts of frontend-design thinking for novel reading products. Use it before building any new UI or major redesign.

## Design Plan

Before coding, decide the following privately or in a short plan when useful:

- Purpose: what reading job does this screen solve?
- Audience: casual web novel reader, paid subscriber, serialized fiction fan, literary reader, language-specific audience, etc.
- Tone: choose one clear direction, such as refined editorial, quiet literary, premium serialized fiction, modern manga/light-novel adjacent, or warm personal library.
- Palette: define 4-6 named colors with roles, not just "nice colors".
- Type system: define display, reader body, and utility text roles.
- Layout concept: explain how discovery, book detail, and reader layouts differ across H5 and desktop.
- Signature element: choose one memorable element that belongs to the story/reading world.

## Signature Element Rules

Spend distinctiveness in one place. Examples:

- A refined chapter progress rail inspired by a bookmark ribbon.
- Book cover cards with subtle spine treatment.
- A reader settings sheet that feels like a reading lamp control.
- Genre-specific cover accent systems.
- A desktop reader with a calm side catalog and paper-like reading column.

Do not combine many decorative ideas. If the signature element does not improve recognition, orientation, or reading mood, remove it.

## Palette Guidance

Novel H5 defaults should be calm:

- Base: warm off-white, paper, or soft neutral.
- Ink: near-black but not pure black.
- Muted: readable gray/green/blue neutral.
- Accent: one restrained genre-aware color.
- Night: deep neutral background with softened body text.

Avoid generic AI-design defaults unless the brief specifically asks for them:

- Cream + terracotta + giant serif as a universal answer.
- Near-black + neon green/vermilion as a universal answer.
- Dense newspaper layout as a universal answer.

## Typography Guidance

Reading body typography matters more than display typography.

- Use characterful display type sparingly for logos, book titles, or section headers.
- Use highly readable serif or system CJK font stacks for prose.
- Use system sans for controls and metadata.
- Never use decorative display fonts for chapter body.
- Avoid negative letter spacing.

## Copy As Design

Interface copy should be plain and reader-side:

- Use "Continue reading", not "Submit".
- Use "Chapter list", not "Content management".
- Use "Added to shelf", not "Operation successful".
- Use "No books yet. Add a title to start reading.", not vague empty states.

Never mention implementation details like Markdown, parser, AI, prompt, skill, or generation in the reader-facing UI.

## Self-Critique Before Build

Before implementation, check:

- Would this design still appear if the product were a finance dashboard or SaaS landing page? If yes, revise.
- Is the signature element connected to reading, books, chapters, or genre? If not, revise.
- Is anything competing with comfortable prose reading? If yes, remove it.
- Does desktop have its own layout logic rather than a stretched phone UI? If not, revise.

## After Build Critique

After screenshots:

- Remove one decorative accessory.
- Increase body text comfort before adjusting cards.
- Check whether the first screen presents a usable reading product, not brand theater.
- Confirm the reader page is calmer than the discovery pages.
