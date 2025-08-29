import Image from 'next/image';
import React from 'react'
interface Props {
    height?: string | number
}
function LogoBannerCard({height}: Props) {
    const style = {
    minHeight: `${height}vh`
  };

    return (
        <div style={style} className={`bg-yellow-400  p-2  hidden md:flex flex-col gap-y-4 justify-center items-center`}>
            <Image src="/logo.svg" alt="logo" width={92} height={92} className="w-[92px] h-[92px] rounded-full object-cover" />
            <p className="text-2xl text-white font-semibold tracking-wider" >SocialConnect</p>
        </div>
    )
}

export default LogoBannerCard