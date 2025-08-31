"use client"
import { Profile } from "@/modules/auth/types"
import { useStore } from "@/store/useStore"
import { useEffect } from "react"

interface HomeViewProps{
    user: Profile 
}
export const HomeView=({user}:HomeViewProps)=>{
const {setUser}=useStore()
useEffect(() => {
    setUser(user)
}, [])

    return(
        <div>
            hello my world
        </div>
    )
}