import Image from 'next/image'
import logo from '../../../../public/_049fd1fb-231f-4466-9919-f4ac28359ee2.jpeg'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <main className="container flex flex-col items-center justify-center gap-8 py-10 lg:flex-row lg:gap-20 lg:py-20">
      <section>
        <Image
          alt="logo"
          className="rounded-full w-28 lg:w-80"
          src={logo}
          priority
        />
      </section>
      {children}
    </main>
  )
}
