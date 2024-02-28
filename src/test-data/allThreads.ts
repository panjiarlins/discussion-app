import { type Threads } from '@/types/threads'
import threads from './threads'
import users from './users'

const allThreads: Threads = threads.data.data.threads

allThreads.forEach((thread) => {
  thread.owner = users.data.data.users.find(
    (user) => user.id === thread.ownerId
  )
})

export default allThreads
