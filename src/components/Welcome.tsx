export default function Welcome() {
  return (
    <div className="bg-[#fff9e6] h-[80vh] flex flex-row justify-center items-center mb-5">
      <div className="flex w-[80%] md:w-[80%] flex-col md:flex-row">
        <div className="flex-grow flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-black">
            Welcome to Enhancing Your Academic Journey
          </h1>
          <button className="btn btn-primary mt-4">Sign up</button>
        </div>
        <div className="flex justify-center items-center hidden md:flex">
          <img src="/assets/svgs/Education.svg" alt="Welcome" />
        </div>
      </div>
    </div>
  );
}
