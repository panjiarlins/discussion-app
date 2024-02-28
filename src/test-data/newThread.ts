import { type Threads } from '@/types/threads'
import users from './users'

const newThread: {
  data: { status: string; message: string; data: { thread: Threads[number] } }
} = {
  data: {
    status: 'success',
    message: 'Thread created',
    data: {
      thread: {
        id: 'new-thread-id',
        title: 'new-thread-title',
        body: 'new-thread-body',
        category: 'new-thread-category',
        createdAt: '2024-02-28T07:00:00.000Z',
        ownerId: users.data.data.users[0].id,
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
        owner: users.data.data.users[0],
      },
    },
  },
}

export default newThread
