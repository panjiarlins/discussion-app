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
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import xss from 'xss'
import { useAppDispatch } from '@/store/hooks'
import { createThread } from '@/store/threadsSlice'
import LoadingBar from '@/components/ui/loading-bar'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

function getPlainText(richText: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(richText, 'text/html')
  const plainText = doc.body.textContent
  return plainText
}

const formSchema = z.object({
  title: z.string().min(1),
  category: z.string(),
  body: z.string().refine(
    (val) => {
      const plainText = getPlainText(val)
      const result = z
        .string()
        .min(10)
        .safeParse(plainText?.trim())
      return result.success
    },
    { message: 'Text is too short' }
  ),
})

export default function NewThreadInput() {
  const { data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const ReactQuill = useMemo(
    () =>
      dynamic(async () => await import('react-quill'), {
        ssr: false,
        loading: () => (
          <div className="space-y-1">
            <Skeleton className="w-full h-8 rounded-none" />
            <Skeleton className="w-full h-12 rounded-none" />
          </div>
        ),
      }),
    []
  )

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', category: '', body: '<p><br></p>' },
  })

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const { type } = await dispatch(
        createThread({
          title: values.title,
          category: values.category ? values.category : undefined,
          body: xss(values.body),
          searchParams,
        })
      )
      if (type.endsWith('fulfilled')) form.reset()
    },
    [dispatch, form, searchParams]
  )

  return (
    <Card className="relative rounded-none">
      <LoadingBar scope="threads/createThread" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-normal">Create a thread</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="sm:flex-1">
                    <FormControl>
                      <Input
                        required
                        placeholder="Title"
                        type="text"
                        className="w-full rounded-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="sm:w-[25%]">
                    <FormControl>
                      <Input
                        placeholder="Category"
                        type="text"
                        className="w-full rounded-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ReactQuill
                      className={`
                        [&_.ql-toolbar]:!border
                        [&_.ql-toolbar]:!border-input
                        [&_.ql-toolbar]:!bg-background
                        [&_.ql-toolbar]:!ring-offset-background
                        [&_.ql-container]:!border
                        [&_.ql-container]:!border-input
                        [&_.ql-container]:!bg-background
                        [&_.ql-container]:!ring-offset-background
                        [&_.ql-blank]:before:!text-muted-foreground
                      `}
                      placeholder="What is happening?!"
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
                {form.formState.isSubmitting ? 'Posting....' : 'Post'}
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
