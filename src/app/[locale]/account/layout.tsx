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

// import type { Locale } from '@/app/dictionaries/getDictionary';
// import { ReactNode } from 'react';

// const supportedLocales: Locale[] = ['en', 'uk'];

// interface AccountLayoutProps {
//   children: ReactNode;
//   params: Promise<{ locale: Locale }>; // Next.js чекає саме Locale
// }

// export default async function AccountLayout({
//   children,
//   params,
// }: AccountLayoutProps) {
//   const { locale } = await params; // unwrap Promise

//   return <>{children}</>;
// }

// import type { Locale } from '@/app/dictionaries/getDictionary';
// import { ReactNode } from 'react';

// const supportedLocales: Locale[] = ['en', 'uk'];

// interface AccountLayoutProps {
//   children: ReactNode;
//   params: Promise<{ locale: string }>; // string — як реально передає Next.js
// }

// export default async function AccountLayout({
//   children,
//   params,
// }: AccountLayoutProps) {
//   const { locale: rawLocale } = await params; // unwrap Promise

//   // fallback і приведення до union Locale
//   const locale: Locale = supportedLocales.includes(rawLocale as Locale)
//     ? (rawLocale as Locale)
//     : 'en';

//   return <>{children}</>;
// }
import type { Locale } from '@/app/dictionaries/getDictionary';
import { ReactNode } from 'react';

const supportedLocales: Locale[] = ['en', 'uk'];

interface AccountLayoutProps {
  children: ReactNode;
  params: { locale: string }; // string від Next.js
}

export default function AccountLayout({ children, params }: AccountLayoutProps) {
  // fallback до union
  const locale: Locale = supportedLocales.includes(params.locale as Locale)
    ? (params.locale as Locale)
    : 'en';

  return <>{children}</>;
}