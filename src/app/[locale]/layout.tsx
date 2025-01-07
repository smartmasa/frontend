import "../globals.css";
import { OrderProvider } from '@/contexts/OrderContext';

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <OrderProvider>
        {children}
      </OrderProvider>
    </NextIntlClientProvider>
  );
}
