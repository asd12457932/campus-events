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
      <body className="min-h-screen bg-[#F3F4F6] text-[#6B7280]">
        <div className="mx-auto max-w-3xl px-2 py-4">
          <header className="mb-4 flex items-baseline justify-between">
            <Link href="/" className="text-lg font-bold text-[#1D4ED8]">
              CampusHub
            </Link>
            <span className="text-xs text-[#9CA3AF]">活動列表</span>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
