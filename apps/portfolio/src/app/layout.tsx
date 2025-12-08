import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carl Wahlen - Product Strategy Consultant',
  description: 'Product strategy consultant specializing in data-driven products, UX/UI design, and technology strategy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

