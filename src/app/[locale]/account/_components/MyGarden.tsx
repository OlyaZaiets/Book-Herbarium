'use client';

import styles from './MyGarden.module.css';
import Link from "next/link";
import Image from "next/image";
import { Dictionary, Locale } from '@/app/dictionaries/getDictionary';
import AddBookModal from './AddBookModal';


type MyGardenProps = {
  locale: Locale;
  dict: Dictionary;
  books: any[];
  flowerCatalog: any[];
  activePhases: string[];
  activeSeasons: string[];
};

export default function MyGarden({ 
  locale, 
  dict,
  books,
  flowerCatalog,
  activePhases,
  activeSeasons
}: MyGardenProps) {

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_URL = `https://res.cloudinary.com/${cloudName}/image/upload`;

  const filteredBooks = books.filter((book) => {
    // Якщо масив порожній — фільтр вимкнено (підходить все)
    const phaseMatch = activePhases.length === 0 || activePhases.includes(book.phase);
    const seasonMatch = activeSeasons.length === 0 || activeSeasons.includes(book.season);
    
    return phaseMatch && seasonMatch;
  });
  
  return (
    <div className={styles.booksContainer}>
      <h2 className={styles.page_title}>{dict.myGarden.title}</h2>
      <div className={styles.addButtonContainer}>
        <h3>{dict.myGarden.addNewPlant}</h3>
        <AddBookModal 
          flowerCatalog={flowerCatalog} 
          dict={dict} 
          locale={locale}
        />
      </div>

      <div className={styles.booksGrid}>
        {filteredBooks.map((book) => {
          const displayImageUrl = book.flower_slug 
            ? `${CLOUDINARY_URL}/${book.flower_slug}.png` 
            : book.imageUrl;
          return (
            <Link 
              key={book.id}
              href={`/${locale}/account/books/${book.id}`}
              className={styles.bookLink}
            >
              <div className={styles.bookCard}>
                <div className={styles.cardContent}>
                {/* Верхня частина: Назва/Категорія з іконкою */}
                <div className={styles.topLabel}>
                  <span className={styles.leafIcon}>🌿</span>
                  <span className={styles.categoryName}>{(dict.seasons.items as any)[book.season] || book.season}</span>
                </div>

                {/* Зображення */}
                    <div className={styles.imageWrapper}>
                    {displayImageUrl ? (
                      <Image 
                        src={displayImageUrl} 
                        alt={book.title}
                        width={100} // Вкажи приблизні розміри
                        height={100}
                        className={styles.bookImage}
                        unoptimized
                      />
                    ) : (
                      <div className={styles.imagePlaceholder} />
                    )}
                  </div>

                <div className={styles.bookDetails}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <div className={styles.divider}></div>

                  <h3 className={styles.bookTitle}>{book.author}</h3>
                  <div className={styles.divider}></div>
{/* 
                  <p className={styles.bookSubtitle}>{(dict.seasons.items as any)[book.season] || book.season}</p>
                  <div className={styles.divider}></div> */}

                  <p className={styles.dateLabel}>{(dict.phaseOfLive.items as any)[book.phase] || book.phase}</p>
                </div>
              </div>
              </div>
            </Link>
          )
          })}
      </div>
    </div>
  );
}