import type { Metadata } from "next";
import { Geist, Baloo_2, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Baloo_2({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hr20media.com"),
  title: {
    default: "HR20MEDIA — Commercial Photography Studio",
    template: "%s · HR20MEDIA",
  },
  description:
    "HR20MEDIA is a commercial photography studio in Bournemouth, UK — turning inspiration into reality across people, products and food & beverage imagery.",
  keywords: [
    "commercial photography",
    "product photography",
    "food photography",
    "portrait photography",
    "Bournemouth",
    "HR20MEDIA",
  ],
  openGraph: {
    title: "HR20MEDIA — Commercial Photography Studio",
    description:
      "Turning inspiration into reality. Commercial photography for people, products and food & beverages.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${grotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-sand text-ink">
        <SmoothScroll />
        <Header />
        <main className="rail rail-border flex-1 bg-paper">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
