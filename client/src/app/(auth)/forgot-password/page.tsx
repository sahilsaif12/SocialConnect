import { requireNoAuth } from "@/lib/auth";
import ForgotPasswordView from "@/modules/auth/ui/views/forgot-password-view";

const page=async()=>{
  await requireNoAuth()
  
  return (
        <ForgotPasswordView />
  );
}


export default page