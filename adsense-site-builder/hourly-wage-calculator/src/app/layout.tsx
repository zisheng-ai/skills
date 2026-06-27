import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://hourlycalc.com'),
  title: {
    default: 'Hourly Wage Calculator — Salary to Hourly Converter',
    template: '%s | HourlyCalc',
  },
  description:
    'Convert annual salary to hourly rate (and back) with custom hours per week, PTO, and holidays. Free, instant, no signup required.',
  openGraph: {
    siteName: 'HourlyCalc',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
