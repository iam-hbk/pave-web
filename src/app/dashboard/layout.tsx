"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
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
      <div className="flex h-fit bg-gray-100 transition-all duration-300">
        {/* Sidebar */}
        <div className="fixed bottom-0 left-0 top-0 w-[16vw] min-w-[16vw] bg-gray-100">
          <Sidebar />
        </div>
        <div className="ml-[16vw] flex flex-1 flex-col">
          {/* Breadcrumbs */}
          <Breadcrumbs />
          {/* Main */}
          <main className="flex-grow">{children}</main>
          {/* Adjusted margin-top */}
        </div>
      </div>
    </QueryClientProvider>
  );
}
