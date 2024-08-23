import { Deck, Flashcard } from '../types'

export const decks: Deck[] = [
    { id: '1', name: 'JavaScript Basics', cardCount: 10 },
    { id: '2', name: 'React Fundamentals', cardCount: 15 },
    { id: '3', name: 'CSS Tricks', cardCount: 8 },
]

export const flashcards: Flashcard[] = [
    { id: '1', deckId: '1', question: 'What is a closure?', answer: 'A closure is...' },
    { id: '2', deckId: '1', question: 'What is hoisting?', answer: 'Hoisting is...' },
    // Add more flashcards here
]