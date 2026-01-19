'use client';

import { Locale } from '@/app/dictionaries/getDictionary';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other: Locale = locale === 'en' ? 'uk' : 'en';

  const segments = pathname.split('/');
  segments[1] = other;
  const nextPath = segments.join('/') || `/${other}`;

  return (
    <Link className={styles.lang} href={nextPath} aria-label="Change language">
      {other.toUpperCase()}
    </Link>
  );
}
