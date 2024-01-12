"use client"
import {QueryClientProvider , QueryClient} from '@tanstack/react-query'
import { ReactComponentElement } from 'react'

function QueryProvider({children}:any) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider