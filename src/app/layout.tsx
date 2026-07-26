import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "Whispr is a disposable, anonymous 1:1 chat room. Create a private chat room, share the link, talk to one other person. No sign-up, no logs — the room expires in 10 minutes.",
  title: "Whispr — Anonymous Chat That Disappears",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { color: "#F5F2EF", media: "(prefers-color-scheme: light)" },
    { color: "#0A0B10", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
