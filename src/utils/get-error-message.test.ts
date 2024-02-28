import { AxiosError, AxiosHeaders } from 'axios'
import getErrorMessage from './get-error-message'

/**
 * test scenarios for the getErrorMessage function
 * - should return error message from AxiosError
 * - should return error message from generic error
 */
describe('getErrorMessage function', () => {
  it('should return error message from AxiosError', async () => {
    const error = new AxiosError(undefined, undefined, undefined, undefined, {
      data: { message: 'Test error' },
      config: { headers: new AxiosHeaders() },
      headers: {},
      status: 500,
      statusText: 'Internal Server Error',
    })
    const errorMessage = await getErrorMessage(error)
    expect(errorMessage).toEqual('Test error')
  })

  it('should return error message from generic error', async () => {
    const error = new Error('Test error')
    const errorMessage = await getErrorMessage(error)
    expect(errorMessage).toEqual('Test error')
  })
})
