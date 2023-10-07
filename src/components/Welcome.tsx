import Image from "next/image";

export default function Welcome() {
  return (
    <div className="mb-5 flex h-[80vh] flex-row items-center justify-center bg-[#fff9e6]">
      <div className="flex w-[80%] flex-col md:w-[80%] md:flex-row">
        <div className="flex flex-grow flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-black lg:text-5xl">
            Welcome to Enhancing Your Academic Journey
          </h1>
          <button className="btn btn-primary mt-4">Sign up</button>
        </div>
        <div className="hidden items-center justify-center md:flex">
          <Image
            width={511}
            height={397}
            src="/assets/svgs/Education.svg"
            alt="Welcome"
          />
        </div>
      </div>
    </div>
  );
}
