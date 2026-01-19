import '../globals.css';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { getDictionary, type Locale } from '../dictionaries/getDictionary';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
