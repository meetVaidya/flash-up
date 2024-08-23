"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flashcard as FlashcardType } from '@/lib/types'

export default function StudySession() {
    const { deckId } = useParams()
    const router = useRouter()
    const [cards, setCards] = useState<FlashcardType[]>([])
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        fetch(`/api/flashcards?deckId=${deckId}`)
            .then(res => res.json())
            .then(data => {
                setCards(data.cards)
                setProgress(0)
            })
    }, [deckId])

    const flipCard = () => setIsFlipped(!isFlipped)

    const nextCard = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(prevIndex => prevIndex + 1)
            setIsFlipped(false)
            setProgress((currentCardIndex + 1) / cards.length * 100)
        } else {
            // End of deck
            router.push(`/decks/${deckId}`)
        }
    }

    if (cards.length === 0) {
        return <div className="text-center">Loading...</div>
    }

    const currentCard = cards[currentCardIndex]

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Study Session</h1>
            <Progress value={progress} className="mb-8" />
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div
                        className="text-2xl font-bold mb-4 min-h-[100px] flex items-center justify-center cursor-pointer"
                        onClick={flipCard}
                    >
                        {isFlipped ? currentCard.answer : currentCard.question}
                    </div>
                    <Button onClick={flipCard} className="w-full mb-4">
                        {isFlipped ? "Show Question" : "Show Answer"}
                    </Button>
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={() => router.push(`/decks/${deckId}`)}>
                            End Session
                        </Button>
                        <Button onClick={nextCard}>
                            {currentCardIndex === cards.length - 1 ? "Finish" : "Next Card"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="text-center text-sm text-muted-foreground">
                Card {currentCardIndex + 1} of {cards.length}
            </div>
        </div>
    )
}