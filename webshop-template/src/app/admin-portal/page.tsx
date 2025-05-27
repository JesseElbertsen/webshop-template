"use client";
import React from "react";
import DashboardNavbar from "./components/DashboardNavbar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Reservations from "./components/Reservations";
import BusinessInfoForm from "./components/BusinessInfoForm";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AdminPortalPage() {
  const [active, setActive] = React.useState<string>("products");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <p>Je moet ingelogd zijn om het admin-portaal te bekijken.</p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
          onClick={() => signIn("google")}
        >
          Inloggen met Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNavbar active={active} setActive={setActive} />
      <main className="mx-auto w-full px-4 py-8  ml-56">
        {active === "products" && <ProductList />}
        {active === "add" && <ProductForm />}
        {active === "reservations" && <Reservations />}
        {active === "businessinfo" && <BusinessInfoForm />}
      </main>
      <button
        className="absolute top-4 right-4 px-4 py-2 bg-primary text-white rounded"
        onClick={() => signOut()}
      >
        Uitloggen
      </button>
    </div>
  );
}
