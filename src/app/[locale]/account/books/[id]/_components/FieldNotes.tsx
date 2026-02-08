'use client';

import { useState } from 'react';
import styles from './FieldNotes.module.css';
import { Dictionary } from '@/app/dictionaries/getDictionary';

type Note = {
  id: string;
  content: string;
  // createdAt: string;
}

type FieldNotesProps = {
  bookId: string;
  initialNotes: Note[];
  dict: Dictionary['bookDetails'];
}

export default function FieldNotes( {bookId, initialNotes, dict }: FieldNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function startEdit(note: Note) {
    setEditingId(note.id);
    setText(note.content);
    setIsOpen(true);
  }

  async function handleSave() {
    if (!text.trim()) return;
    setLoading(true);

    try {
      if (editingId) {
        const res = await fetch(`/api/notes/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: text }),
        });
        const updatedNote = await res.json();
        setNotes(prev => prev.map(n => n.id === editingId ? updatedNote : n));
        
      } else {
        const res = await fetch('/api/notes', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookId,
            content: text,
          }),
        });

        if (!res.ok) throw new Error('Помилка сервера');

        const newNote = await res.json();
        setNotes(prev => [newNote, ...prev]);
      }

      setIsOpen(false);
      setText('');
      setEditingId(null);
      
    } catch (error) {
      alert('Failed to save note. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
  if (!confirm('Delete this note?')) return;

  try {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
  } catch (error) {
    console.error('Failed to delete:', error);
  }
}


  return(
    <section className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h2>{dict.fieldNotesTitle}</h2>
        <div className={styles.notesActions}>
            <p>{dict.addNote}</p>
            <button onClick={() => setIsOpen(true)}>+</button>
          </div>
      </div>

      {/* Notes grid */}
      <div className={styles.grid}>
        {notes.map(note => (
          <div key={note.id} className={styles.note}>
            <div className={styles.noteActions}>
              <button className={styles.editBtn} onClick={() => startEdit(note)}>✎</button>
              <button
                className={styles.deleteBtn} 
                onClick={() => handleDelete(note.id)}
                >
                  ×
                </button>
            </div>
            {note.content}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <h3>{dict.newNote}</h3>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={dict.placeholder}
            />

            <div className={styles.actions}>
              <button onClick={() => setIsOpen(false)}>{dict.cancel}</button>
              <button onClick={handleSave} disabled={loading}>
                {loading ? dict.saving : dict.savedDone}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
