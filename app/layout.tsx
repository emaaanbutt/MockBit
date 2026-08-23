import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MockBit | Real-Time Voice AI Interviewer",
  description: "Practice realistic voice interviews and review structured AI feedback with regional context."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
