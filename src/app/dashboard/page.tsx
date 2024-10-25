import { DashboardPage } from "@/components/pages";
import { LayoutDashboard } from "@/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Career Buddy",
  description: "Chat",
};

const Dashboard = async () => {
  return (
    <LayoutDashboard>
      <DashboardPage />
    </LayoutDashboard>
  );
};

export default Dashboard;
