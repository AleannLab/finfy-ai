"use client";

import { CardTemplate } from "@/components/molecules";
import { useTransition } from "react";
import { Button, Field } from "@/components/atoms";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createUser, fetchUserByEmailOrPhone } from "@/lib/store/features/user/userSlice";
import { getErrorMessage, resetCookies } from "@/utils/helpers";
import { supabase } from "@/lib/supabase/client";
import * as Sentry from "@sentry/nextjs";
import { useNavigationOnboarding, useUser } from "@/hooks";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store/hooks";


const CardConfirmEmail = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { nextStep, prevStep } = useNavigationOnboarding();
  const userCurrent = useSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const otp = formData.get("otp") as string;
    dispatch(fetchUserByEmailOrPhone());


    if (!otp) {
      toast.error("Please enter the OTP code.");
      return;
    }

    console.log(userCurrent)
    if (!userCurrent?.email) {
      toast.error("User not created, please use another email");
      return;
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: userCurrent.email,
        token: otp,
        type: "email",
      });


      if (error) {
        Sentry.captureException(error);
        throw error;
      }

      toast.success("Your account has been verified!");
      nextStep();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

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
              right: <div className="text-[#c6cfde] text-base font-bold">47s</div>,
            }}
          />
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex flex-col gap-4 mt-6">
          <Button variant="outlineMain" disabled={isPending} className="" type="submit" size="xl" full>
            {isPending ? <Loader2 className="animate-spin" /> : "Verify"}
          </Button>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardConfirmEmail };
