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
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export default function Page() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
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
      try {
        await axios.post('/api/auth/register', {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        form.reset()
        router.push('/login')
        toast.success('Registration successful!', {
          id: toastId,
          duration: 4000,
        })
      } catch (error: any) {
        toast.error(
          (error.response?.data?.message as string) ??
            (error?.message as string) ??
            'Error!',
          {
            id: toastId,
            duration: 4000,
          }
        )
      }
    },
    [form, router]
  )

  return (
    <section className="w-full max-w-md">
      <p className="pb-6 text-4xl font-extrabold">Join Today.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    type="text"
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
          <Button type="submit" className="w-full font-semibold rounded-full">
            Create account
          </Button>
        </form>
      </Form>
      <div className="mt-16 space-y-4">
        <div className="text-xl font-bold">Already have an account?</div>
        <Button className="w-full font-semibold rounded-full" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </section>
  )
}
