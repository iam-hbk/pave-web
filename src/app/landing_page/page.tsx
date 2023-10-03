import Mission from "@/components/Mission";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";

export default function Landing_page() {
  return (
    <div className="bg-white">
      <Navbar />
      <Welcome />
      <Mission />
    </div>
  );
}
