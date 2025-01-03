import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { OrderProvider } from '@/contexts/OrderContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <OrderProvider>
            {children}
          </OrderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
