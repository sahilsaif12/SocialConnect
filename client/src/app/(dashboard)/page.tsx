import { requireAuth } from "@/lib/auth";
import { Profile } from "@/modules/auth/types";
import { HomeView } from "@/modules/home/ui/views/home-view";

export default async function page() {
  let user =  await requireAuth()
  return (
    <div className="text-3xl font-bold underline text-black"
    >
      <HomeView user={user as Profile}/>
    </div>
  );
}
