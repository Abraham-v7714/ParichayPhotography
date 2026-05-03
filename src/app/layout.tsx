import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parichay Photography | Premium Photography Studio in Bangalore",
  description:
    "Parichay Photography — Bangalore's premier studio for wedding, portrait, fashion, baby, and product photography. Book your session today.",
  keywords: [
    "photography studio bangalore",
    "wedding photographer bangalore",
    "portrait photography bangalore",
    "fashion photography bangalore",
    "baby photography bangalore",
    "parichay photography",
  ],
  openGraph: {
    title: "Parichay Photography | Premium Studio in Bangalore",
    description:
      "Capturing life's most beautiful moments with cinematic precision.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-stone-950 text-stone-50 font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1c1917",
              color: "#fafaf9",
              border: "1px solid #44403c",
            },
          }}
        />
      </body>
    </html>
  );
}
