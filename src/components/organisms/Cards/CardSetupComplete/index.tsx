"use client";

import { Button, Icon } from "@/components/atoms";
import { CardTemplate } from "@/components/molecules";
import { useNavigationOnboarding, useUser } from "@/hooks";
import { fetchUserById, setDataUser, updateUser } from "@/lib/store/features/user/userSlice";
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
      if (!user?.id) {
        console.warn("User not found. Refreshing page...");
        router.refresh();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [user?.id, router]);

  const handleClickComplete = () => {
    startTransition(async () => {
      try {
        if (user?.id) {
          await dispatch(setDataUser(user?.id));
          if (user?.id) {
            await dispatch(
              updateUser({
                finished_onboarding: true,
              })
            );
          }
          router.push("/dashboard");
        } else {
          router.refresh();
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
          <h4 className="text-xl text-[#473513] font-semibold ">Success</h4>
        </>
      }
      classes={{
        cardHeader: "flex flex-col justify-center items-center",
        cardDescription: "text-center",
      }}
      description="Thank you! Registration finished"
    >
      <CardTemplate.Footer className="flex justify-between flex-col w-full gap-3 items-center mt-6">
        <Button onClick={handleClickComplete} size="xl" full>
          {(isPending || !user?.id) ? <Loader2 className="animate-spin" /> : "Go to Dashboard"}
        </Button>
      </CardTemplate.Footer>
    </CardTemplate>
  );
};

export { CardSetupComplete };
