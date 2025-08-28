import { SignUpView } from '@/modules/auth/ui/views/sign-up-view'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page=async()=> {
   
  return (
    <SignUpView />
  )
}

export default page