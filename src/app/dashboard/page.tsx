import { useEffect } from "react";
import { useRouter } from "next/router";
import { connectSocket, disconnectSocket } from "@/utils/apis/socket";

const DashboardPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Connect the socket when the dashboard is accessed
    connectSocket();

    // Redirect to dashboard home
    router.push("/dashboard/home");

    // Disconnect the socket when leaving the dashboard
    return () => {
      disconnectSocket();
    };
  }, [router]);
  return null;
};

export default DashboardPage;
