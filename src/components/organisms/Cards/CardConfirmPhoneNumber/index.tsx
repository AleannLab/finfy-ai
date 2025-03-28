"use client";

import { Button, Field } from "@/components/atoms";
import { CardTemplate, ResendCodeWithTimer } from "@/components/molecules";
import { useNavigationOnboarding } from "@/hooks";
import { useTransition } from "react";
import { verifyPhoneUser } from "@/lib/supabase/actions";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateUser } from "@/lib/store/features/user/userSlice";

const CardConfirmPhoneNumber = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const user = useSelector((state: RootState) => state.user.user);
  const phone = searchParams.get("phone") || user?.phone;
  const { nextStep, prevStep } = useNavigationOnboarding();
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const code = formData.get("code") as string;
      const { errorMessage } = await verifyPhoneUser(phone as string, code);
      if (user?.id) {
        await dispatch(
          updateUser({
            phone: `+${phone}`,
          })
        );
      }
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        nextStep();
        toast.success("Phone number has been successfully verified!");
      }
    });
  };

  return (
    <CardTemplate
      title="First, let's create your account"
      description={`Please enter the code sent via text to: ${phone}`}
    >
      <form action={onSubmit}>
        <CardTemplate.Content>
          <Field disabled={isPending} full name={"code"} />
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex gap-4 mt-4">
          <div className="w-full">
            <Button className="!rounded-md"
              disabled={isPending} size="xl" full type="submit">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Verify & Create Account"
              )}
            </Button>
            <Button
              size="xl"
              type="button"
              onClick={prevStep}
              variant="destructive"
              full
              className="!rounded-md mt-2"
            >
              Back
            </Button>
            <ResendCodeWithTimer initialSeconds={60} phone={phone as string} />
          </div>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardConfirmPhoneNumber };
