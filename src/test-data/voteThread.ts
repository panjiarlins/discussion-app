import { type Threads, type ThreadVote } from '@/types/threads'
import allThreads from './allThreads'
import users from './users'

export const upVoteData = {
  voteId: 'vote-1',
  voteType: 1 as ThreadVote['voteType'],
  threadIndex: 0,
  threadId: allThreads[0].id,
  userId: users.data.data.users[0].id,
  threadResult: {
    ...allThreads[0],
    upVotesBy: [...allThreads[0].upVotesBy, users.data.data.users[0].id],
  } satisfies Threads[number],
}

export const upVoteResponse: {
  data: { status: string; message: string; data: { vote: ThreadVote } }
} = {
  data: {
    status: 'success',
    message: 'Thread upvoted',
    data: {
      vote: {
        id: upVoteData.voteId,
        userId: upVoteData.userId,
        threadId: upVoteData.threadId,
        voteType: upVoteData.voteType,
      },
    },
  },
}

export const downVoteData = {
  voteId: 'vote-2',
  voteType: -1 as ThreadVote['voteType'],
  threadIndex: 0,
  threadId: allThreads[0].id,
  userId: users.data.data.users[0].id,
  threadResult: {
    ...allThreads[0],
    downVotesBy: [...allThreads[0].downVotesBy, users.data.data.users[0].id],
  } satisfies Threads[number],
}

export const downVoteResponse: {
  data: { status: string; message: string; data: { vote: ThreadVote } }
} = {
  data: {
    status: 'success',
    message: 'Thread downvoted',
    data: {
      vote: {
        id: downVoteData.voteId,
        userId: downVoteData.userId,
        threadId: downVoteData.threadId,
        voteType: downVoteData.voteType,
      },
    },
  },
}
