import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  // description: "Your personal assistant vir",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col content-center items-center p-20 ">
      {children}
    </div>
  );
}
