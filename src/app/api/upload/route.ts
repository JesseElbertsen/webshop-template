import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  // Gebruik het originele bestand direct
  const form = new FormData();
  form.append("file", file, file.name);
  form.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: form,
    }
  );
  const json = await res.json();
  console.log("Cloudinary response:", json);
  if (!json.secure_url) {
    return NextResponse.json(
      { error: "Upload failed", details: json },
      { status: 500 }
    );
  }
  return NextResponse.json({ url: json.secure_url });
}
