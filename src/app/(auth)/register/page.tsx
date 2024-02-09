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
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { register } from '@/utils/auth'

const TOAST_ID = 'register'

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

  const { execute } = useAction(register, {
    onExecute: () => {
      toast.loading('Loading....', {
        duration: Infinity,
        dismissible: true,
        id: TOAST_ID,
      })
    },
    onError: (error) => {
      toast.error(error.fetchError ?? error.serverError ?? 'Error!', {
        id: TOAST_ID,
        duration: 4000,
      })
    },
    onSuccess: () => {
      toast.success('Registration successful!', {
        id: TOAST_ID,
        duration: 4000,
      })
      form.reset()
      router.push('/login')
    },
  })

  return (
    <section className="w-full max-w-md">
      <p className="pb-6 text-4xl font-extrabold">Join Today.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(execute)} className="space-y-4">
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
