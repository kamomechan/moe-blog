import type { Metadata } from "next";
import "./globals.css";
import Nav from "./ui/nav";

export const metadata: Metadata = {
  title: "moe-blog",
  description:
    "Discussing visual novels and moe culture, with occasional posts on open-source projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Nav />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
