import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import FieldNotes from './_components/FieldNotes';
import { getDictionary, Locale } from '@/app/dictionaries/getDictionary';

type PageProps = {
  params: Promise<{
    id: string;
    locale: Locale;
  }>;
};

export default async function BookPage({ params }: PageProps) {
  const { id, locale } = await params;
  const dict = await getDictionary(locale);

  const b = dict.bookDetails;


  const book = await prisma.book.findUnique({
    where: { id: id },
    include: {
      flower_catalog: true,
    },
  });

  
  if (!book) {
    return notFound(); 
  }

  const notes = await prisma.note.findMany({ 
    where: { bookId: id },
    orderBy: { createdAt: 'desc' }
  });


    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_URL = `https://res.cloudinary.com/${cloudName}/image/upload`;

    const displayImageUrl = book.flower_slug 
      ? `${CLOUDINARY_URL}/${book.flower_slug}.png` 
      : book.imageUrl;

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        { displayImageUrl ? (
          <Image
            src={displayImageUrl}
            alt={book.title}
            width={350} 
            height={350}
            // className={styles.bookImage}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )
        }

      </div>
      <div className={styles.moreInfo}>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <div className={styles.divider}></div>
        <h3>{b.title}</h3>
        <p>{book.phase}. {book.category}</p>
        <h3>{b.yourThoughts}</h3>
        <p>{book.thoughts}</p> 
        {/* add few sentences */}  
        <h3>{b.AIThoughts}</h3>
        <p>{book.interpretation}</p>
        <div className={styles.divider}></div>
        <FieldNotes bookId={id} initialNotes={notes} dict={b}/>
  

      </div>





      
    </div>
  );
}