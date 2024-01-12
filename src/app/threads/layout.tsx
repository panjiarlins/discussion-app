export default function HomeLayout({
  children,
  header,
  sidebar,
}: {
  children: React.ReactNode
  header: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <div className="flex flex-row sm:container">
      {header}
      <main className="flex-1 lg:grid lg:grid-cols-4">
        <section className="lg:col-span-3">{children}</section>
        {sidebar}
      </main>
    </div>
  )
}
