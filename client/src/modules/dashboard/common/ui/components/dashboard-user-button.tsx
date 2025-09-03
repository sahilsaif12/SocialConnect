import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { apiRequest } from "@/lib/api"
import { useStore } from "@/store/useStore"
import { ChevronUpIcon, LogOut, UserPen, UserRound } from "lucide-react"
import {  useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { LoaderSpinner } from "@/components/Loader"
import { ProfileEditDialog } from "@/modules/dashboard/profile/ui/components/profile-edit-dialog"


export const DashboardUserButton = () => {
    const {userData:data}=useStore()
    const router = useRouter()

    const [logoutLoading, setlogoutLoading] = useState<boolean>(false)
    const [isOpen, setisOpen] = useState<boolean>(false)
    const [isProfileEditDialogOpen, setIsProfileEditDialogOpen] = useState<boolean>(false);

    const onLogout =async () => {
        setlogoutLoading(true)
        try {
                    await apiRequest("/auth/logout/", {
                        method: "POST",
                    },true);
        
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');
                    router.push("/sign-in")
                } catch (err) { } 
        setlogoutLoading(false)
     }
   
    return (
        <>
        <DropdownMenu  open={isOpen} onOpenChange={setisOpen}  >
            
            <DropdownMenuTrigger className="flex items-center justify-between rounded-xl shadow-2xl shadow-stone-500  cursor-pointer  border border-border/30 p-3 gap-3 w-full bg-white/30 hover:bg-white/35 ">
                {!data?.avatar_url ? (
                    <Avatar className="size-12" >
                        <AvatarImage src={data?.avatar_url} alt={data?.user.first_name || "User Avatar"} />
                    </Avatar>
                ) : 
                <div className="bg-amber-600 text-white p-3 rounded-full">
                    <UserRound />
                </div> 
                }

                <div className="flex flex-col flex-1 text-left gap-0.5 min-w-0 overflow-hidden text-black">
                    <p className="text-md font-bold tracking-wide text-gray-950 truncate w-full">
                        {data?.user.first_name} {' '}  {data?.user.last_name} 
                    </p>
                    <p className="text-sm font-sans truncate text-gray-900   w-full">
                        {data?.user.username}
                    </p>
                </div>
                <ChevronUpIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>

            <DropdownMenuContent  align="end" side="top" className="w-60 bg-white/50 rounded-2xl shadow-2xl ">
                <DropdownMenuLabel>
                    <div className="flex flex-col  gap-1">
                        <span className="font-medium truncate"> {data?.user.first_name} {' '}  {data?.user.last_name}  </span>
                        <span className="font-normal text-sm text-gray-700 truncate">{data?.user.email} </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div   onClick={() =>{
                    setIsProfileEditDialogOpen(true)
                    setisOpen(false)
                } } 
                 className="flex  p-3 py-1 items-center justify-between rounded-lg mb-2 hover:bg-amber-50   cursor-pointer">
                    Update profile
                    <UserPen className="size-4" />
                </div>
                <div onClick={onLogout} className="flex p-3 py-1 items-center rounded-lg mb-1 hover:bg-red-400 bg-red-500/40 !important justify-between cursor-pointer">
                    Logout
                    {logoutLoading? 
                    <LoaderSpinner size={18} />
                    :
                    <LogOut className="size-4" />
                }
                </div>

            </DropdownMenuContent>
        </DropdownMenu>

         <ProfileEditDialog
                open={isProfileEditDialogOpen}
                onOpenChange={setIsProfileEditDialogOpen}
              />
        
        </>
    )
}