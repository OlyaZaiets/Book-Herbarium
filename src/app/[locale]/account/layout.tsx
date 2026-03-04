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

type Locale = 'en' | 'uk' ; // приклад

export default async function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string }; // отримуємо string
}) {
  const locale = params.locale as Locale; // приводимо до union

  return (
    <>
      {children}
    </>
  );
}
