import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BOTANIST_SYSTEM_PROMPT } from './botanist-prompt';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function generateBotanistInterpretation(bookId: string, locale: 'en' | 'uk' = 'uk') {
  console.log("DEBUG: Current locale is:", locale);
  
  try {
    // Додаємо 'include', щоб витягнути дані з flower_catalog
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        flower_catalog: true, 
      }
    });

    if (!book) return null;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      // model: "gemini-1.5-flash",
      systemInstruction: BOTANIST_SYSTEM_PROMPT,
    });

    // Вибираємо потрібну мову для символізму
    const symbolism = locale === 'en' 
      ? book.flower_catalog?.symbolism_en 
      : book.flower_catalog?.symbolism_uk;

    // Формуємо розширений контекст для AI
    // Важливо: ми передаємо символізм, але промпт (який ми оновили раніше) 
    // забороняє називати саму квітку.
    const userContent = `
      [LANGUAGE DIRECTIVE]
        The desired language for your response is: ${locale === 'en' ? 'ENGLISH' : 'UKRAINIAN'}.
        Strictly provide the interpretation in ${locale === 'en' ? 'English' : 'Ukrainian'}.

      [FLOWER SYMBOLISM CONTEXT]
      Note: Use the following symbolism as the "soul" of your metaphor, but DO NOT name the plant.
      Symbolism: ${symbolism || 'General botanical growth'}

      [USER DATA]
      Category: ${book.season}
      Phase: ${book.phase}
      User's Thoughts: "${book.thoughts || 'The gardener is silent for now.'}"
    `;
    try {
      const result = await model.generateContent(userContent);
      const response = result.response;
      const interpretation = response.text().trim();

      await prisma.book.update({
        where: { id: bookId },
        data: { interpretation }
      });

      return interpretation;
      } catch (aiError: any) {
      // Якщо AI перевантажений (503) або ліміт вичерпано
      console.error("AI Service spike detected:", aiError.message);
      
      const fallbackText = locale === 'en' 
        ? "The botanist is currently wandering the gardens. Your plant is growing, check back later for its meaning."
        : "Ботанік зараз гуляє садом. Ваша рослина росте, зазирніть пізніше за її тлумачення.";

      await prisma.book.update({
        where: { id: bookId },
        data: { interpretation: fallbackText }
      });
      
      return fallbackText;
    }
  
  } catch (error) {
    console.error("Botanist AI Error:", error);
    return null;
  }
}