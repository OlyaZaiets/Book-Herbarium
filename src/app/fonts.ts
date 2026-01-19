import { Playfair_Display, Source_Serif_4 } from 'next/font/google';

export const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
});
