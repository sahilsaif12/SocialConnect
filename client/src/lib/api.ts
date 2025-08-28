import { showErrorToasts } from "./utils";

export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
    console.log("process.env.NEXT_PUBLIC_API_URL",process.env.NEXT_PUBLIC_API_URL);
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });
  console.log("res",res)
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (errorData) {
      showErrorToasts(errorData,true,false);
    }
    console.log("errorData",errorData);
    throw new Error(errorData || "Something went wrong");
  }

  return res.json();
}
