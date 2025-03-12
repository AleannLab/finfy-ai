import { ResetPasswordPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Espen",
  description: "Chat",
};

const ResetPassword = () => {
  return <ResetPasswordPage />;
};

export default ResetPassword;
