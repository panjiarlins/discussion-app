'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import LoadingBar from '@/components/ui/loading-bar'
import { Skeleton } from '@/components/ui/skeleton'
import api from '@/lib/api'
import { useAppDispatch } from '@/store/hooks'
import getErrorMessage from '@/utils/get-error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from 'sonner'
import { z } from 'zod'
import 'react-quill/dist/quill.snow.css'
import { useSession } from 'next-auth/react'

function getPlainText(richText: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(richText, 'text/html')
  const plainText = doc.body.textContent
  return plainText
}

const formSchema = z.object({
  content: z.string().refine(
    (val) => {
      const plainText = getPlainText(val)
      const result = z.string().min(1).safeParse(plainText?.trim())
      return result.success
    },
    { message: 'Text is too short' }
  ),
})

export default function NewCommentInput({
  params: { threadId },
}: {
  params: { threadId: string }
}) {
  const { data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const ReactQuill = useMemo(
    () =>
      dynamic(async () => await import('react-quill'), {
        ssr: false,
        loading: () => (
          <div className="space-y-1">
            <Skeleton className="h-8 w-full rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
          </div>
        ),
      }),
    []
  )

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: { content: '<p><br></p>' },
  })

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        dispatch(showLoading(`threads/${threadId}/createComment`))
        await api.post(
          `/threads/${threadId}/comments`,
          { content: values.content },
          { headers: { Authorization: `Bearer ${data?.user.token}` } }
        )
        form.reset()
        router.refresh()
      } catch (error) {
        toast.error(await getErrorMessage(error))
      } finally {
        dispatch(hideLoading(`threads/${threadId}/createComment`))
      }
    },
    [dispatch, form, router, threadId, data?.user.token]
  )

  return (
    <Card className="relative rounded-none">
      <LoadingBar scope={`threads/${threadId}/createComment`} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Leave a comment</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ReactQuill
                      className={`
                        [&_.ql-blank]:before:!text-muted-foreground
                        [&_.ql-container]:!border
                        [&_.ql-container]:!border-input
                        [&_.ql-container]:!bg-background
                        [&_.ql-container]:!ring-offset-background
                        [&_.ql-toolbar]:!border
                        [&_.ql-toolbar]:!border-input
                        [&_.ql-toolbar]:!bg-background
                        [&_.ql-toolbar]:!ring-offset-background
                      `}
                      placeholder="Your comment...."
                      theme="snow"
                      modules={{
                        toolbar: [
                          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                          ['image'],
                          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                          ['clean'], // remove formatting button
                        ],
                      }}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-row justify-end">
            {data?.user ? (
              <Button
                type="submit"
                className="rounded-full"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {form.formState.isSubmitting ? 'Sending....' : 'Send'}
              </Button>
            ) : (
              <Button
                type="button"
                className="rounded-full"
                onClick={() => {
                  router.push('/login')
                }}
              >
                Login
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
