import { routesOnboarding } from "@/utils/variables";

export type Classes = {
  wrapper?: string;
  container?: string;
};

export type PhoneInputFieldProps = {
  onChange: (phone: string) => void;
  value: string;
};


export type RouteOnboardingValues = typeof routesOnboarding[keyof typeof routesOnboarding];