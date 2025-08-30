// import { GeneratedAvatar } from "@/components/generated-avatar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
// import { authClient } from "@/lib/auth-client"
import { ChevronDownIcon, ChevronUpIcon, CreditCard, LogOut, UserPen, UserRound } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"


export const DashboardUserButton = () => {
    // const { data, isPending } = authClient.useSession()
    const isMobile = useIsMobile()

    // const onLogout = () => {
    //     authClient.signOut({
    //         fetchOptions: {
    //             onSuccess: () => redirect('/sign-in')
    //         }
    //     })
    // }
    const data = {
        bio: "Passionate software developer with a knack for creating innovative solutions. Always seeking new challenges.",
        avatar_url: "https://nhkrzdzkbzxcgmxnzgqc.supabase.co/storage/v1/object/public/avatars/avatars/user_14/resume.png?",
        website: "",
        location: "",
        visibility: "private",
        user: {
            id: 14,
            username: "sahil32_",
            email: "sahilsaif2002@gmail.com",
            first_name: "",
            last_name: "",
            date_joined: "2025-08-28T14:34:39.402742Z",
            last_login_at: "2025-08-30T10:47:14.982558Z",
            is_active: true
        },
        followers_count: 0,
        following_count: 0,
        posts_count: 0
    };

    const onLogout = () => { }
    // if (isPending || !data?.user) return null

    if (isMobile) {

        return (
            <Drawer>
                <DrawerTrigger className="flex items-center justify-between rounded-lg border border-border/10 p-3 gap-3 w-full bg-white/5 hover:bg-white/10 ">
                    {data.avatar_url ? (
                        <Avatar className="size-12" >
                            <AvatarImage src={data.avatar_url} alt={data.user.first_name || "User Avatar"} />
                        </Avatar>
                    ) : <></>}

                    <div className="flex flex-col flex-1 text-left gap-0.5 min-w-0 overflow-hidden">
                        <p className="text-sm truncate w-full">
                            {data.user.first_name} {' '}  {data.user.last_name}
                        </p>
                        <p className="text-sm truncate   w-full">
                            {data.user.username}
                        </p>
                    </div>
                    <ChevronDownIcon className="size-4 shrink-0" />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle> {data.user.first_name} {' '}  {data.user.last_name} </DrawerTitle>
                        <DrawerDescription >{data.user.email} </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button variant="outline" onClick={() => { }}  >
                            Billing
                            <CreditCard className="size-4 text-black mx-2" />
                        </Button>
                        <Button onClick={onLogout} >
                            Logout
                            <LogOut className="size-4 text-black mx-2" />
                        </Button>

                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        )
    }
    return (

        <DropdownMenu >
            
            <DropdownMenuTrigger className="flex items-center justify-between rounded-xl shadow-2xl shadow-stone-500  cursor-pointer  border border-border/30 p-3 gap-3 w-full bg-white/30 hover:bg-white/35 ">
                {!data.avatar_url ? (
                    <Avatar className="size-12" >
                        <AvatarImage src={data.avatar_url} alt={data.user.first_name || "User Avatar"} />
                    </Avatar>
                ) : 
                <div className="bg-amber-600 text-white p-3 rounded-full">
                    <UserRound />
                </div> 
                }

                <div className="flex flex-col flex-1 text-left gap-0.5 min-w-0 overflow-hidden text-black">
                    <p className="text-md font-bold tracking-wider text-gray-950 truncate w-full">
                        {data.user.first_name} {' '}  {data.user.last_name} sahil saif
                    </p>
                    <p className="text-sm font-sans truncate text-gray-900   w-full">
                        {data.user.username}
                    </p>
                </div>
                <ChevronUpIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="top" className="w-60 bg-white/50 rounded-2xl shadow-2xl ">
                <DropdownMenuLabel>
                    <div className="flex flex-col  gap-1">
                        <span className="font-medium truncate"> {data.user.first_name} {' '}  {data.user.last_name} sahil saif </span>
                        <span className="font-normal text-sm text-muted-foreground truncate">{data.user.email} </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex  p-2 py-1 items-center justify-between rounded-lg mb-2 hover:bg-amber-50   cursor-pointer">
                    Update profile
                    <UserPen className="size-4" />
                </div>
                <div onClick={onLogout} className="flex p-2 py-1 items-center rounded-lg mb-1 hover:bg-red-400 bg-red-500/40 !important justify-between cursor-pointer">
                    Logout
                    <LogOut className="size-4" />
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}