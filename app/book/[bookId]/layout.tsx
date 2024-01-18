import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TooltipProvider } from '@/components/ui/tooltip';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}
