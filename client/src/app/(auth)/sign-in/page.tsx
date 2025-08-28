import { SignInView } from '@/modules/auth/ui/views/sign-in-view'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page=async()=> {
   
  return (
    <SignInView />
  )
}

export default page