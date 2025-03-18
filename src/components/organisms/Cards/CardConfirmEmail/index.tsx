"use client";

import { CardTemplate } from "@/components/molecules";
import { useEffect, useTransition } from "react";
import { Button, Field } from "@/components/atoms";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createUser, fetchUserByEmailOrPhone, updateUser } from "@/lib/store/features/user/userSlice";
import { getErrorMessage, resetCookies } from "@/utils/helpers";
import { supabase } from "@/lib/supabase/client";
import * as Sentry from "@sentry/nextjs";
import { useNavigationOnboarding, useUser } from "@/hooks";
import { useAppDispatch } from "@/lib/store/hooks";
import { useSearchParams } from "next/navigation";
import { signOutAction } from "@/lib/supabase/actions";

export const dynamic = "force-dynamic";


const CardConfirmEmail = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { nextStep, prevStep } = useNavigationOnboarding();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { user } = useUser();

  useEffect(() => {

    if (user?.email_verified_at) {
      // toast.success("Your account has been verified!");
      nextStep();
    }

  }, [user])



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const otp = formData.get("otp") as string;
    dispatch(fetchUserByEmailOrPhone());

    const email = searchParams.get("email");

    if (!email) {
      toast("Please login again or use another email to sign up");
      const error = await signOutAction();
      router.push("/login")     
      return;
    }

    if (!otp) {
      toast.error("Please enter the OTP code.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: "signup",
      });

      if (error?.message.includes("Token has expired") || error?.message.includes("is invalid")) {
        console.log("Token expired or invalid, resending OTP...");

        const { error: resendError } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: true },
        });

        if (resendError) {
          console.error("Error resending OTP:", resendError.message);
          toast.error("Failed to resend OTP. Please try again later.");
        } else {
          toast.success("New OTP has been sent to your email.");
        }
      }

      await dispatch(fetchUserByEmailOrPhone());
      await dispatch(updateUser({ email_verified_at: new Date().toISOString() }));



      if (error) {
        Sentry.captureException(error);
        throw error;
      }

      toast.success("Your account has been verified!");
      nextStep();
    } catch (error) {
      router.push("/sign-up")
      toast.error(getErrorMessage(error));
    }
  };
  const email = searchParams.get("email");

  return (
    <CardTemplate
      title="Enter 6-digit code"
      description="We have sent a verification code to you."
      classes={{ cardHeader: "text-center" }}
    >
      <form onSubmit={handleSubmit}>
        <CardTemplate.Content className="flex flex-col gap-4 mt-4">
          <Field
            name="otp"
            className="text-gray-400 text-base font-medium leading-normal"
            full
            type="text"
            placeholder="Digit Code"
            sideElements={{
              right: <></>,
              // right: <div className="text-[#c6cfde] text-base font-bold">47s</div>,
            }}
          />
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex flex-col gap-4 mt-6">
          <Button variant="outlineMain" disabled={isPending} className="" type="submit" size="xl" full>
            {isPending ? <Loader2 className="animate-spin" /> : email ? "Verify" : "Get new code"}
          </Button>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardConfirmEmail };
