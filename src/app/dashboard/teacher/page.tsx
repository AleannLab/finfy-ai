import { DashboardPage } from "@/components/pages";
import { LayoutDashboard } from "@/layout";
import { LayoutMaineDashboard } from "@/layout/LayoutMaineDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Career Buddy",
  description: "Chat",
};

const Dashboard = async () => {
  return (
    <LayoutMaineDashboard>
      <DashboardPage />
    </LayoutMaineDashboard>
  );
};

export default Dashboard;
