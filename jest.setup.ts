import '@testing-library/jest-dom'
import newThread from '@/test-data/newThread'
import threads from '@/test-data/threads'
import users from '@/test-data/users'
import {
  downVoteResponse,
  upVoteData,
  upVoteResponse,
} from '@/test-data/voteThread'

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

// create mock API
jest.mock('./src/lib/api', () => ({
  ...jest.requireActual('./src/lib/api'),
  get: jest.fn(async (url: string) => {
    if (url === '/users') return await Promise.resolve(users)
    if (url === '/threads') return await Promise.resolve(threads)
    return await Promise.reject(new Error('error'))
  }),
  post: jest.fn(
    async (
      url: string,
      data: { title: string; body: string; category: string }
    ) => {
      if (url === '/threads') {
        const thread: typeof newThread = JSON.parse(JSON.stringify(newThread))
        thread.data.data.thread = { ...thread.data.data.thread, ...data }
        return await Promise.resolve(thread)
      }
      if (url === `/threads/${upVoteData.threadId}/up-vote`)
        return await Promise.resolve(upVoteResponse)
      if (url === `/threads/${upVoteData.threadId}/down-vote`)
        return await Promise.resolve(downVoteResponse)
      return await Promise.reject(new Error('error'))
    }
  ),
}))

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: { user: { id: users.data.data.users[0].id, token: 'token' } },
  })),
  getSession: jest.fn(() => ({
    user: { id: users.data.data.users[0].id, token: 'token' },
  })),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))
