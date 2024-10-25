import { ConfirmEmailPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Email | Career Buddy",
  description: "Chat",
};

const ConfirmEmail = () => {
  return <ConfirmEmailPage />;
};

export default ConfirmEmail;
