import Link from 'next/link'
import { Button } from "@/components/ui/button"
import DeckList from '@/components/DeckList'

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Flashcard SaaS</h1>
            <Link href="/decks/create">
                <Button>Create New Deck</Button>
            </Link>
            <DeckList />
        </div>
    )
}