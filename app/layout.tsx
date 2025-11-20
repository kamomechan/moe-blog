import type { Metadata } from "next";
import "./globals.css";
import Nav from "./ui/nav";
import { toggleTheme } from "./lib/utils";

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
    <html lang="en" suppressHydrationWarning>
      {/* Add inline script in `head` to avoid FOUC */}
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: `(${toggleTheme})()` }}
        ></script>
      </head>
      <body className="bg-[url(/background.webp)] bg-cover bg-no-repeat bg-fixed lg:bg-[url(/background-desktop.webp)] dark:bg-[#111]">
        <header>
          <Nav />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
