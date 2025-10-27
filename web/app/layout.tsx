import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Better Ethereum DApp",
  description: "Scaffold your next Ethereum DApp with the latest tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
