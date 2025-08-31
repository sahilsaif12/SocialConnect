import { requireNoAuth } from '@/lib/auth'
import { SignInView } from '@/modules/auth/ui/views/sign-in-view'
import { cookies } from 'next/headers'
import React from 'react'

const page=async()=> {

  
let tem=await requireNoAuth()
console.log("tem",tem);

  return (
    <SignInView />
  )
}

export default page