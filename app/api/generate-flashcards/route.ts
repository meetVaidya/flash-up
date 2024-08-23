import { NextResponse } from 'next/server'
import { generateFlashcards } from '@/lib/gemini'

export async function POST(request: Request) {
    const { topic, count } = await request.json()

    try {
        const flashcards = await generateFlashcards(topic, count)
        return NextResponse.json({ flashcards })
    } catch (error) {
        console.error("Error generating flashcards:", error)
        return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 })
    }
}