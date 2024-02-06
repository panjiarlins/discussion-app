import Header from '@/components/home/header/header'

export default function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <div className="flex flex-row sm:container">
      <Header />
      <main className="flex-1 lg:grid lg:grid-cols-4">
        <section className="lg:col-span-3">{children}</section>
        <section className="max-lg:hidden">{sidebar}</section>
      </main>
    </div>
  )
}
