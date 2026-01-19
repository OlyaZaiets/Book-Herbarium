import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // Отримати всі книги, які зберігаються в Neon
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const { title, author, category, phase, imageUrl } = await req.json();

  const book = await prisma.book.create({
    data: { title, author, category, phase, imageUrl },
  });

  return NextResponse.json(book);
}
