
import { useState } from 'react';
import { X, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvatarWithUpload from './avatar-with-upload';
import { useStore } from '@/store/useStore';

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileEditDialog({ open, onOpenChange }: ProfileEditDialogProps) {
  const [profileData, setProfileData] = useState({
    name: 'Narendra Modi',
    bio: 'Prime Minister of India',
    location: 'India',
    website: 'narendramodi.in',
    birthDate: 'September 17',
  });
  const {userData}=useStore()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving profile data:', profileData);
    onOpenChange(false);
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

        <AvatarWithUpload avatar_url={userData?.avatar_url} first_name={userData?.user.first_name} last_name={userData?.user.last_name} ownProfile={true} />
            </div>

          {/* Form Fields */}
          <div className="pt-2">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-muted-foreground ml-2">First Name</Label>
              <Input
                id="first_name"
                value={userData?.user.first_name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="bg-yellow-100 border-yellow-700/80 text-gray-800   "
                maxLength={30}
              />
              <div className="text-right text-sm text-gray-400">
                {profileData.name.length}/30
              </div>
            </div>
              <div className="space-y-2">
              <Label htmlFor="last_name" className="text-muted-foreground ml-2">Last Name</Label>
              <Input
                id="last_name"
                value={userData?.user.last_name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="bg-yellow-100 border-yellow-700/80 text-gray-800   "
                maxLength={30}
              />
              <div className="text-right text-sm text-gray-400">
                {profileData.name.length}/30
              </div>
            </div>


            <div className="space-y-2">
              <Label htmlFor="bio" className="text-muted-foreground ml-2">Bio</Label>
              <Textarea
                id="bio"
                value={userData?.bio}
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
                value={userData?.location}
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
                value={userData?.website}
                onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                className="bg-yellow-100 border-yellow-700/80 text-gray-800 "
                maxLength={100}
              />
              <div className="text-right text-sm text-gray-400">
                {profileData.website.length}/100
              </div>
            </div>
            <div className="sticky bottom-0 justify-center  flex p-2  bg-yellow-50">

          <Button 
            // onClick={handleSave}
            className="bg-primary w-3/5  cursor-pointer  text-white font-semibold hover:bg-primary/60 px-6 mt-2"
          >
            Save
          </Button>
            </div>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

