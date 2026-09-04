// The opening of a post, for the meta description and social cards when the
// frontmatter carries none of its own.
//
// It reads the raw source, which is what a content entry hands us before
// rendering, so it has to pick the prose out from among the markup. It does
// that by rejecting whole blocks rather than by stripping tags: a post can
// open with an embedded tweet or an <LlmDisclaimer>, and pulling the tags off
// those leaves their text behind looking like the first paragraph.
export function excerpt(body: string, limit = 160): string {
  const withoutCode = body
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, "") // frontmatter, if still attached
    .replace(/```[\s\S]*?```/g, "");

  const block = withoutCode
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.trim())
    .find(
      (b) =>
        b.length > 0 &&
        // A block opening with a tag is markup: an embedded tweet, an iframe,
        // an <LlmDisclaimer>. A tag in the middle of one is not, it is a <br>
        // inside a real paragraph, and plain() takes it out below.
        !/^(<|#|>|\||import\s|!\[)/.test(b) &&
        plain(b).length > 40,
    );

  if (!block) return "";

  const text = plain(block);
  if (text.length <= limit) return text;
  // Cut on a word boundary so the ellipsis does not land mid-word.
  const cut = text.slice(0, limit);
  return cut.slice(0, cut.lastIndexOf(" ")).trimEnd() + "…";
}

function plain(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links keep their text
    .replace(/<[^>]+>/g, " ") // inline tags such as <br />
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
