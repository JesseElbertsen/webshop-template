import { getPageContent } from "@/app/lib/api";

export default async function OverOnsPage() {
  const data = await getPageContent("over-ons");

  return (
    <div className="prose  mx-auto min-h-screen container  md:px-4 md:py-8">
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
