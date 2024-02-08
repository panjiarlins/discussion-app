import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'

export const action = createSafeActionClient({
  middleware: async () => {
    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API
    if (!baseApiUrl) throw new Error('Base API URL not found!')

    return { baseApiUrl }
  },
})

export const authAction = createSafeActionClient({
  middleware: async () => {
    const session = await getServerSession(options)
    if (!session) throw new Error('Session not found!')

    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API
    if (!baseApiUrl) throw new Error('Base API URL not found!')

    return { baseApiUrl, session }
  },
})
