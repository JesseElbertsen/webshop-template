"use client";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function ConditionalNavBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin-portal")) return null;
  return (
    <header className="pb-[6rem] md:pb-0">
      <NavBar />
    </header>
  );
}
