import { ArrowLeft, Search, MoreHorizontal } from 'lucide-react';
// import { VerifiedBadge } from '@/components/ui/verified-badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';

export function ProfileHeaderView() {
  const {currentProfile}=useStore()
  return (
    <div className="sticky top-[8%] rounded-b-lg bg-primary backdrop-blur-3xl  z-1">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-8">
          <Button variant="ghost" size="icon" className="text-white cursor-pointer hover:text-white hover:bg-yellow-300/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center space-x-1">
              <h1 className="text-xl font-bold text-white truncate">{currentProfile?.user.first_name} {' '} {currentProfile?.user.last_name}  </h1>
              {/* <VerifiedBadge /> */}
            </div>
            <p className="text-sm text-gray-200/90"> {currentProfile?.posts_count} posts</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white  hover:text-white hover:bg-yellow-300/20 cursor-pointer ">
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}