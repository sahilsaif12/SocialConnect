import React from 'react'
interface Props {
    height?: string | number
}
function LogoBannerCard({height}: Props) {
    return (
        <div className={`bg-yellow-400 min-h-[${height}vh]  hidden md:flex flex-col gap-y-4 justify-center items-center`}>
            <img src="/logo.svg" alt="logo" className="w-[92px] h-[92px] rounded-full object-cover" />
            <p className="text-2xl text-white font-semibold tracking-wider" >SocialConnect</p>
        </div>
    )
}

export default LogoBannerCard