// Breadcrumbs.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((p) => p);

  useEffect(() => {
    function handleScroll() {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setOpacity(0.5);
      } else {
        setOpacity(1);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className="breadcrumbs sticky top-2 z-10 ml-6 mr-6 mt-6 flex items-center rounded-lg bg-base-100 pl-5 text-sm capitalize shadow-md"
      style={{ opacity }}
    >
      <ul className="flex w-full">
        <li>
          <Link href={`/dashboard`}>/</Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li
            key={index}
            className="mx-2 rounded-md bg-slate-200 p-1 pr-4 transition-colors duration-300 hover:bg-primary"
          >
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
      <button className="btn btn-error btn-outline mr-2 ">
        &larr; log out
      </button>
    </div>
  );
};

export default Breadcrumbs;
