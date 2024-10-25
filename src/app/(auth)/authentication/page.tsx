import { AuthenticationPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Career Buddy",
  description: "Chat",
};

const Authentication = async () => {
  return <AuthenticationPage />;
};

export default Authentication;
