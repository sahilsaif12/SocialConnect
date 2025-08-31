'use server'

import { cookies } from 'next/headers'

export async function setServerCookie(key: string, value: any) {
    const cookieStore = await cookies()

    cookieStore.set(key, value, {
        secure: true,
        sameSite: 'strict',
    })
}

export async function clearServerCookie(key: string) {
    const cookieStore = await cookies()
    cookieStore.delete(key)
}

export async function getServerCookie(key: string) {
    const cookieStore = await cookies()
    return cookieStore.get(key)?.value
}