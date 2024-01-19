import LoadingBar from '@/components/ui/loading-bar'

export default async function HomeLayout({
  children,
  header,
  sidebar,
  newThreadInput,
}: {
  children: React.ReactNode
  header: React.ReactNode
  sidebar: React.ReactNode
  newThreadInput: React.ReactNode
}) {
  return (
    <>
      <LoadingBar scope="threads/getThreads" className="fixed" />
      <div className="flex flex-row sm:container">
        {header}
        <main className="flex-1 lg:grid lg:grid-cols-4">
          <section className="lg:col-span-3">
            {newThreadInput}
            {children}
          </section>
          {sidebar}
        </main>
      </div>
    </>
  )
}
