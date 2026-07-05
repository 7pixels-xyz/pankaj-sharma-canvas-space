import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import QuickInquiry from "@/components/QuickInquiry";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Canvas Space — Architecture | Space Planning | Concept Design",
  description:
    "Canvas Space by Pankaj Sharma. A brutalist architectural studio specializing in concept design, space planning, and premium architectural solutions. Based in Pune, India.",
  keywords: [
    "architecture",
    "Canvas Space",
    "Pankaj Sharma",
    "concept design",
    "space planning",
    "Pune architect",
    "brutalist design",
    "interior design",
  ],
  openGraph: {
    title: "Canvas Space — Architecture by Pankaj Sharma",
    description:
      "Raw. Architectural. Unapologetic. Premium architectural design studio based in Pune.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen w-full overflow-x-hidden">
        <SmoothScrollProvider>
          <Preloader />
          <CustomCursor />
          <Header />
          {children}
          <QuickInquiry />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
