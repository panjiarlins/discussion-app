import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/contexts/auth-provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import StoreProvider from '@/store/store-provider'

const quicksand = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discussion App',
  description: 'Discussion App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-w-[280px] min-h-screen antialiased',
          quicksand.className
        )}
      >
        <AuthProvider>
          <StoreProvider>
            {children}
            <Toaster richColors closeButton position="top-center" />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
