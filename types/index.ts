export interface Deck {
    id: string
    name: string
    cardCount: number
}

export interface Flashcard {
    id: string
    deckId: string
    question: string
    answer: string
}