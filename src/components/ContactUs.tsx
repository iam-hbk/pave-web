import Image from "next/image";

export default function ContactUs() {
  return (
    <div className=" bg-[#adc9fa]">
      <div className="flex justify-center items-center h-[80vh]">
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <Image
            width={455}
            height={432}
            src="/assets/svgs/contact.svg"
            alt=""
          />
        </div>
        <div className="flex w-1/2 justify-start  flex-col">
          <div className="text-2xl text-white font-bold">Contact Us</div>
          <div className="text-white">
            Have questions or need assistance? We&apos;re here to help
          </div>
          <input
            type="text"
            placeholder="Name and Surname"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <br />
          <textarea
          
            className="textarea textarea-primary w-[500px]"
            placeholder="Message.."
          ></textarea>
        <button className="btn btn-primary mt-5 w-[120px]" >Submit</button>
        </div>

      </div>

      <div className="divider"></div>
      <div className="text-center text-white">
        Copyright © 2023 PAVE. All Rights Reserved. | Privacy Policy | Terms of
        Use
      </div>
    </div>
  );
}
