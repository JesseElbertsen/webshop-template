"use client";
import React from "react";
import DashboardNavbar from "./components/DashboardNavbar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Reservations from "./components/Reservations";
import BusinessInfoForm from "./components/BusinessInfoForm";

export default function AdminPortalPage() {
  const [active, setActive] = React.useState<string>("products");

  return (
    <div className="flex min-h-screen">
      <DashboardNavbar active={active} setActive={setActive} />
      <main className="mx-auto w-full px-4 py-8  ml-56">
        {active === "products" && <ProductList />}
        {active === "add" && <ProductForm />}
        {active === "reservations" && <Reservations />}
        {active === "businessinfo" && <BusinessInfoForm />}
      </main>
    </div>
  );
}
