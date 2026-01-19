import './globals.css';
import { playfairDisplay, sourceSerif } from './fonts';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${playfairDisplay.variable} ${sourceSerif.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
