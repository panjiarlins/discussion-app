const threads = {
  data: {
    status: 'success',
    message: 'ok',
    data: {
      threads: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'john_doe',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
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
