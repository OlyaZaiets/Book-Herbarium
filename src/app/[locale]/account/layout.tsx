import type { Locale } from '@/app/dictionaries/getDictionary';

const supportedLocales: Locale[] = ['en', 'uk'];

export default async function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ params — це Promise
}) {
  const { locale: rawLocale } = await params; // чекаємо на Promise

  const locale = supportedLocales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : 'en'; // fallback

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}