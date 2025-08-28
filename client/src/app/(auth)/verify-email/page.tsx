import LogoBannerCard from "@/modules/auth/ui/components/logo-banner-card";
import VerifyEmailView from "@/modules/auth/ui/views/verify-email-view";

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full space-y-5 max-w-md rounded-2xl bg-white p-5  shadow-2xl  ">
        <div className="rounded-xl overflow-hidden">

        <LogoBannerCard/>
        </div>
        <VerifyEmailView />
      </div>
    </div>
  );
}
