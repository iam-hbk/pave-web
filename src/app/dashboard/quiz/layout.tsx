"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((p) => p);

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="breadcrumbs min-h-12 fixed right-2 top-2 z-50  hidden h-12  w-[79vw]  min-w-[79vw] max-w-[75vw] items-center rounded-lg bg-base-100 pl-5 text-sm capitalize shadow-md md:flex">
        <ul>
          <li>
            <Link href={`/dashboard`}>/</Link>
          </li>
          {pathSegments.map((segment, index) => (
            <li key={index} className="mx-2 rounded-md bg-slate-200 p-1 pr-4">
              {index === pathSegments.length - 1 ? (
                segment
              ) : (
                <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                  {segment}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <main className="pt-[3rem]">{children}</main>
    </div>
  );
}
