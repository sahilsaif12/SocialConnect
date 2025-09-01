import { useState } from 'react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'posts', label: 'Posts' },
  { id: 'replies', label: 'Replies' },
  { id: 'media', label: 'Media' },
];

export function ProfileTabsView() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="border-b border-gray-800">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-4 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}