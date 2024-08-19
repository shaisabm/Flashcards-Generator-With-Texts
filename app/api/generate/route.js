import {NextResponse} from 'next/server'
import OpenAI from 'openai'


const systemPrompt = `You are an AI assistant tasked with creating educational flashcards. Based on the provided text, generate a set of flashcards that adhere to the following guidelines:

1. Each flashcard should have a clear and concise question on one side.
2. The corresponding answer should be accurate, informative, and directly related to the question.
3. Ensure the questions cover key concepts, definitions, and important details from the text.
4. Avoid overly complex or ambiguous questions.
5. Format the flashcards in a way that is easy to read and understand.
6. Only generate 10 flashcards.
7. The length of the question and answer should not exceed 100 characters.
8. Questions should be on the front side of the flashcard, and answers should be on the back.


Your goal is to help users learn and retain information effectively through these flashcards.

Return in the following JSON format:
{
 "flashcards":[
     {
        "front": str,
        "back": str
     }
 ]
}
`;

export async function POST(req) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY)
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages : [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: 'gpt-4o-mini',
        response_format: {type: 'json_object'}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)
    return  NextResponse.json(flashcards.flashcards)
}
