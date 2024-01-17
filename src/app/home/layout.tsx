import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

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
  const session = await getServerSession(options)

  return (
    <div className="flex flex-row sm:container">
      {header}
      <main className="flex-1 lg:grid lg:grid-cols-4">
        <section className="lg:col-span-3">
          {!!session?.user.token && newThreadInput}
          {children}
        </section>
        {sidebar}
      </main>
    </div>
  )
}
