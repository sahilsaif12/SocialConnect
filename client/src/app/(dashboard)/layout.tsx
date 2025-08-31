import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { requireAuth } from '@/lib/auth'
import { Profile } from '@/modules/auth/types'
import { DashboardNavbar } from '@/modules/dashboard/common/ui/components/dashboard-navbar'
import { DashboardSidebar } from '@/modules/dashboard/common/ui/components/dashboard-sidebar'
import React from 'react'

interface Props {
  children: React.ReactNode
  
}
async function layout({ children }: Props) {
    let user =  await requireAuth()
  
  return (
    <SidebarProvider>
      <DashboardSidebar user={user as Profile} />
      <main className='flex flex-col bg- h-screen w-screen'>
        <DashboardNavbar />
        <Toaster />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout