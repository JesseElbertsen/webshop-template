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
  title: "Your Webshop Title",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  description: "A Build by Jesse Webshop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalNavBar />
        <main className="bg-background">{children}</main>
        <footer>
          <ConditionalFooter />
        </footer>
      </body>
    </html>
  );
}
