'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function HeaderMenuButton({
  children,
  tooltip,
  text,
  boldOnPath = '',
}: {
  children: React.ReactElement<SVGSVGElement>
  tooltip: React.ReactNode
  text: string
  boldOnPath?: string
}) {
  const pathname = usePathname()
  const isBold = useMemo(
    () => pathname.startsWith(boldOnPath),
    [pathname, boldOnPath]
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            size="icon"
            variant="ghost"
            className={cn(
              'flex flex-row gap-4 rounded-full xl:size-auto xl:py-2 xl:px-4 [&>svg]:size-8 [&>svg]:text-primary',
              isBold
                ? '[&>svg]:stroke-2 [&>span]:font-extrabold'
                : '[&>svg]:stroke-1 [&>span]:font-medium'
            )}
          >
            <Link href={boldOnPath}>
              {children}
              <span className="text-xl max-xl:hidden">{text}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
