import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from "sonner";
const inter = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pave",
  description: "Your AI powered teaching assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
