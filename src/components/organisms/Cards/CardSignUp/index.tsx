"use client";

import { CardTemplate } from "@/components/molecules";
import { useTransition } from "react";
import { Button, Field } from "@/components/atoms";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createAccountAction } from "@/lib/supabase/actions";
import { Loader2 } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { createUser, fetchUserByEmailOrPhone } from "@/lib/store/features/user/userSlice";
import { getErrorMessage, resetCookies } from "@/utils/helpers";
import Link from "next/link";

const CardSignUp = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const handleClickSignUpButton = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const name = formData.get("username") as string;
      const ERROR_DUPLICATE_CODE = "23505";
      try {
        resetCookies();
        const data: any = await dispatch(createUser({ email, name }));
        if (data?.error?.code !== ERROR_DUPLICATE_CODE) {
          const { errorMessage } = await createAccountAction(formData);
          if (errorMessage) {
            toast.error(errorMessage);
          } else {
            router.push(`/onboarding/select-plan`);
            router.push(`/onboarding/confirm-email?email=${encodeURIComponent(email)}`);
            toast.success("A verification code has been sent to your email!");
          }
        } else {
          toast.error("This user is already registered");
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };
  return (
    <CardTemplate descriptionBtn={<Link href="/login" className="text-black font-semibold ml-1">Log in</Link>} description="Already have an account?" title="Sign Up">
      <form action={handleClickSignUpButton}>
        <CardTemplate.Content className="flex flex-col gap-4 mt-4">
          <Field
            name="email"
            label={"Email"}
            full
            type="text"
            disabled={isPending}
          />
          <Field
            name="password"
            label={"Password"}
            full
            type="password"
            disabled={isPending}
          />
          <span className="text-[#A1A1AA] text-sm">Use 6-20 characters from at least 2 categories: letters, numbers, special characters.</span>
          <Field
            name="username"
            label={"Username"}
            full
            type="text"
            placeholder="Optional"
          />
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex flex-col gap-4 mt-6">
          <Button variant="outlineMain" disabled={isPending} className="" type="submit" size="xl" full>
            {isPending ? <Loader2 className="animate-spin" /> : "Sign up"}
          </Button>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardSignUp };
