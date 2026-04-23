import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TelegramProvider from '@/providers/TelegramProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Premium Pizza',
  description: 'Telegram Pizza Mini App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={inter.variable}>
      <body className="antialiased bg-[#F8FAFC] text-slate-900 selection:bg-orange-500/30">
        <TelegramProvider>
          <main className="max-w-md mx-auto min-h-[100dvh] bg-[#F8FAFC] relative overflow-x-hidden shadow-2xl shadow-black/5 ring-1 ring-slate-900/5">
            {children}
          </main>
        </TelegramProvider>
      </body>
    </html>
  );
}
