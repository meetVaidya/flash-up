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

interface FlashcardInput {
    question: string
    answer: string
}

export default function CreateDeckForm() {
    const router = useRouter()
    const [deckName, setDeckName] = useState('')
    const [flashcards, setFlashcards] = useState<FlashcardInput[]>([{ question: '', answer: '' }])

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
        // In a real application, you would send this data to your API
        console.log({ deckName, flashcards })
        // Redirect to the decks page after creation
        router.push('/decks')
    }

    const handleGeneratedFlashcards = (generatedFlashcards: FlashcardInput[]) => {
        setFlashcards([...flashcards, ...generatedFlashcards])
    }

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Deck</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="deckName">Deck Name</Label>
                                <Input
                                    id="deckName"
                                    value={deckName}
                                    onChange={(e) => setDeckName(e.target.value)}
                                    required
                                />
                            </div>
                            {flashcards.map((flashcard, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Flashcard {index + 1}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor={`question-${index}`}>Question</Label>
                                                <Input
                                                    id={`question-${index}`}
                                                    value={flashcard.question}
                                                    onChange={(e) => updateFlashcard(index, 'question', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`answer-${index}`}>Answer</Label>
                                                <Textarea
                                                    id={`answer-${index}`}
                                                    value={flashcard.answer}
                                                    onChange={(e) => updateFlashcard(index, 'answer', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeFlashcard(index)}
                                            disabled={flashcards.length === 1}
                                        >
                                            <XIcon className="w-4 h-4 mr-2" />
                                            Remove
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="button" onClick={addFlashcard}>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Flashcard
                        </Button>
                        <Button type="submit">Create Deck</Button>
                    </CardFooter>
                </Card>
            </form>

            <GenerateFlashcardsForm onFlashcardsGenerated={handleGeneratedFlashcards} />
        </div>
    )
}