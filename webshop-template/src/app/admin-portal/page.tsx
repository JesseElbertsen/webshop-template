import React from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

export default function AdminPortalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>Admin Dashboard</h1>
      <div className="flex flex-row items-start justify-center w-full  p-4 gap-4">
        <div className="basis-1/3 ">
          <ProductForm />
        </div>
        <div className="basis-2/3">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
