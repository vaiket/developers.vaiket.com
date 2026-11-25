import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vaiket Developers',
  description: 'Build powerful communication experiences with Vaiket APIs.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
