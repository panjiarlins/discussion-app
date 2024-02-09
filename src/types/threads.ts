import { type Users } from './users'

export type Threads = Array<{
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  ownerId: string
  upVotesBy: string[]
  downVotesBy: string[]
  totalComments: number
  owner?: Users[number]
}>

export interface ThreadDetail {
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  owner: {
    id: string
    name: string
    avatar: string
  }
  upVotesBy: string[]
  downVotesBy: string[]
  comments: Array<{
    id: string
    content: string
    createdAt: string
    owner: {
      id: string
      name: string
      avatar: string
    }
    upVotesBy: string[]
    downVotesBy: string[]
  }>
}

export interface ThreadVote {
  id: string
  userId: string
  threadId: string
  voteType: 1 | 0 | -1
}
