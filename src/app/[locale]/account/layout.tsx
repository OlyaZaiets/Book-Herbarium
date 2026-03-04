import type { Locale } from '@/app/dictionaries/getDictionary';

const supportedLocales: Locale[] = ['en', 'uk'];

export default async function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Next.js передає Promise
}) {
  const { locale: rawLocale } = await params;

  // явне приведення або fallback
  const locale: Locale = supportedLocales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : 'en'; // fallback, якщо невідома локаль

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}