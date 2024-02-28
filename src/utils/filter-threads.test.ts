import { type Threads } from '@/types/threads'
import filterThreads from './filter-threads'

/**
 * test scenarios for the filterThreads function
 * - should filter threads by search query
 * - should filter threads by category
 * - should filter threads by both search query and category
 */
describe('filterThreads function', () => {
  const threads: Threads = [
    {
      id: '1',
      title: 'Thread 1',
      body: 'Body 1',
      category: 'Category 1',
      createdAt: '',
      ownerId: '',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
    {
      id: '2',
      title: 'Thread 2',
      body: 'Body 2',
      category: 'Category 1',
      createdAt: '',
      ownerId: '',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
    {
      id: '3',
      title: 'Thread 3',
      body: 'Body 3',
      category: 'Category 2',
      createdAt: '',
      ownerId: '',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
    {
      id: '4',
      title: 'Thread 4',
      body: 'Body 4',
      category: 'Category 2',
      createdAt: '',
      ownerId: '',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ]

  it('should filter threads by search query', () => {
    const searchParams = new URLSearchParams('q=thread')
    const filteredThreads = filterThreads(threads, searchParams)
    expect(filteredThreads).toEqual(threads)
  })

  it('should filter threads by category', () => {
    const searchParams = new URLSearchParams('category=Category 2')
    const filteredThreads = filterThreads(threads, searchParams)
    expect(filteredThreads).toEqual(threads.slice(2, 4))
  })

  it('should filter threads by both search query and category', () => {
    const searchParams = new URLSearchParams('q=1&category=Category 1')
    const filteredThreads = filterThreads(threads, searchParams)
    expect(filteredThreads).toEqual(threads.slice(0, 2))
  })
})
