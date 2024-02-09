'use client'

import Image from 'next/image'
import Logo from '../../../public/_049fd1fb-231f-4466-9919-f4ac28359ee2.jpeg'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data } = useSession()

  if (data) return null

  return (
    <main className="container flex flex-col items-center justify-center gap-8 py-10 lg:flex-row lg:gap-20 lg:py-20">
      <section>
        <Image
          onClick={() => {
            router.push('/home')
          }}
          priority
          src={Logo}
          alt="logo"
          className="rounded-full cursor-pointer w-28 lg:w-80"
        />
      </section>
      {children}
    </main>
  )
}
