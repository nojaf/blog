# AGENTS.md

`bun run build` re-resolves dependencies, because `bun.lock` and `package.json` disagree about the
Astro version, and has been seen to bump Astro and `@astrojs/mdx` a major. Check `git status`
after building.

Cover images are 1920×700.

A post has to be `.mdx` to use a component. Converting one from `.md` is only safe when nothing
outside its code fences contains `<` or `{`, because MDX reads both as syntax.

`LlmDisclaimer` marks a post an LLM drafted. Give it a slot rather than taking the default, which
says every command in the post is real output and is a lie on a post with no commands.

## Terminal recordings with VHS

Needs `vhs` and `ttyd` (`mise use -g vhs ttyd`). The `.tape` files are not kept in the repo.

**Size the terminal to the output.** Unused columns are width the text does not get: a 1500px
terminal showing 61 columns of output renders each character about 5px wide once it is scaled into
the 704px reading column. So measure the real output first, through `script` to keep a TTY:

```bash
script -qec "the command" /dev/null | sed 's/\r$//;s/\x1b\[[0-9;]*m//g'
```

Count its longest line and its lines, add one row each for the prompt and the trailing prompt, then
for Adwaita Mono (cell width ≈ 0.628 × font size, line height ≈ 1.32 × font size):

```
Width    = 2 × display width      # 1408 for the reading column, 2400 for the container
FontSize = (Width - 2×Padding) / (cols × 0.628)
Height   = rows × 1.32 × FontSize + 2×Padding
```

Doubling the display width lands the image at `scale: 0.5`, so it renders at retina density. A
before/after pair should use the wider one's column count for both, so the two are comparable.

`Set FontFamily "Adwaita Mono"`. JetBrains Mono, including its Nerd Font build, draws U+2714 wide
enough to swallow the space after it, so `✔ src/A.fs` comes out as `✔src/A.fs`.

Tape quirks: `Output` needs a quoted path; pass command text to `Type` in backticks so tape
escaping does not fight the heredoc writing it; end the `Hide` block with `clear`, and know that a
setup line which breaks `PATH` makes `clear` fail and leaks the setup into the recording.

Use `Screenshot "/abs/path.png"` for long static output. The 54-row `fantomas doctor` report is a
PNG for that reason.

**Animated GIFs must live in `public/` and be referenced by absolute URL.** Astro's image pipeline
converts them to webp and truncates the animation; a 142-frame recording came out as 24 frames
ending on an empty prompt. PNGs have no animation to lose and belong in the post folder, going
through `<Image>` as usual.

Output past about 90 columns is unreadable at 704px. Wrap those in `<div class="wide">`, which
`src/pages/[...slug].astro` fills to the container and scrolls below 900px. Check on a phone
viewport that the wrapper scrolls and the document does not.
