import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex size-full items-center justify-center p-16">
      <Loader className="animate-spin" />
    </div>
  )
}
