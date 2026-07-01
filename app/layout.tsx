import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Boreneoux - Ichlasul Fikri",
  description:
    "Full-stack engineer working across the delivery cycle - API design, backend systems, and frontend with React & Next.js.",
  authors: [{ name: "Ichlasul Fikri" }],
  openGraph: {
    title: "Boreneoux - Ichlasul Fikri",
    description:
      "Full-stack engineer working across the delivery cycle - API design, backend systems, and frontend with React & Next.js.",
    type: "website",
  },
  appleWebApp: {
    title: "Boreneoux",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-bg text-fg antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
