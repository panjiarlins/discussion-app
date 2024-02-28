import { type Users } from '@/types/users'

const users: {
  data: { status: string; message: string; data: { users: Users } }
} = {
  data: {
    status: 'success',
    message: 'ok',
    data: {
      users: [
        {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        {
          id: 'jane_doe',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        {
          id: 'fulan',
          name: 'Si Fulan',
          email: 'fulan@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      ],
    },
  },
}

export default users
