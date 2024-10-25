import { SignUpPage } from "@/components/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Career Buddy",
  description: "Chat",
};

const SignUp = () => {
  return <SignUpPage />;
};

export default SignUp;
