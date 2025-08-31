
import { HomeView } from "@/modules/home/ui/views/home-view";

export default async function page() {
  return (
    <div className="text-3xl font-bold underline text-black"
    >
      <HomeView />
    </div>
  );
}
