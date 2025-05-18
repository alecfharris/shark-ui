import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const obritron = Orbitron({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shark UI",
  description: "A clean UI for local LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${obritron.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
