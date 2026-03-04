import type { Locale } from '@/app/dictionaries/getDictionary';

const supportedLocales: Locale[] = ['en', 'uk'];

type AccountLayoutProps = {
  children: React.ReactNode;
  params: { locale: string }; // синхронно, без Promise
};

export default function AccountLayout({ children, params }: AccountLayoutProps) {
  const locale: Locale = supportedLocales.includes(params.locale as Locale)
    ? (params.locale as Locale)
    : 'en';

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}