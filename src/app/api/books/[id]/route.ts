import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } } // тут не Promise
) {
  const { id } = context.params; // без await

  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(book);
}