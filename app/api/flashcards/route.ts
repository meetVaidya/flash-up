import { NextResponse } from 'next/server'
import { decks, flashcards } from '@/lib/mockData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const deckId = searchParams.get('deckId')

    if (deckId) {
        const cards = flashcards.filter(card => card.deckId === deckId)
        return NextResponse.json({ cards })
    } else {
        return NextResponse.json({ decks })
    }
}