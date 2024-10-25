import { ResetPasswordPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Career Buddy",
  description: "Chat",
};

const ResetPassword = () => {
  return <ResetPasswordPage />;
};

export default ResetPassword;
