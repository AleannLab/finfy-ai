import { LoginPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Career Buddy",
  description: "Chat",
};


const Login = () => {
  return <LoginPage />;
};

export default Login;
