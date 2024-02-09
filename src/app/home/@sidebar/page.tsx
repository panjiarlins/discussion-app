import { options } from '@/app/api/auth/[...nextauth]/options'
import AccountMenu from '@/components/home/@sidebar/account-menu'
import CategoryButtonList from '@/components/home/@sidebar/category-button-list'
import SearchInput from '@/components/home/@sidebar/search-input'
import { getServerSession } from 'next-auth'

export default async function Sidebar() {
  const session = await getServerSession(options)

  return (
    <div className="flex flex-col gap-4 p-2">
      <SearchInput />
      {!!session && (
        <div className="max-lg:hidden">
          <AccountMenu />
        </div>
      )}
      <div>
        <CategoryButtonList />
      </div>
    </div>
  )
}
