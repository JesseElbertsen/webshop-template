"use client";

import React, { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../lib/api";
import { Product } from "../types/types";

export default function AdminPortal() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    description: "",
    info: "",
    amount: 0,
    image: "",
    price: 0,
    type: "",
  });

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.title || !newProduct.type || !newProduct.price) {
      alert("Titel, type en prijs zijn verplicht!");
      return;
    }

    const updatedProducts = await addProduct(newProduct as Product);
    setProducts(updatedProducts);
    setNewProduct({
      title: "",
      description: "",
      info: "",
      amount: 0,
      image: "",
      price: 0,
      type: "",
    });
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    const updatedProducts = await updateProduct(updatedProduct);
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = async (id: string) => {
    const updatedProducts = await deleteProduct(id);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>

      {/* Formulier voor nieuw product */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Nieuw product toevoegen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Titel"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Beschrijving"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Extra informatie"
            value={newProduct.info}
            onChange={(e) =>
              setNewProduct({ ...newProduct, info: e.target.value })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Voorraad"
            value={newProduct.amount}
            onChange={(e) =>
              setNewProduct({ ...newProduct, amount: parseInt(e.target.value) })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Afbeelding URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Prijs"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Type"
            value={newProduct.type}
            onChange={(e) =>
              setNewProduct({ ...newProduct, type: e.target.value })
            }
            className="border p-2 rounded-md"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-primary text-white px-4 py-2 rounded-md mt-4"
        >
          Toevoegen
        </button>
      </div>

      {/* Lijst van producten */}
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-4 border p-4 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">{product.title}</h3>
                <p>{product.description}</p>
                <p>Prijs: €{product.price.toFixed(2)}</p>
                <p>Voorraad: {product.amount}</p>
                <p>Type: {product.type}</p>
              </div>
              <div>
                <button
                  onClick={() =>
                    handleUpdateProduct({
                      ...product,
                      price: product.price + 1,
                    })
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Prijs verhogen
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Verwijderen
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
