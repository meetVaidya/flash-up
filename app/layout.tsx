import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Flashcard SaaS',
    description: 'Learn anything with our powerful flashcard system',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col min-h-screen">
                    <header className="bg-primary text-primary-foreground shadow-md">
                        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                            <Link href="/" className="text-2xl font-bold">
                                FlashMaster
                            </Link>
                            <div className="space-x-4">
                                <Link href="/decks">
                                    <Button variant="ghost">My Decks</Button>
                                </Link>
                                <Link href="/study">
                                    <Button variant="ghost">Study</Button>
                                </Link>
                                <Link href="/profile">
                                    <Button variant="ghost">Profile</Button>
                                </Link>
                            </div>
                        </nav>
                    </header>

                    <main className="flex-grow container mx-auto px-4 py-8">
                        {children}
                    </main>

                    <footer className="bg-secondary text-secondary-foreground">
                        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                            <p>&copy; 2023 FlashMaster. All rights reserved.</p>
                            <div className="space-x-4">
                                <Link href="/about" className="hover:underline">About</Link>
                                <Link href="/privacy" className="hover:underline">Privacy</Link>
                                <Link href="/terms" className="hover:underline">Terms</Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    )
}