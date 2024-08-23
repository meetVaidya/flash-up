import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateFlashcards(topic: string, count: number) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate ${count} flashcards about ${topic}. 
    Format the output as a strict JSON array of objects, each with 'question' and 'answer' fields. 
    Do not include any extra text or formatting outside the JSON structure.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Attempt to clean the response before parsing
        var cleanedText = text.trim(); // Remove leading/trailing whitespace
        if (cleanedText.startsWith("```json")) {
            cleanedText = cleanedText.substring(7);
        }
        if (cleanedText.endsWith("```")) {
            cleanedText = cleanedText.slice(0, -3);
        }

        const flashcards = JSON.parse(cleanedText);
        return flashcards;
    } catch (error) {
        console.error("Failed to generate or parse flashcards:", error);
        return []; // Return an empty array to gracefully handle the error
    }
}
