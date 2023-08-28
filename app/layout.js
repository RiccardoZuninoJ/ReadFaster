import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReadFaster / RICCARDOZUNINOJ',
  description: 'Simply read faster. Bold the first letters of each word, and increase your productivity.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
