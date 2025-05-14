import React from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

export default function AdminPortalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>Admin Dashboard</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}
