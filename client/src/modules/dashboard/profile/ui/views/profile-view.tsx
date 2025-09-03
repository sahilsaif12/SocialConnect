"use client"
import { Profile } from "@/modules/auth/types"
import { useStore } from "@/store/useStore"
import { useEffect } from "react"
import { ProfileHeaderView } from "./profile-header-view"
import { ProfileInfoView } from "./profile-info-view"
import { ProfileTabsView } from "./profile-tabs-view"
import { PostView } from "./post-view"

interface ProfileViewProps{
    profile: Profile 
}
export const ProfileView=({profile}:ProfileViewProps)=>{
const {setCurrentProfile}=useStore()
useEffect(() => {
  setCurrentProfile(profile)
}, [])

    return(
        <div>
{/* 
            hello {profile.user.first_name} {' '} {profile.user.last_name}
            <p>{profile.user.email} | {profile.user.username} </p>
 */}

      <div className="max-w-2xl mx-auto relative    bg-transparent border- border-gray-800  min-h-screen">
        <ProfileHeaderView  />
        <ProfileInfoView />
        {/* <ProfileTabsView /> */}
        <div>
          {/* <PostView />
          <PostView />
          <PostView />
          <PostView />
          <PostView />
          <PostView /> */}
        </div>
      </div>
        </div>
    )
}