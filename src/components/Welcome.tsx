export default function Welcome() {
  return (
    <div className="bg-[#fff9e6] h-[80vh] flex flex-row justify-center mb-5">
      <div className="flex w-[80%]">
        <div className="w-1/2 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl lg:text-5xl font-bold ">
            Welcome to Enhancing Your Academic Journey
          </h1>
          <button className="btn btn-primary mt-4">Sign up</button>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <img src="/assets/svgs/Education.svg" alt="Welcome" />
        </div>
      </div>
    </div>
  );
}
