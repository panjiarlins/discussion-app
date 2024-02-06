import Header from '@/components/home/header/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row sm:container">
      <Header />
      <main className="flex-1">
        <section>{children}</section>
      </main>
    </div>
  )
}
