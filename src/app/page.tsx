import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col content-center items-center p-4 gap-10 ">
      <h1 className="text-4xl font-bold text-center text-gray-900 ">
        Ready to start!
      </h1>
      <Button variant={"link"}>{"Let's go 🚀"}</Button>
    </div>
  );
}
