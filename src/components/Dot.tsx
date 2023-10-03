import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const BIG_SIZE = 90;
const SMALL_SIZE = 2;
const PER_PX = 0.3;

export default function Dot({
  mousePos,
}: {
  mousePos: { x: number; y: number };
}) {
  const size = useSpring(SMALL_SIZE, {
    damping: 30,
    stiffness: 200,
  });
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current) return;
    const { x, y } = mousePos;
    const { x: dotX, y: dotY } = dotRef.current.getBoundingClientRect();

    const distance = Math.sqrt(
      Math.pow(Math.abs(x - dotX), 2) + Math.pow(Math.abs(y - dotY), 2)
    );
    size.set(Math.max(BIG_SIZE - PER_PX * distance, SMALL_SIZE));
  }, [mousePos, size]);

  return (
    <div ref={dotRef} className="relative">
      <motion.div
        className="
        bg-primary rounded-full absolute -translate-y-1/2 -translate-x-1/2 z-0"
        style={{ width: size, height: size }}
      ></motion.div>
    </div>
  );
}
