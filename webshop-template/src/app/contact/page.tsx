import React from "react";

export default function page() {
  return (
    <section>
      <div className="min-h-screen flex flex-col items-center justify-center  p-4">
        <h1 className="text-3xl font-bold text-black mb-4">Contact</h1>
        <p className="text-gray-500 text-lg mb-4">
          Neem contact met ons op via het onderstaande formulier.
        </p>
        <form className="bg-muted shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Naam
            </label>
            <input
              className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Naam"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className=" bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="E-mail"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Bericht
            </label>
            <textarea
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[200px] resize-none"
              id="message"
              placeholder="Bericht"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Verzenden
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
