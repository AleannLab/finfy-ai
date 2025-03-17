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
      title={"Best Practices for Al Usage"}
      // title={
      //   <>
      //     <Icon type={"ShieldCompleteIcon"} />
      //     <h4 className="text-xl text-[#666] font-semibold ">Success</h4>
      //   </>
      // }
      classes={{
        cardHeader: "flex flex-col justify-center items-center",
        cardDescription: "text-center",
        card: "max-w-[688px] !max-h-[70vh] overflow-auto"
      }}
      description=""
    >
  <CardTemplate.Content>
    <div className="w-full px-4 sm:px-6 md:px-8">
      <ul className="list-disc list-outside pl-5 !text-[#666666] text-sm leading-[1.3] space-y-3">
        <li>
          <span className="font-semibold !text-[#666666]">Check for Bias:</span> 
          <span className="font-medium !text-[#666666]"> AI might occasionally produce biased or incorrect content. Always double-check before sharing with students.</span>
        </li>
        <li>
          <span className="font-semibold !text-[#666666]">The 80-20 Approach:</span> 
          <span className="font-medium !text-[#666666]"> Use AI for initial work, but make sure to add your final touch, review for bias and accuracy, and contextualize appropriately for the last 20%.</span>
        </li>
        <li>
          <span className="font-semibold !text-[#666666]">Your Judgment Matters:</span> 
          <span className="font-medium !text-[#666666]"> See AI-generated content as a starting point, not the final version. Always adhere to your school&apos;s guidelines.</span>
        </li>
        <li>
          <span className="font-semibold !text-[#666666]">Protect Privacy:</span> 
          <span className="font-medium !text-[#666666]"> Don&apos;t include personal student details like names or addresses. We strive to promptly remove any accidentally submitted information.</span>
        </li>
      </ul>
    </div>
  </CardTemplate.Content>
      <CardTemplate.Footer className="flex justify-between flex-col w-full gap-3 items-center mt-6">
        <Button className="max-w-[280px]" variant={(isPending || !user?.id) ? "outlineMain" : "main"} onClick={handleClickComplete} size="xl" full>
          {(isPending || !user?.id) ? <Loader2 className="animate-spin" /> : "I Acknowledge"}
        </Button>
      </CardTemplate.Footer>
    </CardTemplate>
  );
};

export { CardSetupComplete };
