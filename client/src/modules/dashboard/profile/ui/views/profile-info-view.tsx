import { Calendar, MapPin, Link as LinkIcon, Edit3, GlobeLock } from 'lucide-react';
// import { VerifiedBadge } from '@/components/ui/verified-badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStore } from '@/store/useStore';
import { formatDateToMonthYear, formatNumberMinimal } from '@/lib/utils';

export function ProfileInfoView() {
    const {currentProfile,userData}=useStore()
  
  return (
    <div className="px-4 pb-4  mt-[9%]">
      <div className="flex justify-between items-center mb-4">
        <div className="relative mt-3 ">
          <Avatar className="w-32 h-32 border-4 shadow-xl border-primary">
            <AvatarImage 
              src={currentProfile?.avatar_url} 
              alt={currentProfile?.user.first_name}
            />
            <AvatarFallback className="bg-amber-300/50 text-gray-700 font-bold text-2xl">{currentProfile?.user.first_name.charAt(0)}{currentProfile?.user.last_name.charAt(0)} </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center space-x-2 mt-3">
          {currentProfile?.user.username===userData?.user.username ?
          <>
          <Button variant="ghost" size="icon" className=" cursor-pointer hover:bg-transparent">
            <Edit3 />
          </Button>
          <Button variant="ghost" size="icon" className=" cursor-pointer hover:bg-transparent">
            <GlobeLock />
          </Button>
          
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
            <a href={currentProfile.website} target='_blank' className="text-yellow-800 text-md hover:text-yellow-600">{currentProfile.website} </a>
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
    </div>
  );
}
