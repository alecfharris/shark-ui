'use client';

import { useChat } from '@ai-sdk/react';

const toHtml = (text: string) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const tagText = (text: string) => {
  // Replace ``` with <pre> or </pre>
  let taggedText = text.split(/```/).map((partToHtml: string, i: number) => {
    if (i % 2 === 1) {
      return `<pre>${toHtml(partToHtml)}</pre>`;
    }
    return toHtml(partToHtml);
  }).join('');

  // Replace `text` with <code>text</code>
  taggedText = taggedText.replace(/`([^`]+)`/g, (_, codeTextToHtml: string) => `<code>${toHtml(codeTextToHtml)}</code>`);

  // Replace ## with <h2>
  taggedText = taggedText.replace(/## (.*?)(\n|$)/g, "<h2>$1</h2>");

  // Replace ### with <h3>
  taggedText = taggedText.replace(/### (.*?)(\n|$)/g, "<h3>$1</h3>");

  // Replace #### with <h4>
  taggedText = taggedText.replace(/#### (.*?)(\n|$)/g, "<h4>$1</h4>");
  
  // Replace **text** with <strong>text</strong>
  taggedText = taggedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return taggedText;
};

function removeThinkTags(text: string) {
  // Remove <think> tags and their content
  text = text.replace(/[\s\S]*<\/think>\n?/, '').trim();
  // Apply proper HTML tags to the remaining text
  return tagText(text);
}

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit} = useChat();

  return (
    <main className='flex flex-col items-center justify-between p-24 bg-b min-h-screen w-90vw'>
      {messages.map(message => (
        <div key={message.id} className='text-green-500 flex flex-row'>
          <div className='mr-2'>{message.role === 'user' ? 'User: ' : 'AI: '}</div>
          <div dangerouslySetInnerHTML={{ __html: removeThinkTags(message.content) }} />
        </div>
      ))}
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-between p-24'>
        <input name="prompt" value={input} onChange={handleInputChange} className='p-4 rounded shadow-md mb-2 border border-white text-green-500'/>
        <button type="submit" className='text-green-500 p-4 rounded border border-white --font-splash text-xl mt-4'>Submit</button>
      </form>
  
    </main>
  );
}