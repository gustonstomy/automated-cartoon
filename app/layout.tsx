import type { Metadata } from "next";
import { Geist, Comic_Neue } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-comic",
});

export const metadata: Metadata = {
  title: "Animated Cartoon Creator",
  description: "Create amazing cartoon animations with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          comicNeue.variable,
          "antialiased min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"
        )}
      >
        {children}
      </body>
    </html>
  );
}
