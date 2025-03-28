"use client";

import { Button, Field, Icon } from "@/components/atoms";
import { CardTemplate } from "@/components/molecules";
import { useForm } from "react-hook-form";
import { useNavigationOnboarding } from "@/hooks";

const CardFinalUserPolicy = () => {
  const { nextStep, prevStep } = useNavigationOnboarding();
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
    <CardTemplate
      description="And finally, while I strive to do my best in each conversation, I’m not perfect. Helper text"
      classes={{
        card: "max-w-xl",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardTemplate.Content>
          <p className="text-sm font-medium mt-2  text-grey-15">
            You should keep a few things in mind: Helper text
          </p>
          <div className="my-3 text-sm space-y-3 rounded-xl border border-navy-5 p-3 text-grey-15">
            <div className="flex gap-2">
              <div className="flex w-20 items-center">
                <Icon type="SwitchArrowsIcon" />
              </div>
              <p>
                <b>Accuracy Disclaimer:</b>
                While I aim to be helpful, Finfy may occasionally generate incomplete, misleading, or biased information. Please verify critical details independently.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex w-28 items-center">
                <Icon type="GradHatIcon" />
              </div>
              <p>
              <b>Guidance, Not Advice:</b>
                Finfy provides general assistance but does not offer professional legal, financial, or medical advice. Always consult a qualified expert for these matters.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex w-24 items-center">
                <Icon
                  type="MicroChipIcon"
                  className="w-10 h-10 stroke-grey-15"
                />
              </div>
              <p>
              <b>Guidance, Not Advice:</b>
                Finfy provides general assistance but does not offer professional legal, financial, or medical advice. Always consult a qualified expert for these matters.
              </p>
            </div>
          </div>
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex gap-4 mt-4">
          <Button size="xl" type="button" onClick={prevStep} variant="destructive" full>
            Back
          </Button>
          <Button size="xl" full type="submit">
            Sounds Good, Let’s Begin
          </Button>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardFinalUserPolicy };
