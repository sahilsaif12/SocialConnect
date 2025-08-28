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
    throw new Error(errorData.detail || "Something went wrong");
  }

  return res.json();
}
