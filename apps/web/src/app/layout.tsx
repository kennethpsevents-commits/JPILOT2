import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GdprConsent from '@/components/gdpr-consent';
import { Navbar } from '@/components/navbar';
import { WebVitalsScript } from '@/components/web-vitals-script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WeAreJobPilot - AI-gedreven job platform',
  description: 'Vind je droombaan met hulp van onze AI buddy',
  keywords: ['jobs', 'AI', 'carrière', 'vacatures', 'Nederland'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
        <GdprConsent />
        <WebVitalsScript />
      </body>
    </html>
  );
}
