"use client"; // This is a client component 👈🏽

import { useState, useEffect } from "react";
import Dot from "./Dot";

export default function Mission() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="bg-white h-[80vh] flex flex-col">
      <div className="text-4xl align-center text-center font-bold ">
        Our mission
      </div>
      <div className="flex flex-wrap w-[1000px] gap-24 mx-auto p-12">
        {Array.from({ length: 50 }, (_, i) => (
          <Dot key={i} mousePos={mousePos} />
        ))}
      </div>
      //{" "}
    </div>
  );
}
