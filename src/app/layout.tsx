import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webkye.com"),
  title: {
    default: "Webkye | Innovative Digital Solutions",
    template: "%s | Webkye",
  },
  description: "Transform your business with Webkye's cutting-edge web development, UI/UX design, and mobile app solutions.",
  keywords: ["Webkye", "tech agency", "web development", "UI/UX design", "mobile apps", "Next.js", "TypeScript"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webkye.com",
    siteName: "Webkye",
    title: "Webkye | Innovative Digital Solutions",
    description: "Transform your business with Webkye's cutting-edge digital solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Webkye",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webkye | Innovative Digital Solutions",
    description: "Transform your business with Webkye's cutting-edge digital solutions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from "@/components/session-provider";
import WhatsAppCTA from "@/components/ui/whatsapp-cta";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="agency-theme">
            {children}
            <WhatsAppCTA />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


