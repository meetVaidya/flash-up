import Link from 'next/link'
import { Button } from "@/components/ui/button"
import DeckList from '@/components/DeckList'

export default function DecksPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Decks</h1>
                <Link href="/decks/create">
                    <Button>Create New Deck</Button>
                </Link>
            </div>
            <DeckList />
        </div>
    )
}