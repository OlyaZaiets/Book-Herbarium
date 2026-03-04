import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import type { Locale } from '@/app/dictionaries/getDictionary';

const supportedLocales: Locale[] = ['en', 'uk'];

export default async function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = supportedLocales.includes(params.locale as Locale)
    ? (params.locale as Locale)
    : 'en'; // fallback

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
