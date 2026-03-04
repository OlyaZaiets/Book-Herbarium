// import '../globals.css';
// import { Header } from '@/components/Header/Header';
// import { Footer } from '@/components/Footer/Footer';
// import { getDictionary, type Locale } from '../dictionaries/getDictionary';

// export default async function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { locale: Locale };
// }) {
//   const { locale } = params;
//   const dict = await getDictionary(locale);
//   return (
//     <>
//       <Header locale={locale} dict={dict} />
//       <main>{children}</main>
//       <Footer />
//     </>
//   );
// }



// import './globals.css';
// import { playfairDisplay, sourceSerif } from './fonts';
// import { Providers } from './providers';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html className={`${playfairDisplay.variable} ${sourceSerif.variable}`}>
//       <body>
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }



import '../globals.css';
import { playfairDisplay, sourceSerif } from '../fonts';
import { Providers } from '../providers';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { getDictionary, type Locale } from '../dictionaries/getDictionary';

const supportedLocales: Locale[] = ['en', 'uk'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise <{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = supportedLocales.includes(locale as Locale) ? (locale as Locale) : 'en'; 
  const dict = await getDictionary(safeLocale);

  return (
    <html className={`${playfairDisplay.variable} ${sourceSerif.variable}`}>
      <body>
        <Providers>
          <Header locale={safeLocale} dict={dict} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
