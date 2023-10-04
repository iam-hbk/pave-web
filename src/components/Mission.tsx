"use client"; // This is a client component 👈🏽
import Image from "next/image";
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
  const missionCards = [
    {
      icon: "/assets/svgs/arrow_change.svg",
      title: "The need for change",
      text: "At the University of Johannesburg, we believe that active student engagement is the key to a brigher future. Unfortunately, student participation in academic events has sometimes fallen short,impacting networking, skill development, and academic success.It's time for a change!",
    },
    {
      icon: "/assets/svgs/building.svg",
      title: "Building on Solid Ground",
      text: "We've created the Pave App with your success in mind.Our journey began with a thourough analysis of your needs and our objectives. We've harnessed the power of use case and context diagrams to create a robust system aligned with your goals",
    },
    {
      icon: "/assets/svgs/bulb.svg",
      title: "Crafting a Tailored Solution",
      text: "Our meticulous analysis phase ensures that the Pave App caters to your unique requirements.Design diagrams, including class diagrams and sequence diagrams, guarantee functionality and user experience that meet your expectations ",
    },
  ];

  return (
    <div className="relative bg-white flex flex-col z-20 h-[100vh]">
      <div className="text-4xl text-center font-bold text-black z-30">
        Our mission
      </div>
      <div className="md:flex block justify-center gap-10 z-30 mt-[20px]">
        {missionCards.map((card, index) => (
          <div
            key={index}
            className="card bg-white md:w-[25%] w-[90%] m-5  shadow-xl p-7 z-30 border"
          >
            <Image
              width={100}
              height={100}
              className="w-16 h-16"
              src={card.icon}
              alt="arrow"
            />
            <div className="card-title text-lg font-bold text-primary pt-3 ">
              {card.title}
            </div>
            <div className="text-md text-black pt-3 ">{card.text}</div>
          </div>
        ))}
      </div>
      <div className="hidden md:flex absolute flex-wrap w-[1080] gap-16 p-12 z-10">
        {Array.from({ length: 184 }, (_, i) => (
          <Dot key={i} mousePos={mousePos} />
        ))}
      </div>
    </div>
  );
}
