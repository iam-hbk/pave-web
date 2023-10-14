import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CurrentQuizzes } from "@/components/CurrentQuizzes";

type Props = {};

const Page = (props: Props) => {
  

  return (
    <div className="m-6 h-fit rounded-xl bg-white p-5 shadow-md ">
      <h1 className="mb-6 text-2xl font-bold">Create a new quiz</h1>
      <section className="mb-10 grid grid-cols-1 gap-6 text-white md:grid-cols-2">
        <Link
          href="./quiz/form"
          className="bordered card bg-gradient-to-tr from-primary to-purple-600 transition-all duration-1000 hover:from-yellow-100 hover:to-primary hover:text-primary-content hover:shadow-lg"
        >
          <figure>
            <Image
              src="/assets/svgs/form.svg"
              width={130}
              height={130}
              alt="Form sheet"
            />
          </figure>
          <div className="card-body transition-none">
            <h2 className="card-title">Using a Form sheet</h2>
            <p>
              Create a quiz manually by using a form and setting your own
              questions.
            </p>
          </div>
        </Link>
        <Link
          className="bordered card bg-gradient-to-tr from-info to-secondary transition-all duration-300 hover:from-purple-400  hover:to-blue-600 hover:text-info-content hover:shadow-lg"
          href="./quiz/wizard"
        >
          <figure>
            <Image
              src="/assets/svgs/wizard.svg"
              width={130}
              height={120}
              alt="Form wizard"
            />
          </figure>
          <div className="card-body transition-none">
            <h2 className="card-title">Using the Form wizard</h2>
            <p>
              Upload your course material and let Pave AI generate a quiz for
              you.
            </p>
          </div>
        </Link>
      </section>
      <h1 className="mb-6 text-2xl font-bold">Your Quizzes</h1>
      <CurrentQuizzes />
    </div>
  );
};

export default Page;
