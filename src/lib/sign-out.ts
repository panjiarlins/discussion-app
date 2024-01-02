import { signOut as nextAuthSignOut } from 'next-auth/react'
import { toast } from 'sonner'

export default async function signOut() {
  const toastId = toast.loading('Loading....', {
    duration: Infinity,
    dismissible: true,
  })
  try {
    await nextAuthSignOut()
    toast.success('Logout Success!', { id: toastId, duration: 4000 })
  } catch (error: any) {
    toast.error((error?.message as string) ?? 'Error!', {
      id: toastId,
      duration: 4000,
    })
  }
}
