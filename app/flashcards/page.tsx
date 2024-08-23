import Link from 'next/link'
import { Flashcard } from '@/types'

// This would typically come from a database or API
const getFlashcards = async (): Promise<Flashcard[]> => {
    // Simulating an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', question: 'What is the capital of France?', answer: 'Paris' },
                { id: '2', question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
                { id: '3', question: 'What is the chemical symbol for gold?', answer: 'Au' },
            ])
        }, 1000)
    })
}

export default async function FlashcardsPage() {
    const flashcards = await getFlashcards()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">All Flashcards</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcards.map((flashcard) => (
                    <Link
                        href={`/flashcards/${flashcard.id}`}
                        key={flashcard.id}
                        className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <h2 className="font-semibold mb-2">{flashcard.question}</h2>
                        <p className="text-sm text-gray-600">Click to view answer</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}