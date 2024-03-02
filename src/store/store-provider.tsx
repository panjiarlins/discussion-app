'use client'

import { Provider } from 'react-redux'
import { setupStore } from './store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider store={setupStore()}>{children}</Provider>
}
