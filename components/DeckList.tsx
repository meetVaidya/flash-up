"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Deck } from '@/lib/types';

export default function DeckList() {
    const [decks, setDecks] = useState<Deck[]>([]);

    const fetchDecks = useCallback(async () => {
        try {
            const res = await fetch('/api/flashcards');
            const data = await res.json();
            setDecks(data.decks);
        } catch (error) {
            console.error('Error fetching decks:', error);
        }
    }, []);

    useEffect(() => {
        fetchDecks();
    }, [fetchDecks]); // Re-fetch when fetchDecks changes

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {decks.map((deck) => (
                <Link href={`/decks/${deck.id}`} key={deck.id}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{deck.name}</CardTitle>
                            <CardDescription>{deck.cardCount} cards</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
