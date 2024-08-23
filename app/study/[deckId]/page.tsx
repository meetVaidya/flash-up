"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Flashcard from '@/components/Flashcard'
import { Button } from "@/components/ui/button"
import { Flashcard as FlashcardType } from '../../../lib/types'

export default function StudySession() {
    const { deckId } = useParams()
    const [cards, setCards] = useState<FlashcardType[]>([])
    const [currentCardIndex, setCurrentCardIndex] = useState(0)

    useEffect(() => {
        fetch(`/api/flashcards?deckId=${deckId}`)
            .then(res => res.json())
            .then(data => setCards(data.cards))
    }, [deckId])

    const nextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length)
    }

    if (cards.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Study Session</h1>
            <Flashcard card={cards[currentCardIndex]} />
            <div className="mt-4 flex justify-center">
                <Button onClick={nextCard}>Next Card</Button>
            </div>
        </div>
    )
}