// import ConfirmEmail from "@/app/(auth)/confirm-email/page";
import {
  CardSelectRole,
  CardCurrentSelectRole,
  CardGradeLevel,
  CardSubject,
  CardSetupComplete,
  CardConfirmEmail
} from "@/components/organisms";
import { AddStripe } from "@/components/organisms/Cards/AddStripe";
import { RouteOnboardingValues } from "@/types";
import { routesOnboarding } from "@/utils/variables";
import { FC } from "react";

interface OnboardingStepPops {
  step: RouteOnboardingValues;
}

const stepComponents: {
  [key: string]: (props: any) => JSX.Element;
} = {
  [routesOnboarding.confirmEmail]: CardConfirmEmail,
  [routesOnboarding.selectRole]: CardSelectRole,
  [routesOnboarding.selectCurrentRole]: CardCurrentSelectRole,
  [routesOnboarding.gradeLevel]: CardGradeLevel,
  [routesOnboarding.setupComplete]: CardSetupComplete,
  [routesOnboarding.subject]: CardSubject,
  // [routesOnboarding.addStripe]: AddStripe,
};

const OnboardingStep: FC<OnboardingStepPops> = ({ step }) => {
  const CurrentStep = stepComponents[step];
  if (!CurrentStep) {
    return null;
  }
  return <CurrentStep />;
};

export { OnboardingStep };
