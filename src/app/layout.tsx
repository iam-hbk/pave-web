import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pave",
  // description: "Your personal assistant vir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(urbanist.className, "antialiased min-h-screen pt-16")}
      >
        {children}
      </body>
    </html>
  );
}
