"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Deck, Flashcard } from '@/lib/types'

export default function DeckDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [deck, setDeck] = useState<Deck | null>(null)
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    useEffect(() => {
        // Fetch deck details
        fetch(`/api/flashcards?deckId=${id}`)
            .then(res => res.json())
            .then(data => {
                setDeck(data.deck)
                setFlashcards(data.cards)
            })
    }, [id])

    if (!deck) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{deck.name}</h1>
                <div className="space-x-4">
                    <Link href={`/study/${id}`}>
                        <Button>Start Study Session</Button>
                    </Link>
                    <Button variant="outline" onClick={() => router.push('/decks')}>
                        Back to Decks
                    </Button>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Deck Statistics</h2>
                <Card>
                    <CardContent className="p-6">
                        <p>Total Cards: {flashcards.length}</p>
                        {/* Add more statistics here */}
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Flashcards</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {flashcards.map((card, index) => (
                        <Card key={card.id}>
                            <CardHeader>
                                <CardTitle>Card {index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold">Q: {card.question}</p>
                                <p className="mt-2">A: {card.answer}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}