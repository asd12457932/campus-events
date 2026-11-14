import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '校園活動報名',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <header className="mb-8">
            <Link href="/" className="text-2xl font-bold hover:text-blue-600">
              校園活動報名
            </Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
