import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TelegramProvider from '@/providers/TelegramProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pizza Mini App',
  description: 'Telegram Pizza Mini App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-black`}>
        <TelegramProvider>
          <div className="max-w-md mx-auto min-h-screen bg-white relative pb-20">
            {children}
          </div>
        </TelegramProvider>
      </body>
    </html>
  );
}
