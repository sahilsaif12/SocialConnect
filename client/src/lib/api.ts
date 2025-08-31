import { showErrorToasts } from "./utils";
import Cookies from 'js-cookie';


let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;



function getClientCookie(key: string): string | undefined {
  return Cookies.get(key)
}

function setClientCookie(key: string, value: any, options?: { secure?: boolean; sameSite?: string }) {
  Cookies.set(key,value,{
          secure: true,
          sameSite: 'strict',
        })
}

async function getServerCookie(key: string): Promise<string | undefined> {
    // Dynamic import to avoid including next/headers in client bundle
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.get(key)?.value
 
}

async function setServerCookie(key: string,value:any){
        const { cookies } = await import('next/headers')
        const cookieStore = await cookies()
        cookieStore.set(key, value, {
          secure: true,
          sameSite: 'strict',
        })
 
}

async function getUniversalCookie(key: string): Promise<string | undefined> {
  if (typeof window === 'undefined') {
    // Server environment
    return getServerCookie(key)
  } else {
    // Client environment
    return getClientCookie(key)
  }
}

async function setUniversalCookie(key: string,value:any) {
   if (typeof window === 'undefined') {
        setServerCookie(key,value)
      } else {
        setClientCookie(key, value)
      }
 
}



async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh: await getUniversalCookie("refresh_token"),
        }),
      });

      if (!res.ok) throw new Error("Failed to refresh token");

      const data = await res.json();

      setUniversalCookie('access_token',data.access)
      setUniversalCookie('refresh_token',data.refresh)
      return data.access;
    } catch (err) {
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function apiRequest<T>(
  url: string,
  options?: RequestInit,
  isPrivate: boolean = false
): Promise<T> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  const accessToken = await getUniversalCookie("access_token");

  const makeRequest = async (token?: string): Promise<Response> => {
    return fetch(apiUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        ...(isPrivate && token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });
  };

  if (isPrivate && !accessToken) {
    throw new Error("Authentication required");
  }

  let res
  try {
    res = await makeRequest(accessToken || undefined);

  } catch (error) {
    showErrorToasts("error")
    throw new Error("Connection error")

  }

  // Handle expired token (401)
  if (isPrivate && res.status === 401 && await getUniversalCookie("refresh_token")) {
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      res = await makeRequest(newAccessToken);
    }
    else {
      throw new Error("Authentication required");
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (errorData && res.status === 400) {
      showErrorToasts(errorData);
    }
    else {
      showErrorToasts("error")
    }
  }

  return res.json();
}
