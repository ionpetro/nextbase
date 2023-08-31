import 'server-only';
import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import 'react-tooltip/dist/react-tooltip.css';
import { AppProviders } from './AppProviders';
import localFont from 'next/font/local';

const satoshiFont = localFont({
  src: '../fonts/satoshi/Satoshi-Variable.woff2',
  display: 'swap',
  variable: '--font-satoshi',
});

export const metadata = {
  icons: {
    icon: '/images/logo-black-main.ico',
  },
  title: 'Nextbase Ultimate',
  description: 'Nextbase Ultimate',
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshiFont.variable}>
      <head></head>
      <body className="bg-white dark:bg-gray-900/20">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
