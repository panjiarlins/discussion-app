import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

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

export default function getErrorMessage(error: any): string {
  if (error instanceof AxiosError)
    return error.response?.data?.message ?? JSON.stringify(error)
  return error?.message ?? 'Error!'
}
