import { redirect } from 'next/navigation';
import { apiRequest } from './api';
import { useStore } from '@/store/useStore';
import { Profile } from '@/modules/auth/types';

export async function checkAuth() {
    let user
    try {
        user = await apiRequest('/users/me/', {
            method: "GET",
        },true);

        // const {setUser}=useStore()
        console.log("user__user",user);
        
        // setUser(user as Profile)
        
    } catch (error) {
        console.log("error",error);
        
    }
    return user;
}

export async function requireAuth() {
    const user = await checkAuth();
    if (!user) {
        redirect('/sign-in');
    }
    return user;
}

export async function requireNoAuth() {
    const user = await checkAuth();
    console.log("user__",user);
    
    if (user) {
        redirect('/');
    }
    return null;
}