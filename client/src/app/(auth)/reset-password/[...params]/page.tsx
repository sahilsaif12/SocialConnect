
import { requireNoAuth } from "@/lib/auth";
import ResetPasswordView from "@/modules/auth/ui/views/reset-password-view";
import { notFound } from "next/navigation";

interface PageParams {
 params: Promise<{
    params: string[];
  }>;
}
export default async function page({ params }:PageParams) {
    await requireNoAuth()
  
  const resolvedParams = await params;

    const [uid, token] = resolvedParams.params;
    if (!uid || !token) {
      notFound();
    }
    

  return (
        <ResetPasswordView uid={uid} token={token}  />
  );
}
