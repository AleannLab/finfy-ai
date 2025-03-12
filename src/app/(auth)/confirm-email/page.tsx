import { ConfirmEmailPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Email | Espen",
  description: "Chat",
};

const ConfirmEmail = () => {
  return <ConfirmEmailPage />;
};

export default ConfirmEmail;
