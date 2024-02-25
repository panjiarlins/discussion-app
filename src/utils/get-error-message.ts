import { AxiosError } from 'axios'

/**
 * Retrieves the error message from the given error object, handling different error types.
 *
 * @param {any} error - The error object from which to retrieve the error message
 * @return {Promise<string>} The error message obtained from the error object
 */
export default async function getErrorMessage(error: any): Promise<string> {
  if (error instanceof AxiosError)
    return (error.response?.data?.message as string) ?? JSON.stringify(error)
  if (typeof Response !== 'undefined' && error instanceof Response) {
    const err = await error.json()
    return (err?.message as string) ?? 'Error!'
  }
  return (error?.message as string) ?? 'Error!'
}
