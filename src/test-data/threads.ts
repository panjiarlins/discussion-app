import { type Threads } from '@/types/threads'

const threads: {
  data: { status: string; message: string; data: { threads: Threads } }
} = {
  data: {
    status: 'success',
    message: 'ok',
    data: {
      threads: [
        {
          id: 'thread-1',
          title: 'First Thread',
          body: 'This is the first thread',
          category: 'category-1',
          createdAt: '2023-06-21T07:00:00.000Z',
          ownerId: 'john_doe',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Second Thread',
          body: 'This is the second thread',
          category: 'category-2',
          createdAt: '2023-06-21T07:00:00.000Z',
          ownerId: 'jane_doe',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    },
  },
}

export default threads
