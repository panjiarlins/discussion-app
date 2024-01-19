import { options } from '@/app/api/auth/[...nextauth]/options'
import AccountMenu from '@/components/home/@sidebar/account-menu'
import { getServerSession } from 'next-auth'

export default async function Sidebar() {
  const session = await getServerSession(options)

  return (
    <section className="flex flex-col gap-4 p-2 max-lg:hidden">
      {!!session && <AccountMenu />}
    </section>
  )
}
