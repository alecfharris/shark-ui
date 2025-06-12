import { createOllama } from 'ollama-ai-provider'
import { streamText } from 'ai'
import { type CoreMessage } from 'ai'
 
interface ChatRequest {
    messages: {
        role: string
        content: string
    }[]
}

export const maxDuration = 30

 
export async function POST(req: Request) {
 
    const body = await req.json() as ChatRequest
    const messages = body.messages as CoreMessage[]
 
    const provider = createOllama({
        baseURL: 'http://localhost:11434/api',
    })
 
    const model = provider('deepseek-r1:14b')
 
    const lastMessage = messages[messages.length - 1].content
 
    const prompt = `${lastMessage}`
 
    const response = streamText({
        model: model,
        prompt: prompt,
        temperature: 0.1,
    })
 
    return response.toDataStreamResponse({
        getErrorMessage: (error) => {
            const message = error instanceof Error ? error.message : (typeof error === 'string' ? error : 'Unknown error')
            console.error(message)
            return message
        },
    })
 
}