import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { DashboardNavbar } from '@/modules/dashboard/ui/components/dashboard-navbar'
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar'
import React from 'react'

interface Props {
  children: React.ReactNode
}
function layout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className='flex flex-col bg- h-screen w-screen'>
        <DashboardNavbar />
        <Toaster />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout