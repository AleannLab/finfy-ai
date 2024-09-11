"use client";

import { Button, Field, Icon } from "@/components/atoms";
import { CardTemplate } from "@/components/molecules";
import { useForm } from "react-hook-form";
import { useNavigationOnboarding } from "@/hooks";

const CardFinalUserPolicy = () => {
  const { nextStep } = useNavigationOnboarding();
  const {
    setValue,
    getValues,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async () => {
    nextStep();
  };

  return (
    <CardTemplate description="And finally, while I strive to do my best in each conversation, I’m not perfect. Helper text">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardTemplate.Content>
          <p className="text-sm font-medium mt-2  text-grey-15">
            You should keep a few things in mind: Helper text
          </p>
          <div className="my-3 text-sm space-y-3 rounded-xl border border-navy-5 p-3 text-grey-15">
            <div className="flex">
              <div className="flex w-20 items-center">
                <Icon type="SwitchArrowsIcon" className="h-8" />
              </div>
              <p>
                Imaili&apos;s may occasionally generate incorrect or misleading
                information, or produce offensive or biased content.
              </p>
            </div>
            <div className="flex">
              <div className="flex w-28 items-center">
                <Icon type="GradHatIcon" className="h-8" />
              </div>
              <p>
                Imali is not intended to give advice, including legal,
                financial, & medical advice. Don&apos;t rely on our conversation
                alone without doing your own independent research.
              </p>
            </div>
            <div className="flex">
              <div className="flex w-24 items-center">
                <Icon type="GradHatIcon" className="h-8" />
              </div>
              <p>
                Imali may change usage limits, functionality, or policies as we
                learn more. You cfv upgrade your plan to get more access to
                Claude&apos;s features.
              </p>
            </div>
          </div>
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex gap-4 mt-4">
          <Button size="xl" full type="submit">
            Sounds Good, Let’s Begin
          </Button>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardFinalUserPolicy };
