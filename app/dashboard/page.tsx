"use client"

import { useState } from 'react'
import FlashcardCreator from '@/components/FlashcardCreator'
import FlashcardList from '@/components/FlashcardList'
import { Flashcard } from '@/types'

export default function Dashboard() {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    const addFlashcard = (flashcard: Flashcard) => {
        setFlashcards([...flashcards, flashcard])
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Your Flashcards</h1>
            <FlashcardCreator onCreateFlashcard={addFlashcard} />
            <FlashcardList flashcards={flashcards} />
        </div>
    )
}