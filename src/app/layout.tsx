import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "C# Skills Showcase",
  description: "Interactive overview of C# expertise delivered by an autonomous AI developer."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
