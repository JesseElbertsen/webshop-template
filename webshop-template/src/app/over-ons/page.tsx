import { getPageContent } from "@/app/lib/api";

export default async function OverOnsPage() {
  const data = await getPageContent("over-ons");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <h1 className="text-3xl font-bold text-text mb-4">{data.title}</h1>
      <p className="text-gray-500 text-lg mb-4">{data.body}</p>
    </div>
  );
}
