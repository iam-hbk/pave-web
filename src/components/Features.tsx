import Image from "next/image";

export default function Features() {
  return (
    <div className="bg-[#fff9e6] w-full z-40">
      <div className="text-4xl text-center font-bold text-black p-5">
        Explore our Features
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center w-full text-center p-5">
        <div className="hidden md:flex z-10 order-2 md:order-1 mb-5 md:mb-0">
          <Image
            width={421}
            height={753}
            className="max-w-xs md:max-w-full"
            src="/assets/svgs/phone_features.svg"
            alt="phone"
          />
        </div>

        <div className="w-full md:w-[40%] p-5 md:p-20  md:ml-[-150px] rounded-lg z-0 bg-[#adc9fa] order-1 md:order-2">
          <ul className="ml-10">
            {[
              "Incentive-driven Participation",
              "Empowering Educators",
              "Seamless Mobile Experience",
              "Interactive Web Platform",
            ].map((feature) => (
              <li key={feature}>
                <div className="flex justify-start items-center">
                  <Image height={50} width={50} src="/assets/svgs/arrow_change.svg" alt="arrow" />
                  <div className="text-xl text-white p-2">{feature}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
