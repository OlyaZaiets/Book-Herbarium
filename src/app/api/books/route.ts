import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { generateBotanistInterpretation } from '@/lib/ai/generate-interpretation';

export async function GET() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    include: { flower_catalog: true }
  });
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, author, category, phase, thoughts, flower_slug, locale } = body;

    // 1. Створюємо книгу в Neon
    const book = await prisma.book.create({
      data: { 
        title, 
        author, 
        category, 
        phase, 
        thoughts, 
        flower_slug // додаємо зв'язок з квіткою
      },
    });

    // 2. Викликаємо AI Botanist (він оновить поле interpretation у цій книзі)
    // Передаємо id та мову (наприклад, 'uk')
    await generateBotanistInterpretation(book.id, locale || 'uk');

    // Отримуємо оновлену книгу з інтерпретацією
    const updatedBook = await prisma.book.findUnique({
      where: { id: book.id }
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}