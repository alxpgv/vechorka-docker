export const parseContent = (body: string) => {
  let content = updateBlockquote(body);
  const contentLines = content?.split("\r\n");

  let parsed = "";
  let regexTags = /<.+>.+<\/.+>|<.+\/>/gm;
  for (const line in contentLines) {
    let currentLine = contentLines[Number(line)];
    if (currentLine && !currentLine.match(regexTags)) {
      currentLine = `<p>${currentLine}</p>`;
    }
    parsed += currentLine;
  }

  return parsed;
};

const updateBlockquote = (content: string) => {
  return content?.replace(
    /<blockquote>(.*)<\/blockquote>/g,
    `<blockquote><svg viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
    </svg>$1</blockquote>`
  );
};
