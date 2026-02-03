import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Timestamp Tracklist",
  description: "Get timestamps from your Rekordbox DJ recording",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
