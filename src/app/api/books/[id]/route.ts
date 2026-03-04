import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// 1. Змінюємо тип context на Promise
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  // 2. Обов'язково чекаємо на params
  const { id } = await context.params; 

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { flower_catalog: true } // Додай це, якщо треба дані про квітку
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("GET Book Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}