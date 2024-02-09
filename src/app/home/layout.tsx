import Header from '@/components/home/header/header'
import LoadingBar from '@/components/ui/loading-bar'

export default async function Layout({
  children,
  sidebar,
  newThreadInput,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  newThreadInput: React.ReactNode
}) {
  return (
    <>
      <LoadingBar scope="threads/getThreads" className="fixed z-50" />
      <div className="flex flex-row sm:container">
        <Header />
        <main className="flex-1 lg:grid lg:grid-cols-4">
          <section className="lg:hidden max-lg:col-span-4">{sidebar}</section>
          <section className="lg:col-span-3">
            {newThreadInput}
            {children}
          </section>
          <section className="max-lg:hidden">{sidebar}</section>
        </main>
      </div>
    </>
  )
}
