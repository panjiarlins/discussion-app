'use server'

import { action } from '@/lib/safe-action'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getErrorMessage } from './error-handler'

export const register = action(
  z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  async ({ name, email, password }, { baseApiUrl }) => {
    const res = await fetch(`${baseApiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(await getErrorMessage(res))
    revalidatePath('/', 'layout')
  }
)
