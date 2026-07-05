import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import QuickInquiry from "@/components/QuickInquiry";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://canvasspace.in"),
  title: {
    default: "Canvas Space | Architectural Design Studio by Pankaj Sharma",
    template: "%s | Canvas Space",
  },
  description:
    "Canvas Space is a premium, brutalist architectural studio based in Chandigarh, India. Led by Pankaj Sharma, we specialize in high-end concept design, spatial planning, and monumental structures.",
  keywords: [
    "architectural design",
    "interior design",
    "Canvas Space",
    "Pankaj Sharma",
    "brutalist architecture",
    "Chandigarh architect",
    "premium space planning",
    "monumental structures",
    "luxury interior design",
  ],
  authors: [{ name: "Pankaj Sharma" }],
  creator: "Canvas Space",
  openGraph: {
    title: "Canvas Space | Pure Brutalist Architecture",
    description: "Raw. Architectural. Unapologetic. Explore monumental spaces and concept designs engineered by Pankaj Sharma in Chandigarh.",
    url: "https://canvasspace.in",
    siteName: "Canvas Space",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Canvas Space Architectural Showcase",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Canvas Space | Pure Brutalist Architecture",
    description: "Raw. Architectural. Unapologetic. Explore monumental spaces by Pankaj Sharma.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
