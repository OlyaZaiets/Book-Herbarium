import { auth } from "@/auth";
import { redirect } from "next/navigation";
// import type { Locale } from "@/app/dictionaries/getDictionary";

// export default async function AccountLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: Locale }>;
// }) {
//   const { locale } = await params;

//   const session = await auth();
//   if (!session?.user) {
//     redirect(`/${locale}/login`);
//   }

//   return <>{children}</>;
// }

// type Locale = 'en' | 'uk' ; // приклад

// export default async function AccountLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { locale: string }; // отримуємо string
// }) {
//   const locale = params.locale as Locale; // приводимо до union

//   return (
//     <>
//       {children}
//     </>
//   );
// }

import type { Locale } from '@/app/dictionaries/getDictionary';

const supportedLocales: Locale[] = ['en', 'uk'];

type AccountLayoutProps = {
  children: React.ReactNode;
  params: { locale: string } | Promise<{ locale: string }>; // Next.js може передати Promise
};

export default async function AccountLayout({
  children,
  params,
}: AccountLayoutProps) {
  // якщо params — Promise, чекаємо на нього
  const { locale: rawLocale } = params instanceof Promise ? await params : params;

  const locale: Locale = supportedLocales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : 'en'; // fallback

  return (
    <>
      {children}
    </>
  );
}