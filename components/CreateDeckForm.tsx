"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { PlusIcon, XIcon } from 'lucide-react'
import GenerateFlashcardsForm from './GenerateFlashcardsForm'
import { toast } from "@/components/ui/use-toast"

interface FlashcardInput {
    question: string
    answer: string
}

export default function CreateDeckForm() {
    const router = useRouter()
    const [deckName, setDeckName] = useState('')
    const [flashcards, setFlashcards] = useState<FlashcardInput[]>([{ question: '', answer: '' }])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addFlashcard = () => {
        setFlashcards([...flashcards, { question: '', answer: '' }])
    }

    const removeFlashcard = (index: number) => {
        setFlashcards(flashcards.filter((_, i) => i !== index))
    }

    const updateFlashcard = (index: number, field: 'question' | 'answer', value: string) => {
        const updatedFlashcards = [...flashcards]
        updatedFlashcards[index][field] = value
        setFlashcards(updatedFlashcards)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/flashcards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: deckName, flashcards }),
            })

            if (!response.ok) {
                throw new Error('Failed to create deck')
            }

            const data = await response.json()
            toast({
                title: "Success",
                description: "Deck created successfully!",
            })
            router.push('/decks')
            router.refresh() // Refresh the page to show the new deck
        } catch (error) {
            console.error('Error creating deck:', error)
            toast({
                title: "Error",
                description: "Failed to create deck. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleGeneratedFlashcards = (generatedFlashcards: FlashcardInput[]) => {
        setFlashcards([...flashcards, ...generatedFlashcards])
    }

    // ... rest of the component remains the same

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* ... form content remains the same ... */}
                <CardFooter className="flex justify-between">
                    <Button type="button" onClick={addFlashcard}>
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add Flashcard
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Deck'}
                    </Button>
                </CardFooter>
            </form>

            <GenerateFlashcardsForm onFlashcardsGenerated={handleGeneratedFlashcards} />
        </div>
    )
}