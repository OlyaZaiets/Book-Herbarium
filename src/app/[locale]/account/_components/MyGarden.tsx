import styles from './MyGarden.module.css';
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Dictionary, Locale } from '@/app/dictionaries/getDictionary';
import AddBookModal from './AddBookModal';


type MyGardenProps = {
  locale: Locale;
  dict: Dictionary['myGarden'];
};

export default async function MyGarden({ locale, dict }: MyGardenProps) {
  

  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      flower_catalog: true, // Це дозволить звертатися до book.flower_catalog.slug
    }
  });

  const flowerCatalog = await prisma.flower_catalog.findMany({
    orderBy: { name_en: 'asc' }
  });

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_URL = `https://res.cloudinary.com/${cloudName}/image/upload`;
  
  return (
    <div className={styles.booksContainer}>
      <h2 className={styles.page_title}>{dict.title}</h2>
      <div className={styles.addButtonContainer}>
        <h3>{dict.addNewPlant}</h3>
        <AddBookModal 
          flowerCatalog={flowerCatalog} 
          dict={dict} 
          locale={locale}
        />

      </div>
      <div className={styles.booksGrid}>
        {books.map((book) => {
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
                  <span className={styles.categoryName}>{book.category}</span>
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
                  <p className={styles.bookSubtitle}>{book.category}</p>
                  <div className={styles.divider}></div>
                  <p className={styles.dateLabel}>{book.phase}</p>
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