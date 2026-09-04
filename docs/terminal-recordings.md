# Terminal recordings

Terminal output pasted into a code block loses the colour and the Unicode glyphs a program only
emits to a real TTY, and reads as dead text. [VHS](https://github.com/charmbracelet/vhs) runs the
command in a real terminal and records it, so what ends up in a post is what the tool actually
printed. The Fantomas 8 post uses five of these.

Nothing is kept in the repo, so this is what you need to do it again.

```bash
mise use -g vhs ttyd     # ttyd is the headless terminal vhs drives
vhs format-v8.tape
```

## A whole tape

A `.tape` is VHS's script: the terminal's size and font, the keystrokes to type, and where to write
the result. This one made the "Fantomas 8 formatting a folder" GIF.

```
Output "public/blog/fantomas-doctor-doctor-please/format-v8.gif"
Set Shell bash
Set FontFamily "Adwaita Mono"
Set FontSize 35
Set Width 1408
Set Height 263
Set Padding 16
Set Theme "Catppuccin Mocha"
Set TypingSpeed 40ms
Hide
Type `rm -rf /tmp/demo && cp -r fixtures/plain /tmp/demo && cd /tmp/demo` Enter
Type `export PATH="$OLDPWD/bin/v8:$PATH"` Enter
Type `export PS1="\[\e[38;5;213m\]demo\[\e[0m\] $ "` Enter
Type `clear` Enter
Show
Sleep 700ms
Type `fantomas src` Sleep 600ms Enter
Sleep 4s
```

Everything between `Hide` and `Show` really runs but is not recorded, so the setup goes there: copy
a throwaway fixture, put the binary under test on `PATH` as a plain name, and set a clean prompt
instead of your own. For a before/after pair, point two otherwise identical tapes at two different
binaries through wrapper scripts.

## Size the terminal to the output

This is the whole trick, and getting it wrong is what makes a recording look bad. A capture is
displayed at 704px (the reading column) or 1200px (the container), so every unused terminal column
is width the text does not get. A 1500px terminal showing 61 columns renders each character about
5px wide once scaled down, and is unreadable.

Measure the real output first, through `script` to keep a TTY:

```bash
script -qec "the command" /dev/null | sed 's/\r$//;s/\x1b\[[0-9;]*m//g'
```

Count its longest line and its lines, add a row each for the prompt and the trailing prompt, then
for Adwaita Mono (cell width ≈ 0.628 × font size, line height ≈ 1.32 × font size):

```
Width    = 2 × display width      # 1408 for the reading column, 2400 for the container
FontSize = (Width - 2×Padding) / (cols × 0.628)
Height   = rows × 1.32 × FontSize + 2×Padding
```

Doubling the display width lands the image at `scale: 0.5`, so it renders at retina density. A
before/after pair should use the wider one's column count for both, so the two come out the same
size: the Fantomas 7 run needs 61 columns and the Fantomas 8 run only 34, and both were cut for 61.

## Font

`Set FontFamily "Adwaita Mono"`. JetBrains Mono, including its Nerd Font build, draws U+2714 wide
enough to swallow the space after it, so `✔ src/A.fs` comes out as `✔src/A.fs`. The bytes are fine,
it is purely the font.

## Tape quirks

- `Output` needs a quoted path. An unquoted one fails to parse.
- Pass command text to `Type` in backticks, so tape escaping does not fight whatever writes the tape.
- End the `Hide` block with `clear`. If a setup line breaks `PATH`, `clear` fails, the screen is
  never wiped, and the setup shows up in the recording.

## GIF or still

Animation earns its place for short output where the typing reads as a demo. For a long static
report it adds nothing and costs megabytes, so use `Screenshot "path.png"` instead. The 54-row
`fantomas doctor` report is a still for that reason. VHS wants an `Output` either way, so such a
tape writes a throwaway GIF beside the screenshot.

## Where the artefact goes

**Animated GIFs must live in `public/` and be referenced by absolute URL.** Astro's image pipeline
converts them to webp and truncates the animation: a 142-frame recording came out as 24 frames
ending on an empty prompt.

```md
![alt](/blog/<slug>/format-v8.gif)
```

Stills have no animation to lose, so they belong in the post folder and go through `<Image>` as
usual. The 1.6MB `doctor.png` ships as a 330KB webp.

## Captures wider than the reading column

Output past about 90 columns cannot be read at 704px. Wrap those in `<div class="wide">`, which
`src/pages/[...slug].astro` fills to the container and scrolls below 900px, the way a wide code
block behaves. Check on a phone viewport that the wrapper scrolls and the document does not.
