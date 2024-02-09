import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center p-16 size-full">
      <Loader className="animate-spin" />
    </div>
  )
}
