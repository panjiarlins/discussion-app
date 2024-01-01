import axios, { AxiosError } from 'axios'
import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email:', type: 'email', placeholder: 'email....' },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'password....',
        },
      },
      async authorize(credentials, req) {
        try {
          const {
            data: {
              data: { token },
            },
          } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/login`, {
            email: credentials?.email,
            password: credentials?.password,
          })

          const {
            data: {
              data: { user },
            },
          } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatar,
            token,
          }
        } catch (error: any) {
          const message: string | undefined =
            error instanceof AxiosError
              ? error.response?.data?.message
              : JSON.stringify(error)

          throw new Error(message)
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.token = token.token
      return session
    },
  },
}
