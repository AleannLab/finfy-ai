"use client";

import { Button, Icon } from "@/components/atoms";
import { CardTemplate } from "@/components/molecules";
import { useNavigationOnboarding, useUser } from "@/hooks";
import { fetchUserById, updateUser } from "@/lib/store/features/user/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";

const CardSetupComplete = () => {
  const { prevStep } = useNavigationOnboarding();
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(user);

      if (!user?.id) {
        console.log("User not found. Refreshing page...");
        window.location.reload()
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [user?.id, router]);

  const handleClickComplete = () => {
    startTransition(async () => {
      try {
        if (user?.id) {
          await dispatch(
            updateUser({
              finished_onboarding: true,
            })
          );
          router.push("/dashboard");
        } else {
          window.location.reload()
        }
      } catch {
        toast.error("Something Wrong!");
      }

    });
  };
  return (
    <CardTemplate
      title={
        <>
          <Icon type={"ShieldCompleteIcon"} />
          <h4 className="text-xl text-[#547a91] font-semibold ">Success</h4>
        </>
      }
      classes={{
        cardHeader: "flex flex-col justify-center items-center",
        cardDescription: "text-center",
      }}
      description="Thank you! Registration finished"
    >
      <CardTemplate.Footer className="flex justify-between flex-col w-full gap-3 items-center mt-6">
        <Button variant="main" onClick={handleClickComplete} size="xl" full>
          {(isPending || !user?.id) ? <Loader2 className="animate-spin" /> : "Go to Dashboard"}
        </Button>
      </CardTemplate.Footer>
    </CardTemplate>
  );
};

export { CardSetupComplete };
