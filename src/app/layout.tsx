import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/contexts/auth-provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import StoreProvider from '@/store/store-provider'
import { ThemeProvider } from '@/contexts/theme-provider'

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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          'mx-auto min-h-screen min-w-[280px] antialiased',
          quicksand.className
        )}
      >
        <AuthProvider>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors closeButton position="top-center" />
            </ThemeProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
