import { requireAuth } from "@/lib/auth";

export default async function page() {
await requireAuth()
  return (
    <div className="text-3xl font-bold underline text-black"
    >
      hello my world
    </div>
  );
}
