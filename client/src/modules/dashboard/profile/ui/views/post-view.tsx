import { MoreHorizontal, MessageCircle, Repeat2, Heart, Upload, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { VerifiedBadge } from '@/components/ui/verified-badge';
import { Button } from '@/components/ui/button';

export function PostView() {
  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-950/50 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage 
            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" 
            alt="Narendra Modi"
          />
          <AvatarFallback className="bg-gray-600 text-white">NM</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 mb-1">
            <span className="font-bold text-white">Narendra Modi</span>
            {/* <VerifiedBadge /> */}
            <span className="text-gray-400">@narendramodi</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">2h</span>
            <div className="ml-auto">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:bg-gray-900 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-white text-[15px] leading-5 mb-3">
            A very productive conversation with Kyrgyz President Sadyr Japarov in Tianjin. Our nations share a robust partnership and we will keep working together to add more vigour to our developmental cooperation.
          </div>

          <div className="mb-3">
            <img
              src="https://images.pexels.com/photos/8939844/pexels-photo-8939844.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
              alt="Meeting"
              className="w-full rounded-2xl border border-gray-700"
            />
          </div>

          <div className="flex items-center justify-between max-w-md">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400 hover:bg-blue-950/20 -ml-2">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">24</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 hover:bg-green-950/20">
              <Repeat2 className="w-4 h-4 mr-1" />
              <span className="text-sm">156</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 hover:bg-red-950/20">
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-sm">2.1K</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400 hover:bg-blue-950/20">
              <Upload className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400 hover:bg-blue-950/20">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}