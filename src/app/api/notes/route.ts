import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { bookId, content } = await req.json();
  
  const newNote = await prisma.note.create({
    data: {
      bookId,
      content,
    },
  });
  
  return NextResponse.json(newNote);
}