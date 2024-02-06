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
  href = '',
  onClick,
}: {
  children: React.ReactElement<SVGSVGElement>
  tooltip: React.ReactNode
  text: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  const pathname = usePathname()
  const isBold = useMemo(
    () => (href ? pathname.startsWith(href) : false),
    [pathname, href]
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild={!onClick}
            onClick={onClick}
            size="icon"
            variant="ghost"
            className={cn(
              'flex flex-row gap-4 rounded-full xl:size-auto xl:py-2 xl:px-4',
              isBold
                ? '[&>svg]:stroke-2 [&>span]:font-extrabold'
                : '[&>svg]:stroke-1 [&>span]:font-medium'
            )}
          >
            {onClick ? (
              <>
                {children}
                <span className="text-xl max-xl:hidden">{text}</span>
              </>
            ) : (
              <Link href={href}>
                {children}
                <span className="text-xl max-xl:hidden">{text}</span>
              </Link>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="xl:hidden">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
