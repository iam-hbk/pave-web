"use client";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="p-6 bg-white shadow-xl min-h-screen rounded-b-lg">
      {/* Logo */}
      <div className="mb-6">
        <Image
          width={100}
          height={100}
          src="/assets/svgs/Pave_Logo.svg"
          alt="Logo"
          className="w-32 h-auto mb-4"
        />
      </div>
      <div className="flex items-center mb-6 space-x-2">
        <button className="btn text-primary">☰</button>
        <button className="btn text-primary">❌</button>
      </div>
      <nav className="space-y-4">
        {[
          { title: "Dashboard", link: "/dashboard/home" },
          { title: "Quizzes", link: "/dashboard/quiz" },
          { title: "Students", link: "#" },
          { title: "Results", link: "#" },
          { title: "Help", link: "#" },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className="block p-2 rounded w-full hover:bg-gray-100 transition-all duration-300"
          >
            {item.title}
          </Link>
        ))}
        <button
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_1"
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          className="block p-2 rounded hover:bg-gray-100 transition-all duration-300"
        >
          New Session
        </button>
      </nav>
    </aside>
  );
}
