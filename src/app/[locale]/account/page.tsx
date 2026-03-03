import { getDictionary, Locale } from '@/app/dictionaries/getDictionary';
import StatusSelector from './_components/StatusSelector';
import styles from './page.module.css';
import FilterManager from './_components/FilterManager';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{locale : Locale}>;
}


export default async function Account( {params }: Props) {
    const { locale } = await params; 
    const dict = await getDictionary(locale);

    const s = dict.statuses;

    const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      flower_catalog: true, // Це дозволить звертатися до book.flower_catalog.slug
    }
  });

  const flowerCatalog = await prisma.flower_catalog.findMany({
    orderBy: { name_en: 'asc' }
  });

  return (
    <div className={styles.grid_title}>
      <p className={styles.status}>{s.title}</p>
      <div className={styles.statusSelector}>
        <StatusSelector
          infoButton={s.infoButton}
          modalTitle={s.modalTitle}
          close={s.close}
          items={s.items}/>
      </div>
      <FilterManager 
        dict={dict}
        locale={locale}
        initialBooks={books}
        flowerCatalog={flowerCatalog}
      />
    </div>
  )
}