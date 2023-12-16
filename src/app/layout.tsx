import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import { GeistSans } from 'geist/font/sans';
import 'react-tooltip/dist/react-tooltip.css';
import 'server-only';
import { AppProviders } from './AppProviders';

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
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head></head>
      <body className="bg-white dark:bg-slate-900">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
