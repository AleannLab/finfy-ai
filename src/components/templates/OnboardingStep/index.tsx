// import ConfirmEmail from "@/app/(auth)/confirm-email/page";
import {
  CardVerifyPhoneNumber,
  CardConfirmPhoneNumber,
  CardSelectPlan,
  CardPersonalize,
  CardUserPolicy,
  CardFinalUserPolicy,
  CardLinkAccount,
  CardSelectCurrency,
  CardSetupComplete,
  CardSelectCountry,
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
  // [routesOnboarding.confirmPhoneNumber]: CardConfirmPhoneNumber,
  // [routesOnboarding.selectPlan]: CardSelectPlan,
  // [routesOnboarding.personalize]: CardPersonalize,
  // [routesOnboarding.userPolicy]: CardUserPolicy,
  // [routesOnboarding.finalUserPolicy]: CardFinalUserPolicy,
  // [routesOnboarding.selectCountry]: CardSelectCountry,
  // [routesOnboarding.connectBank]: CardLinkAccount,
  // [routesOnboarding.selectCurrency]: CardSelectCurrency,
  // [routesOnboarding.addStripe]: AddStripe,
  [routesOnboarding.setupComplete]: CardSetupComplete,
};

const OnboardingStep: FC<OnboardingStepPops> = ({ step }) => {
  const CurrentStep = stepComponents[step];
  if (!CurrentStep) {
    return null;
  }
  return <CurrentStep />;
};

export { OnboardingStep };
