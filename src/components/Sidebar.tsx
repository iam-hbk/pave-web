"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NewSessionModal } from "./NewSessionModal";
import { useState } from "react";

export default function Sidebar() {
  const currentPath = usePathname().split("/")[2];
  const [openNewSession, setIsOpenNewSession] = useState(false);

  return (
    <aside className=" m-2 mt-6 min-h-[92vh] w-full rounded-lg bg-white p-6 shadow-xl">
      {/* Logo */}
      <div className="mb-6">
        <Image
          width={100}
          height={100}
          src="/assets/svgs/Pave_Logo.svg"
          alt="Logo"
          className="mb-4 h-auto w-32"
        />
      </div>
      <nav className="space-y-4">
        {[
          { id: "home", title: "Home", link: "/dashboard/home" },
          { id: "quiz", title: "Quizzes", link: "/dashboard/quiz" },
          { id: "students", title: "Students", link: "#" },
          { id: "results", title: "Results", link: "#" },
          { id: "help", title: "Help", link: "#" },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className={`block w-full ${
              currentPath === item.id
                ? "bg-primary bg-opacity-80 hover:bg-opacity-100"
                : "hover:bg-gray-100"
            } rounded p-2 transition-all duration-300 `}
          >
            {item.title}
          </Link>
        ))}
        <button
          onClick={() => setIsOpenNewSession(true)}
          className="block w-full rounded p-2 text-left transition-all duration-300 hover:bg-gray-100"
        >
          New Session
        </button>
        {openNewSession && (
          <NewSessionModal
            isOpen={openNewSession}
            onClose={() => setIsOpenNewSession(false)}
          />
        )}
      </nav>
    </aside>
  );
}
