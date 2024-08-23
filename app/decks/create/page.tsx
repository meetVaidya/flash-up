import CreateDeckForm from '@/components/CreateDeckForm'

export default function CreateDeckPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Create New Deck</h1>
            <CreateDeckForm />
        </div>
    )
}