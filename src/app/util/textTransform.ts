export const toHtml = (text: string) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

export const tagText = (text: string) => {
  // Replace ``` with <pre> or </pre>
  let taggedText = text.split(/```/).map((partToHtml: string, i: number) => {
    if (i % 2 === 1) {
      return `<pre>${toHtml(partToHtml)}</pre>`;
    }
    return toHtml(partToHtml);
  }).join('');

  // Line break before numbers that end with a period
  taggedText = taggedText.replace(/([0-9]+)\. /g, "<br />$1. ");

  // Replace `text` with <code>text</code>
  taggedText = taggedText.replace(/`([^`]+)`/g, (_, codeTextToHtml: string) => `<code>${toHtml(codeTextToHtml)}</code>`);

  // Replace #### with <h4>
  taggedText = taggedText.replace(/#### (.*?)(\n|$)/g, "<h4>$1</h4>");

    // Replace ### with <h3>
  taggedText = taggedText.replace(/### (.*?)(\n|$)/g, "<h3>$1</h3>");

    // Replace ## with <h2>
  taggedText = taggedText.replace(/## (.*?)(\n|$)/g, "<h2>$1</h2>");
  
  // Replace **text** with <strong>text</strong>
  taggedText = taggedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return taggedText;
};

export function removeThinkTags(text: string) {
  // Remove <think> tags and their content
  text = text.replace(/[\s\S]*<\/think>\n?/, '').trim();
  // Apply proper HTML tags to the remaining text
  return tagText(text);
}