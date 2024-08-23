import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateFlashcards(topic: string, count: number) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate ${count} flashcards about ${topic}. 
  Format the output as a JSON array of objects, each with 'question' and 'answer' fields.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Failed to parse Gemini AI response:", error);
        return [];
    }
}