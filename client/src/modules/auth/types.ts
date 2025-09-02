export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined?: string;
    last_login_at?: string;
    is_active?: boolean;
}

export type Visibility = 'private' | 'public' | 'followers_only';

export interface Profile {
    bio?: string;
    avatar_url?: string;
    website?: string;
    location?: string;
    visibility: Visibility;
    user: User;
    followers_count: number;
    following_count: number;
    posts_count: number;
}