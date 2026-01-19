'use client';

import { useEffect, useState } from "react";
import styles from './MyGarden.module.css';

type Book = {
  id: string;
  title: string;
  author?: string;
  imageUrl?: string;
  category: string;
  phase: string;
  statusId?: string;
  createdAt: string;
};

export default function MyGarden() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div className={styles.booksContainer}>
      <h2 className={styles.page_title}>My Garden</h2>
      <div className={styles.booksGrid}>
        {books.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.cardContent}>
              {/* Верхня частина: Назва/Категорія з іконкою */}
              <div className={styles.topLabel}>
                <span className={styles.leafIcon}>🌿</span>
                <span className={styles.categoryName}>{book.category || 'Дзвіночка'}</span>
              </div>

              {/* Зображення */}
              <div className={styles.imageWrapper}>
                <img src={book.imageUrl} alt={book.title} className={styles.bookImage} />
              </div>

              {/* Основна інформація */}
              <div className={styles.bookDetails}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookSubtitle}>«Книга-супутник для проміжних часів.»</p>
                
                <div className={styles.divider}></div>
                
                <p className={styles.dateLabel}>{book.phase}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}