"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

interface GeneratedFlashcard {
    question: string;
    answer: string;
}

export default function GenerateFlashcardsForm({ onFlashcardsGenerated }: { onFlashcardsGenerated: (flashcards: GeneratedFlashcard[]) => void }) {
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/generate-flashcards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, count }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate flashcards');
            }

            const data = await response.json();
            onFlashcardsGenerated(data.flashcards);

            // Send the flashcards to your API to create a new deck
            const createDeckResponse = await fetch('/api/flashcards', { // Assuming /api/flashcards creates a new deck
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: topic, // Use the topic as the deck name
                    cards: data.flashcards
                }),
            });

            if (!createDeckResponse.ok) {
                throw new Error('Failed to create deck');
            }

        } catch (error) {
            console.error('Error generating flashcards or creating deck:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Generate Flashcards with AI</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="topic">Topic</Label>
                        <Input
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="count">Number of Flashcards</Label>
                        <Input
                            id="count"
                            type="number"
                            min="1"
                            max="20"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            'Generate Flashcards'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
