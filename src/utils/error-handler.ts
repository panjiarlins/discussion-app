import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export async function getErrorMessage(error: any) {
  if (error instanceof AxiosError)
    return (error.response?.data?.message as string) ?? JSON.stringify(error)
  if (error instanceof Response) {
    const err = await error.json()
    return (err?.message as string) ?? 'Error!'
  }
  return (error?.message as string) ?? 'Error!'
}

export function handleAPIError(error: any) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: fromZodError(error).message },
      { status: 400 }
    )
  }

  if (error instanceof AxiosError) {
    return NextResponse.json(
      { message: error.response?.data?.message ?? JSON.stringify(error) },
      { status: error.response?.status ?? 500 }
    )
  }

  return NextResponse.json(
    { message: error?.message ?? 'Error!' },
    { status: 500 }
  )
}
