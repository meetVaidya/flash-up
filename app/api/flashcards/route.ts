import { NextResponse } from 'next/server'
import { decks, flashcards } from '@/lib/mockData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const deckId = searchParams.get('deckId')

    if (deckId) {
        const cards = flashcards.filter(card => card.deckId === deckId)
        const deck = decks.find(d => d.id === deckId)
        return NextResponse.json({ deck, cards })
    } else {
        return NextResponse.json({ decks })
    }
}

export async function POST(request: Request) {
    try {
        const { name, cards: newFlashcards } = await request.json()

        // Generate a new deck ID (you should ideally use a more robust method like uuid)
        const newDeckId = (decks.length + 1).toString()

        // Create the new deck
        const newDeck = {
            id: newDeckId,
            name,
            cardCount: newFlashcards.length
        }

        // Add the new flashcards with IDs
        const newFlashcardsWithId = newFlashcards.map((card: any, index: number) => ({
            id: `${newDeckId}-${index + 1}`, // Generating unique card IDs
            deckId: newDeckId,
            ...card
        }))

        // Update the mock data (in a real app, you'd update your database)
        decks.push(newDeck)
        flashcards.push(...newFlashcardsWithId)

        return NextResponse.json({ deck: newDeck, flashcards: newFlashcardsWithId }, { status: 201 }) // 201 Created

    } catch (error) {
        console.error("Error creating deck:", error)
        return NextResponse.json({ error: "Failed to create deck" }, { status: 500 })
    }
}
