import { showErrorToasts } from "./utils";
import Cookies from 'js-cookie';


let isRefreshing = false;
let refreshPromise: Promise<{access_token: string,refresh_token:string} | null> | null = null;



export function getClientCookie(key: string): string | undefined {
  return Cookies.get(key)
}

export function setClientCookie(key: string, value: any) {
  Cookies.set(key,value,{
    expires:7
  })
}

async function getServerCookie(key: string): Promise<string | undefined> {
    // Dynamic import to avoid including next/headers in client bundle
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.get(key)?.value
 
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
        //will set it later via client component as we can set cookies from server component
        return
      } else {
        setClientCookie(key, value)
      }
 
}



async function refreshAccessToken(): Promise< {access_token: string,refresh_token:string} | null> {
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
      return {access_token:data.access, refresh_token:data.refresh};
    } catch (err) {
      console.log("errrr",err);
      
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
  options: RequestInit,
  isPrivate: boolean = false,
  filesIncludes:boolean=false
): Promise<T> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  const accessToken = await getUniversalCookie("access_token");

  const makeRequest = async (token?: string): Promise<Response> => {
    return fetch(apiUrl, {
      ...options,
      headers: {
      ...( !filesIncludes && {"Content-Type": "application/json"}),
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
  let tokens
  if (isPrivate && res.status === 401 && await getUniversalCookie("refresh_token")) {
     tokens = await refreshAccessToken();
     console.log("tokens",tokens);
     
    if (tokens?.access_token) {
      res = await makeRequest(tokens.access_token);
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

  let data=await res.json();
  if(tokens){
    data['access_token']=tokens.access_token
    data['refresh_token']=tokens.refresh_token
  }

  return data
}
