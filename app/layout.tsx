import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'CampusHub 校園活動報名',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-page text-body text-text antialiased">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <header className="mb-6 flex items-baseline justify-between">
            <Link href="/" className="text-title font-bold text-primary">
              CampusHub
            </Link>
            <span className="text-caption text-muted">活動列表</span>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
