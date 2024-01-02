import { handleAPIError } from '@/utils/error-handler'
import axios from 'axios'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const postSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const { name, email, password } = postSchema.parse(await request.json())
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API}/register`,
      { name, email, password }
    )
    return NextResponse.json(data, { status })
  } catch (error: any) {
    return handleAPIError(error)
  }
}
