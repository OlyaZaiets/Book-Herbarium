'use client';
import { use } from 'react';
import type { Locale } from '@/app/dictionaries/getDictionary';

const supportedLocales: Locale[] = ['en', 'uk'];

type AccountLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default function AccountLayout({ children, params }: AccountLayoutProps) {
  // використовуємо React.use() для "розпаковки" Promise
  const { locale: rawLocale } = use(params);

  const locale: Locale = supportedLocales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : 'en'; // fallback

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}