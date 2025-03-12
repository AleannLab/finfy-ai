"use client";

import { CardTemplate } from "@/components/molecules";
import { Button, Field } from "@/components/atoms";
import { loginAction } from "@/lib/supabase/actions";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchUserByEmailOrPhone } from "@/lib/store/features/user/userSlice";
import { resetCookies } from "@/utils/helpers";
import { supabase } from "@/lib/supabase/client";

const CardLogin = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();

  const handleClickLogInButton = async (formData: FormData) => {
    startTransition(async () => {
      resetCookies();
      const { errorMessage } = await loginAction(formData);
      const email = formData.get("email") as string;
      console.log(email)

      if (errorMessage) {
        if (errorMessage.includes("Email not confirmed")) {
          console.log("Email not confirmed, resending verification code...");

          const { error: resendError } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: false },
          });

          if (resendError) {
            console.error("Error resending OTP:", resendError.message);
            toast.error("Failed to resend verification code. Please try again.");
          } else {
            toast.success("Verification code has been resent to your email.");
            router.push(`/onboarding/confirm-email?email=${encodeURIComponent(email)}`);
          }
        } else {
          toast.error(errorMessage);
        }
        return;
      }

      toast.success("Successfully logged in!");
      dispatch(fetchUserByEmailOrPhone());
      router.push("/onboarding");
    });
  };


  return (
    <CardTemplate
      title="Log in"
      description="To continue, please enter your password."
    >
      <form action={handleClickLogInButton}>
        <CardTemplate.Content className="flex flex-col gap-4 mt-4">
          <Field
            name="email"
            disabled={isPending}
            label={"Email"}
            full
            placeholder="Enter your email"
            type="email"
          />
          <Field
            name="password"
            disabled={isPending}
            label={"Password"}
            full
            placeholder="Enter your password"
            type="password"
          />
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex flex-col w-full mt-6 justify-center items-center">
          <div className="flex flex-col gap-4 mt-4 w-full">
            <Button disabled={isPending} variant="main" className="" size="xl" full type="submit">
              {isPending ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
            <Button
              disabled={isPending}
              size="xl"
              className="!hover:bg-white !hover:text-black rounded-lg"
              full
              href="/sign-up"
              variant="outlineMain"
              as="link"
            >
              Sign up
            </Button>
          </div>
          <Button
            variant="link"
            size="xs"
            className="text-md-center mx-auto mt-6  underline-offset-1 underline font-normal self-end"
            href="/reset-password"
            as="link"
          >
            Reset password
          </Button>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardLogin };
