import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.note.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Note deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { content } = await request.json();

    const updatedNote = await prisma.note.update({
      where: { id: id },
      data: { content: content },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Error updating note' }, { status: 500 });
  }
}