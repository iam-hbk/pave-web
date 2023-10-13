"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {




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
      {/* <div className="flex items-center mb-6 space-x-2">
        <button className="btn text-primary">☰</button>
        <button className="btn text-primary">❌</button>
      </div> */}
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
            className="block w-full rounded p-2 transition-all duration-300 hover:bg-gray-100"
          >
            {item.title}
          </Link>
        ))}
        <button
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_1",
            ) as HTMLDialogElement;
            if (modal) {
              modal.showModal();
            }
          }}
          className="block w-full rounded p-2 text-left transition-all duration-300 hover:bg-gray-100"
        >
          New Session
        </button>
      </nav>
    </aside>
  );
}
