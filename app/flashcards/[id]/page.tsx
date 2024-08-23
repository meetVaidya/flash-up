import { notFound } from 'next/navigation'
import { Flashcard } from '@/types'

// This would typically come from a database or API
const getFlashcard = async (id: string): Promise<Flashcard | null> => {
    // Simulating an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const flashcards = [
                { id: '1', question: 'What is the capital of France?', answer: 'Paris' },
                { id: '2', question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
                { id: '3', question: 'What is the chemical symbol for gold?', answer: 'Au' },
            ]
            const flashcard = flashcards.find(f => f.id === id) || null
            resolve(flashcard)
        }, 1000)
    })
}

export default async function FlashcardPage({ params }: { params: { id: string } }) {
    const flashcard = await getFlashcard(params.id)

    if (!flashcard) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Flashcard Details</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Question:</h2>
                    <p className="mb-6">{flashcard.question}</p>
                    <h2 className="text-xl font-semibold mb-4">Answer:</h2>
                    <p>{flashcard.answer}</p>
                </div>
            </div>
        </div>
    )
}