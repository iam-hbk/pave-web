"use client";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="transition-all duration-300 ">
        {/* Sidebar */}
        {/* Putting the side bar in layout so that it is available to all the components, please refer to NextJS documentation on layout*/}
        {/* https://nextjs.org/docs/basic-features/layouts */}

        <div className="fixed min-h-screen w-[20vw] min-w-[20vw] max-w-[25vw]">
          <Sidebar />
        </div>
        <main className="absolute right-0 w-[80vw] min-w-[80vw] max-w-[75vw]">
          {children}
        </main>
        {/* We can also put a FOOTER here if we want */}
        {/* <footer>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <nav
              className="-mx-5 -my-2 flex flex-wrap justify-center"
              aria-label="Footer"
            >
              {[
                { name: "Home", href: "#" },
                { name: "About", href: "#" },
                { name: "Contact", href: "#" },
              ].map((item) => (
                <div key={item.name} className="px-5 py-2">
                  <a
                    href={item.href}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>
            <p className="mt-8 text-center text-base text-gray-400">
              &copy; 2021 Pave. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
      </div>
    </QueryClientProvider>
  );
}
