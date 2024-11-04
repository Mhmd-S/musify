'use client'

import { useAuth } from '@contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Spinner from '@components/Spinner'

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard') // or whatever your main protected route is
      router.refresh()
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return <Spinner /> // Or your loading component
  }

  return !user ? children : null
} 