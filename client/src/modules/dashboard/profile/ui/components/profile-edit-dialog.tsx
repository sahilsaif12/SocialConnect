
import { useEffect, useState } from 'react';
import { X, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvatarWithUpload from './avatar-with-upload';
import { useStore } from '@/store/useStore';
import { apiRequest } from '@/lib/api';
import { LoaderSpinner } from '@/components/Loader';
import { Profile } from '@/modules/auth/types';

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type profileUpdateFields = {
  first_name: string;
  last_name: string,
  bio: string,
  location: string,
  website: string,
}

export function ProfileEditDialog({ open, onOpenChange }: ProfileEditDialogProps) {
  const { userData, updateUser, isAvatarUploading, setIsAvatarUploading } = useStore()
  const [saveLoading, setsaveLoading] = useState<boolean>(false);
  const [shouldFileUpload, setshouldFileUpload] = useState<boolean>(false);
  const [textUpdatesComplete, settextUpdatesComplete] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<profileUpdateFields>({
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    setProfileData({
      first_name: userData?.user.first_name || '',
      last_name: userData?.user.last_name || '',
      bio: userData?.bio || '',
      location: userData?.location || '',
      website: userData?.website || '',
    })
  }, [userData])

  useEffect(() => {
    if (saveLoading && !isAvatarUploading) {
      // setIsAvatarUploading(false)
      console.log("this one 1")
      setsaveLoading(false)
      onOpenChange(false)
      setshouldFileUpload(false)
    }
  }, [isAvatarUploading,textUpdatesComplete])



  const handleSave = async () => {
    setshouldFileUpload(true)
    setsaveLoading(true)
    try {
      const res = await apiRequest('/users/me/', {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      }, true)

      updateUser(res as Profile)
      settextUpdatesComplete(true)
      // if (!isAvatarUploading) {
      //   console.log("this one 2");
        
      //   onOpenChange(false);
      // }
    } catch (error) { }
      // setsaveLoading(false)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-none  bg-yellow-50 border-2 py-0 border-yellow-200 shadow-xl text-white">
        <DialogHeader className="flex sticky top-0 z-10 flex-row items-center bg-yellow-50 pt-3 justify-between space-y-0 pb-4 border-b border-gray-400/70">
          <div className="flex items-center w-full justify-between space-x-4">
            <DialogTitle className="text-xl font-bold text-gray-700">Edit profile</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-white cursor-pointer hover:bg-transparent"
            >
              <X className="size-6 text-black/80" />
            </Button>
          </div>

        </DialogHeader>

        <div className="space-y-6">
          {/* Cover Photo Section */}
          <div className="flex flex-col justify-between  ">

            {/* Avatar Section */}
            <div className="self-center">

              <AvatarWithUpload avatar_url={userData?.avatar_url} first_name={userData?.user.first_name} last_name={userData?.user.last_name} ownProfile={true} shouldFileUpload={shouldFileUpload} setShouldFileUpload={setshouldFileUpload} />
            </div>

            {/* Form Fields */}
            <div className="pt-2">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-muted-foreground ml-2">First Name</Label>
                <Input
                  id="first_name"
                  value={profileData.first_name}
                  onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                  className="bg-yellow-100 border-yellow-700/80 text-gray-800   "
                  maxLength={30}
                />
                <div className="text-right text-sm text-gray-400">
                  {profileData.first_name.length}/30
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-muted-foreground ml-2">Last Name</Label>
                <Input
                  id="last_name"
                  value={profileData.last_name}
                  onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                  className="bg-yellow-100 border-yellow-700/80 text-gray-800   "
                  maxLength={30}
                />
                <div className="text-right text-sm text-gray-400">
                  {profileData.last_name.length}/30
                </div>
              </div>


              <div className="space-y-2">
                <Label htmlFor="bio" className="text-muted-foreground ml-2">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="bg-yellow-100 border-yellow-700/80 text-gray-800   min-h-[100px] resize-none"
                  maxLength={160}
                />
                <div className="text-right text-sm text-gray-400">
                  {profileData.bio.length}/160
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-muted-foreground ml-2">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="bg-yellow-100 border-yellow-700/80 text-gray-800 "
                  maxLength={30}
                />
                <div className="text-right text-sm text-gray-400">
                  {profileData.location.length}/30
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-muted-foreground ml-2">Website</Label>
                <Input
                  id="website"
                  value={profileData.website}
                  onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  className="bg-yellow-100 border-yellow-700/80 text-gray-800 "
                />

              </div>
              <div className="sticky bottom-0 justify-center  flex p-2  bg-yellow-50">

                <Button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="bg-primary w-3/5 flex justify-center gap-3  cursor-pointer  text-white font-semibold hover:bg-primary/60 px-6 mt-2"
                >
                  Save
                  {saveLoading && <LoaderSpinner />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

