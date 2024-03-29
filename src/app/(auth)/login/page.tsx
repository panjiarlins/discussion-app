'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useCallback } from 'react'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const toastId = toast.loading('Loading....', {
        duration: Infinity,
        dismissible: true,
      })
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      })
      if (!result?.ok) {
        toast.error(result?.error ?? 'Error!', { id: toastId, duration: 4000 })
      } else {
        form.reset()
        toast.success('Login Successful!', { id: toastId, duration: 4000 })
        window.location.reload()
      }
    },
    [form]
  )

  return (
    <section className="w-full max-w-md">
      <p className="pb-6 text-4xl font-extrabold">Join Today.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    type="email"
                    className="rounded-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    className="rounded-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full rounded-full font-semibold">
            Log in
          </Button>
        </form>
      </Form>
      <div className="mt-16 space-y-4">
        <div className="text-xl font-bold">Don&apos;t have an account?</div>
        <Button className="w-full rounded-full font-semibold" asChild>
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
    </section>
  )
}
