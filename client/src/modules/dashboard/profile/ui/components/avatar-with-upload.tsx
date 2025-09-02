import { LoaderSpinner } from '@/components/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { apiRequest } from '@/lib/api';
import { Profile } from '@/modules/auth/types';
import { useStore } from '@/store/useStore';
import { Camera, ImagePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
interface AvatarWithUploadProps {
    avatar_url?: string
    first_name?: string
    last_name?: string
    ownProfile: boolean
}
function AvatarWithUpload({ avatar_url, first_name, last_name, ownProfile }: AvatarWithUploadProps) {
    const { updateUser } = useStore()
    const [avatarHovered, setAvatarHovered] = useState<boolean>(false);
    const [avatarLoading, setavatarLoading] = useState<boolean>(false);
    const [avatarInitialLoading, setavatarInitialLoading] = useState<boolean>(true);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Here you would typically upload to your backend
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('file', file);

            setavatarLoading(true)
            try {
                let res: { avatar_url: string } = await apiRequest("/users/me/avatar/", {
                    method: "POST",
                    body: formData,
                }, true)

                setAvatarPreview(res.avatar_url)
                updateUser({ avatar_url: res.avatar_url })
                setavatarInitialLoading(true)
            } catch (error) {

                setAvatarPreview(null)
            }
            setavatarLoading(false)

        }
    };

    useEffect(() => {
        if (!avatarPreview && !avatar_url) {
            setavatarInitialLoading(false)
        }
    }, [avatarPreview, avatar_url])

    return (
        <div className="relative mt-3 "

            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => setAvatarHovered(false)}
        >
            <Avatar className="w-28  brightness-110 h-28 border-4 shadow-xl border-primary">
                <AvatarImage
                    src={avatarPreview || avatar_url}
                    alt={first_name}
                    className=' object-cover'
                    onLoad={() => setavatarInitialLoading(false)}

                    onError={() => {
                        setavatarInitialLoading(false)
                    }}
                />
                {avatarInitialLoading ? (
                    <div className="absolute inset-0 bg-amber-300/80 rounded-full flex justify-center items-center  transition-opacity">
                        <LoaderSpinner size={16} />
                    </div>

                )
                    :
                    <AvatarFallback className="bg-amber-300/50 text-gray-700 font-bold text-2xl">{first_name?.charAt(0)}{last_name?.charAt(0)} </AvatarFallback>
                }
            </Avatar>
            {ownProfile && (
                <>
                    {avatarHovered && (
                        <label htmlFor="avatar-upload" className="absolute inset-0 cursor-pointer">
                            <div className="absolute inset-0 bg-black/45 rounded-full flex justify-center items-center  transition-opacity">
                                <ImagePlus className="w-6 h-6 text-white" />
                            </div>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept=".jpg, .jpeg, .png"

                                onChange={handleAvatarUpload}
                                className="hidden"
                            />
                        </label>
                    )}

                    {avatarLoading && (
                        <div className="absolute inset-0 bg-black/45 rounded-full flex justify-center items-center  transition-opacity">
                            <LoaderSpinner size={16} />
                        </div>

                    )}
                </>
            )

            }
        </div>
    )
}

export default AvatarWithUpload