import { AuthenticationPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Espen",
  description: "Chat",
};

const Authentication = async () => {
  return <AuthenticationPage />;
};

export default Authentication;
