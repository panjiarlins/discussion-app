import { options } from '@/app/api/auth/[...nextauth]/options'
import { getErrorMessage } from '@/utils/error-handler'
import { getServerSession } from 'next-auth'
import { createSafeActionClient } from 'next-safe-action'

export const action = createSafeActionClient({
  middleware: async () => {
    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API
    if (!baseApiUrl) throw new Error('Base API URL not found!')
    return { baseApiUrl }
  },
  handleReturnedServerError: async (error) => await getErrorMessage(error),
  handleServerErrorLog: () => {},
})

export const authAction = createSafeActionClient({
  middleware: async () => {
    const session = await getServerSession(options)
    if (!session) throw new Error('Session not found!')

    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API
    if (!baseApiUrl) throw new Error('Base API URL not found!')

    return { baseApiUrl, session }
  },
  handleReturnedServerError: async (error) => await getErrorMessage(error),
  handleServerErrorLog: () => {},
})
