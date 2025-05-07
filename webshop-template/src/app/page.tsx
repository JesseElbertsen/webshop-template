import Link from "next/link";
import Carousel from "./components/Carousel";
import SaleItems from "./components/SaleItems";

export default function Home() {
  return (
    <section className="min-h-screen">
      {/* Carousel op achtergrond met opacity */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full brightness-50 md:flex hidden">
          <Carousel carouselId="homepage" />
        </div>
      </div>

      {/* Overlay content */}
      <div className="relative z-10">
        <div className="flex md:flex-row flex-col items-center justify-between max-w-5xl mx-auto p-8 text-black pt-24">
          {/* Titel linksonder */}
          <h1 className="text-3xl md:text-5xl font-bold md:text-white">
            Welkom op mijn site
          </h1>

          {/* Rechterkant: lege container */}
          <div className="md:h-24 bg-muted rounded-lg shadow-lg flex items-center justify-center flex-col p-4 mt-8 md:mt-0">
            <p>Hier kan eventuele extra informatie</p>
            <Link
              className="bg-primary py-2 px-4 rounded-2xl text-white font-bold hover:bg-primary/80 transition-colors duration-300 mt-2"
              href="/producten"
            >
              Producten
            </Link>
          </div>
        </div>
      </div>

      {/* SaleItems */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl mx-auto md:p-8 text-black pt-8 md:pt-24">
        <SaleItems />
      </div>
    </section>
  );
}
