import React from "react";
import DashboardNavbar from "./components/DashboardNavBar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

export default function AdminPortalPage() {
  const [active, setActive] = React.useState<string>("products");

  return (
    <div className="flex min-h-screen">
      <DashboardNavbar active={active} setActive={setActive} />
      <main className="flex-1 ml-56 p-8">
        {active === "products" && <ProductList />}
        {active === "add" && <ProductForm />}
      </main>
    </div>
  );
}
