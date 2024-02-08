'use server'

import { action, authAction } from '@/lib/safe-action'
import { type ThreadDetail } from '@/types/threads'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const getThreadDetail = action(
  z.object({ threadId: z.string() }),
  async ({ threadId }, { baseApiUrl }) => {
    const {
      data: { detailThread },
    }: { data: { detailThread: ThreadDetail } } = await fetch(
      `${baseApiUrl}/threads/${threadId}`,
      { cache: 'no-store', next: { tags: [`getDetailThread-${threadId}`] } }
    ).then(async (res) => await res.json())

    return detailThread
  }
)

export const getThreadActionData = action(
  z.object({ threadId: z.string() }),
  async ({ threadId }, { baseApiUrl }) => {
    const {
      data: { detailThread },
    }: { data: { detailThread: ThreadDetail } } = await fetch(
      `${baseApiUrl}/threads/${threadId}`,
      { cache: 'no-store', next: { tags: [`getThreadActionData-${threadId}`] } }
    ).then(async (res) => await res.json())

    return {
      id: detailThread.id,
      upVotesBy: detailThread.upVotesBy,
      downVotesBy: detailThread.downVotesBy,
      comments: detailThread.comments,
    }
  }
)

export const voteThread = authAction(
  z.object({
    threadId: z.string(),
    voteType: z.enum(['up-vote', 'down-vote', 'neutral-vote']),
  }),
  async ({ threadId, voteType }, { baseApiUrl, session }) => {
    await fetch(`${baseApiUrl}/threads/${threadId}/${voteType}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.user.token}` },
      cache: 'no-store',
    })
    revalidateTag(`getThreadActionData-${threadId}`)
  }
)

export const getThreadComments = action(
  z.object({ threadId: z.string() }),
  async ({ threadId }, { baseApiUrl }) => {
    const {
      data: { detailThread },
    }: { data: { detailThread: ThreadDetail } } = await fetch(
      `${baseApiUrl}/threads/${threadId}`,
      { cache: 'no-store', next: { tags: [`getThreadComments-${threadId}`] } }
    ).then(async (res) => await res.json())

    return detailThread.comments
  }
)

export const getThreadCommentActionData = action(
  z.object({ threadId: z.string(), commentId: z.string() }),
  async ({ threadId, commentId }, { baseApiUrl }) => {
    const {
      data: { detailThread },
    }: { data: { detailThread: ThreadDetail } } = await fetch(
      `${baseApiUrl}/threads/${threadId}`,
      {
        cache: 'no-store',
        next: { tags: [`getThreadCommentActionData-${threadId}-${commentId}`] },
      }
    ).then(async (res) => await res.json())

    const comment = detailThread.comments.find(
      (comment) => comment.id === commentId
    )

    if (!comment) throw new Error('Comment not found')

    return {
      id: comment.id,
      upVotesBy: comment.upVotesBy,
      downVotesBy: comment.downVotesBy,
    }
  }
)

export const voteThreadComment = authAction(
  z.object({
    threadId: z.string(),
    commentId: z.string(),
    voteType: z.enum(['up-vote', 'down-vote', 'neutral-vote']),
  }),
  async ({ threadId, commentId, voteType }, { baseApiUrl, session }) => {
    await fetch(
      `${baseApiUrl}/threads/${threadId}/comments/${commentId}/${voteType}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.user.token}` },
        cache: 'no-store',
      }
    )
    revalidateTag(`getThreadCommentActionData-${threadId}-${commentId}`)
  }
)
