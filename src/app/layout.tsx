import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PickBazar',
  description: 'E-commerce website built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
