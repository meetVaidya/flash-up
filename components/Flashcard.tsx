"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flashcard as FlashcardType } from '@/lib/types'

interface FlashcardProps {
    card: FlashcardType
}

export default function Flashcard({ card }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
                <div className="text-2xl font-bold mb-4">
                    {isFlipped ? card.answer : card.question}
                </div>
                <Button onClick={() => setIsFlipped(!isFlipped)}>
                    {isFlipped ? "Show Question" : "Show Answer"}
                </Button>
            </CardContent>
        </Card>
    )
}