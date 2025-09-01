"use client"
import { setClientCookie } from '@/lib/api';
import { Profile } from '@/modules/auth/types';
import { useStore } from '@/store/useStore';
import { useEffect } from 'react'

interface DetailsSaverProps {
  user: Profile  & {
  access_token?: string
  refresh_token?: string
}
}
function DetailsSaver({ user }: DetailsSaverProps) {
  const { setUser } = useStore()
  useEffect(() => {
    console.log("user-----", user);
    
    setUser(user)
    if (user.access_token) {
      setClientCookie('access_token',user.access_token)
    }
    if (user.refresh_token) {
      setClientCookie('refresh_token',user.refresh_token)
    }
  }, [])

  return null
}

export default DetailsSaver