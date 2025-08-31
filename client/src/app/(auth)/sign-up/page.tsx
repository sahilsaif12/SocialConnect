import { requireNoAuth } from '@/lib/auth'
import { SignUpView } from '@/modules/auth/ui/views/sign-up-view'

import React from 'react'

const page=async()=> {
   await requireNoAuth()
   
  return (
    <SignUpView />
  )
}

export default page