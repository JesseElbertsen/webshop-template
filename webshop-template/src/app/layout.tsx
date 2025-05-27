import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavBar from "./components/ConditionalNavBar";
import ConditionalFooter from "./components/ConditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jouw Webshop Naam | Unieke producten & aanbiedingen",
  description:
    "Ontdek de beste deals en unieke producten bij Jouw Webshop. Veilig reserveren, snelle levering en uitstekende service.",
  keywords: [
    "webshop",
    "online winkel",
    "producten",
    "aanbiedingen",
    "snelle levering",
    "winkel",
    "shop",
    "build by jesse",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Jouw Webshop Naam",
    description: "Ontdek de beste deals en unieke producten bij Jouw Webshop.",
    url: "https://www.jouwwebshop.nl",
    siteName: "Jouw Webshop Naam",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jouw Webshop",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  robots: "index, follow",
  // canonical: "https://www.jouwwebshop.nl", // Voeg toe als je live bent
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="nl">
      <head>
        {/* Structured Data (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Jouw Webshop Naam",
              url: "https://www.jouwwebshop.nl",
              description:
                "Ontdek de beste deals en unieke producten bij Jouw Webshop.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Voorbeeldstraat 1",
                addressLocality: "Voorbeeldstad",
                postalCode: "1234 AB",
                addressCountry: "NL",
              },
              telephone: "0612345678",
            }),
          }}
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.jouwwebshop.nl" />
        {/* Manifest voor PWA support */}
        <link rel="manifest" href="/manifest.json" />
        {/* Extra meta tags */}
        <meta name="theme-color" content="#22a4b9" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Social preview fallback */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="nl_NL" />
        <meta property="og:site_name" content="Jouw Webshop Naam" />
        {/* Accessibility: charset */}
        <meta charSet="utf-8" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalNavBar />
        <main className="bg-background" role="main">
          {children}
        </main>
        <footer>
          <ConditionalFooter />
        </footer>
        {/* Cookie banner (voorbeeld, voeg component toe indien gewenst) */}
        {/* <CookieBanner /> */}
        {/* Google Analytics (optioneel, als je tracking wilt) */}
        {/* 
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX-X"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-XXXXXXX-X');
            `,
          }}
        />
        */}
      </body>
    </html>
  );
}
