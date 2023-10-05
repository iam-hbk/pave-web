import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

const inter = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pave',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
