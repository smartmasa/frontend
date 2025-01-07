import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import { OrderProvider } from '@/contexts/OrderContext';
import {notFound} from 'next/navigation';

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const {locale} = await params;

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <OrderProvider>
            {children}
          </OrderProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
