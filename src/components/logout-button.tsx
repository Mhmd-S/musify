'use client'

import { useAuth } from '@contexts/auth-context'
import { Button } from '@components/ui/button'

export function LogoutButton() {
  const { logout } = useAuth()

  return (
    <Button 
      onClick={logout}
      variant="ghost"
    >
      Logout
    </Button>
  )
} 