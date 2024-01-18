'use client'

import { cn } from '@/lib/utils'
import { type ComponentProps } from 'react'
import ReduxLoadingBar from 'react-redux-loading-bar'

export default function LoadingBar(
  props: ComponentProps<typeof ReduxLoadingBar>
) {
  return (
    <ReduxLoadingBar
      {...props}
      className={cn('absolute h-1 bg-primary', props.className)}
    />
  )
}
