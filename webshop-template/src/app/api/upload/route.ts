import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  // Log alle relevante variabelen
  console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log(
    "CLOUDINARY_UPLOAD_PRESET:",
    process.env.CLOUDINARY_UPLOAD_PRESET
  );
  console.log("file.name:", file.name);
  console.log("file.type:", file.type);
  console.log("dataUrl (begin):", dataUrl.slice(0, 100)); // alleen eerste 100 chars
  console.log(
    "API URL:",
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
  );

  const form = new URLSearchParams();
  form.append("file", dataUrl);
  form.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);

  // Log het hele form object
  console.log("Form data:", form.toString().slice(0, 500)); // eerste 500 chars

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
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
