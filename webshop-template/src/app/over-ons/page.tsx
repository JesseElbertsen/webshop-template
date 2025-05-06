import { getPageContent } from "@/app/lib/api";

export default async function OverOnsPage() {
  const data = await getPageContent("over-ons");

  return (
    <div className="prose max-w-2xl mx-auto min-h-screen">
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
