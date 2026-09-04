# AGENTS.md

`bun run build` re-resolves dependencies, because `bun.lock` and `package.json` disagree about the
Astro version, and has been seen to bump Astro and `@astrojs/mdx` a major. Check `git status`
after building.

Cover images are 1920×700.

A post has to be `.mdx` to use a component. Converting one from `.md` is only safe when nothing
outside its code fences contains `<` or `{`, because MDX reads both as syntax.

`LlmDisclaimer` marks a post an LLM drafted. Give it a slot rather than taking the default, which
says every command in the post is real output and is a lie on a post with no commands.

Terminal output belongs in a recording rather than a code block, so it keeps the colour and glyphs
a program only emits to a real TTY. This works well and is worth reaching for. See
[docs/terminal-recordings.md](docs/terminal-recordings.md).
