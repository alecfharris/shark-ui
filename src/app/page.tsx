'use client';

import { useChat } from '@ai-sdk/react';
import { removeThinkTags } from './util/textTransform';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit} = useChat();

  return (
    <main className='flex flex-col items-center justify-between p-24 bg-b min-h-screen w-90vw'>
      {messages.map(message => (
        <div key={message.id} className='text-green-500 flex flex-row leading-[2]'>
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