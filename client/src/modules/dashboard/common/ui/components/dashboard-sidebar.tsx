"use client"

import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { BellRing, BotIcon, Home, Search, StarIcon, User, VideoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardUserButton } from "./dashboard-user-button"
import { useStore } from "@/store/useStore"
import { Profile } from "@/modules/auth/types"
import { useEffect } from "react"



interface DashboardSidebarProps{
    user: Profile 
}

export const DashboardSidebar = ({user}:DashboardSidebarProps) => {
    const {userData:data,setUser}=useStore()
    
    
    const sections = [
        {
            icon: Home,
            label: "Home",
            href: "/"
        },
        {
            icon: Search,
            label: "Explore",
            href: "/explore"
        },
        {
            icon: User,
            label: "Profile",
            href: `/profile/${data?.user.username}`
        },
        {
            icon: BellRing ,
            label: "Notifications",
            href: "/notifications"
        },
    ]
    const pathname = usePathname()
    
    useEffect(() => {
      setUser(user)
    }, [])
    
    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2" >
                    <Image src="/logo.svg" alt="Meet.ai" width={36} height={36} />
                    <p className="text-2xl text-white font-semibold">SocialConnect</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-60 " />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sections.map((item) => (
                                <SidebarMenuItem key={item.href}  >
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "h-10 p-6 rounded-2xl my-1 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10  from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                                            pathname === item.href && "bg-linear-to-r/oklch via-65% border-[#5D6B68]/10"
                                        )}
                                        isActive={ pathname === item.href}
                                    >
                                        <Link href={item.href}  >
                                            <item.icon className="h-10 w-10 " />
                                            <span className="text-lg font-semibold tracking-wide">
                                                {item.label}
                                            </span>

                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <Separator className="opacity-15 text-[#5D6b68]" />
                </div>
               
            </SidebarContent>
            <SidebarFooter className="">
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}