const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 2) {
    return [1, 2, 3, "..."];
  }
  if (currentPage >= totalPages - 1) {
    return ["...", totalPages - 2, totalPages - 1, totalPages];
  }
  return ["...", currentPage - 1, currentPage, currentPage + 1, "..."];
};

const generateFormatNotes = (notes: string | null) => {
  // narrow
  if (notes == null) return "";

  // BBCode to HTML conversion. https://vndb.org/d9#4
  const formattedNotes = notes
    .replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>") // bold
    .replace(/\[i\](.*?)\[\/i\]/g, "<em>$1</em>") // italic
    .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>") // Underlined
    .replace(/\[s\](.*?)\[\/s\]/g, "<del>$1</del>") // strike through text
    .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, function (match, url, text) {
      // Relative to absolute url conversion
      if (url.startsWith("/")) {
        url = "https://vndb.org" + url;
      }
      return `<a href="${url}">${text}</a>`;
    }) // link
    .replace(
      /\[spoiler\](.*?)\[\/spoiler\]/g,
      '<span class="spoiler">$1</span>'
    ) // spoiler
    .replace(/\[quote\](.*?)\[\/quote\]/g, "<blockquote>$1</blockquote>") // quote
    .replace(/\[code\](.*?)\[\/code\]/g, "<pre><code>$1</code></pre>") // code block
    .replace(/\[raw\](.*?)\[\/raw\]/g, "$1") // remove tag
    .replace(
      /(\s)([cdprsuv]\d+(?:\.\d+)?)/g,
      `$1<a href="https://vndb.org/$2">$2</a>`
    ) // VNDBID
    .replace(/(\s)(https?:\/\/.+?)(\s|$)/g, `$1<a href="$2">link</a>$3`) // reduce link length
    .replace(/\n/g, "<br>"); // line feed

  return `<blockquote>${formattedNotes}</blockquote>`;
};

const toggleTheme = () => {
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

export { generatePagination, generateFormatNotes, toggleTheme };
