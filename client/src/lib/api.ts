import { showErrorToasts } from "./utils";


let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise; 
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh: localStorage.getItem("refresh_token"),
        }),
      });

      if (!res.ok) throw new Error("Failed to refresh token");

      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      return data.access;
    } catch (err) {
      console.error("Refresh token failed", err);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
       window.location.href = "/sign-in";
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
  const accessToken = localStorage.getItem("access_token");

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

  if ( isPrivate && !accessToken) {
     window.location.href = "/sign-in";
      throw new Error("Authentication required");
  }
  let res = await makeRequest(accessToken || undefined);

  // Handle expired token (401)
  if (isPrivate && res.status === 401 && localStorage.getItem("refresh_token")) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      res = await makeRequest(newAccessToken); 
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (errorData && res.status===400) {
      showErrorToasts(errorData);
    }
    else{
      showErrorToasts("error")
    }
  }

  return res.json();
}
