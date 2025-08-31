import { Profile } from '@/modules/auth/types'
import { create } from 'zustand'

interface Store {
  // User state
  userData: Profile | null
  setUser: (profile: Profile ) => void
  clearUser: () => void
  
  // App state
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Notifications
  notifications: number
  setNotifications: (count: number) => void
  incrementNotifications: () => void
}

export const useStore = create<Store>((set) => ({
  // User state
  userData: null,
  setUser: (userData) => set({ userData }),
  clearUser: () => set({ userData:null }),

  
  // App state
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  // Notifications
  notifications: 0,
  setNotifications: (count) => set({ notifications: count }),
  incrementNotifications: () => set((state) => ({ 
    notifications: state.notifications + 1 
  })),
}))