import { Calendar, MapPin, Link as LinkIcon, Edit3, GlobeLock, ImagePlus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStore } from '@/store/useStore';
import { formatDateToMonthYear, formatNumberMinimal } from '@/lib/utils';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Visibility } from '@/modules/auth/types';
import { ProfileEditDialog } from '../components/profile-edit-dialog';
import { apiRequest } from '@/lib/api';
import { LoaderSpinner } from '@/components/Loader';
import AvatarWithUpload from '../components/avatar-with-upload';

export function ProfileInfoView() {
  const { currentProfile, userData } = useStore()
  const [profileVisibility, setprofileVisibility] = useState<Visibility>(currentProfile?.visibility as Visibility);
  const [isProfileEditDialogOpen, setIsProfileEditDialogOpen] = useState<boolean>(false);

  
  return (
    <div className="px-4 pb-4  mt-[9%]">
      <div className="flex justify-between items-center mb-4">
        <AvatarWithUpload avatar_url={currentProfile?.avatar_url} first_name={currentProfile?.user.first_name} last_name={currentProfile?.user.last_name} ownProfile={currentProfile?.user.username===userData?.user.username} />
        <div className="flex items-center space-x-2 mt-3">
          {currentProfile?.user.username === userData?.user.username ?
            <>
              <Button variant="ghost" onClick={() => setIsProfileEditDialogOpen(true)} className=" border-2 border-yellow-700/50  rounded-full hover:bg-yellow-100/70 hover:border-primary/50 cursor-pointer ">
                <Edit3 />
                <span>

                  Edit profile
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>

                  <Button variant="ghost" size="icon" className=" cursor-pointer hover:bg-transparent">
                    <GlobeLock />
                  </Button>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-yellow-100 p-0 border-yellow-300 shadow-xl text-gray-800">
                  <div className='mb-2 p-2 bg-primary/80 font-semibold tracking-wide text-sm text-amber-50 '>Profile privacy</div>
                  <DropdownMenuItem
                    onClick={() => { }}
                    className=" data-[highlighted]:bg-transparent cursor-pointer flex justify-between"
                  >
                    Public

                    {profileVisibility === 'public' && <Check />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => { }}
                    className=" data-[highlighted]:bg-transparent cursor-pointer flex justify-between"
                  >
                    Private
                    {profileVisibility === 'private' && <Check />}

                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => { }}
                    className=" data-[highlighted]:bg-transparent  cursor-pointer flex justify-between "
                  >
                    Followers only
                    {profileVisibility === 'followers_only' && <Check />}

                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>



            </>
            :

            <Button className=" text-white font-semibold bg-yellow-600 hover:bg-yellow-600/80 cursor-pointer px-6">
              Follow
            </Button>
          }
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center space-x-1 mb-1">
            <h2 className="text-xl font-bold text-gray-800">{currentProfile?.user.first_name} {' '} {currentProfile?.user.last_name} </h2>
            {/* <VerifiedBadge /> */}
          </div>
          <p className="text-gray-900">@{currentProfile?.user.username} </p>
        </div>

        <p className="text-gray-900 text-[15px] leading-5">{currentProfile?.bio} </p>

        <div className="flex flex-wrap items-center text-gray-700 text-sm space-x-4">
          {currentProfile?.location &&
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{currentProfile.location}</span>
            </div>

          }
          {currentProfile?.website &&

            <div className="flex items-center space-x-1">
              <LinkIcon className="w-4 h-4" />
              <a href={currentProfile.website} target='_blank' className="text-yellow-800 text-md font-semibold hover:text-yellow-700">{currentProfile.website} </a>
            </div>
          }

          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-black" />
            <span>Joined {formatDateToMonthYear(currentProfile?.user.date_joined as string)} </span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-800">{formatNumberMinimal(currentProfile?.following_count as number)}</span>
            <span className="text-gray-600">Following</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-800">{formatNumberMinimal(currentProfile?.followers_count as number)}</span>
            <span className="text-gray-600">Followers</span>
          </div>
        </div>

        {/* <div className="flex items-center space-x-1 text-sm text-gray-400">
          <div className="flex -space-x-2">
            <Avatar className="w-5 h-5 border border-black">
              <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" />
              <AvatarFallback className="bg-gray-600 text-white text-xs">A</AvatarFallback>
            </Avatar>
            <Avatar className="w-5 h-5 border border-black">
              <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" />
              <AvatarFallback className="bg-gray-600 text-white text-xs">B</AvatarFallback>
            </Avatar>
          </div>
          <span>Followed by ExploreBharat, Srijit Bera, and 46 others you follow</span>
        </div> */}
      </div>
      <ProfileEditDialog
        open={isProfileEditDialogOpen}
        onOpenChange={setIsProfileEditDialogOpen}
      />

    </div>
  );
}
