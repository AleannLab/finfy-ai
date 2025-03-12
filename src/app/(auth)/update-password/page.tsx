import { UpdatePasswordPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password | Espen",
  description: "Chat",
};

const UpdatePassword = () => {
  return <UpdatePasswordPage />;
};

export default UpdatePassword;
