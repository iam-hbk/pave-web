import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-white flex shadow relative z-10">
      <div className="logo w-full md:w-2/5 flex justify-center items-center">
        <Image
          width={111}
          height={32}
          src="/assets/svgs/Pave_Logo.svg"
          alt="Pave Logo"
        />
      </div>
      <div className="hidden md:flex md:w-3/5">
        <div className="links w-1/2 flex justify-center items-center px-4">
          <a className="btn btn-ghost normal-case text-md text-black">Home</a>
          <a className="btn btn-ghost normal-case text-md text-black">About</a>
          <a className="btn btn-ghost normal-case text-md text-black">
            Mission
          </a>
        </div>
        <div className="more-links w-1/2 flex justify-center gap-3 items-center px-4">
          <Link href={"/dashboard"} className="btn btn-ghost normal-case text-md">
            Sign Up
          </Link>
          <Link href="/dashboard" className="btn normal-case text-md btn-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
