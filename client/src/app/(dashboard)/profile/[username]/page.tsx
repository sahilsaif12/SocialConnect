import { apiRequest } from "@/lib/api"
import { requireAuth } from "@/lib/auth"
import { Profile } from "@/modules/auth/types"
import { ProfileView } from "@/modules/dashboard/profile/ui/views/profile-view"

interface ProfilePageProps {
  params: {
    username: string
  }
}

 const page=async({ params }: ProfilePageProps)=> {
   const { username } =await params
  const userProfile:Profile=await apiRequest(`/users/${username}`, {
            method: "GET",
        },true)
  return (
    <ProfileView profile={userProfile} />
  )
}

export default page