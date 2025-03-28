import { Plan } from "@/types";

export const plans: Plan[] = [
  {
    id: "prod_Qy3piK9enavVK3",
    name: "Plus",
    pricing: {
      id: 'test_plan_id',
      amount: 20,
      currency: "USD",
      billingCycle: "monthly",
      formattedPrice: "$20 / month",
    },
    description: {
      short:
        "Supercharge your team's work with a secure, collaborative workspace",
      detailed:
        "The Plus plan offers a secure workspace for teams, along with features like automatic account linking, advanced data analysis, and compliance with GDPR.",
    },
    features: {
      highlighted: [
        "40 Co-pilot Quick Financial Questions",
        "Link all your accounts automatically",
        "Access to Advance data analysis Imali specialized and finetunied AI Model",
        "Visualised up to 50 answers a day.",
        "GDPR compliant",
      ],
    },
    ctaButton: {
      label: "You current plan",
      isDisabled: true,
      type: "primary",
      link: null,
    },
  },
  {
    id: "prod_Qy6ifkcyqiKiwT",
    name: "Team",
    pricing: {
      id: 'team_id',
      amount: 25,
      currency: "USD",
      billingCycle: "yearly",
      formattedPrice: "$25 / month",
    },
    description: {
      short:
        "Supercharge your team's work with a secure, collaborative workspace",
      detailed:
        "The Team plan is perfect for larger teams that need more advanced features, such as enhanced collaboration and data visualization.",
    },
    features: {
      highlighted: [
        "40 Co-pilot Quick Financial Questions",
        "Link all your accounts automatically",
        "Access to Advance data analysis Imali specialized and finetunied AI Model",
        "Visualised up to 50 answers a day.",
        "GDPR compliant",
      ],
    },
    ctaButton: {
      label: "Contact sales",
      isDisabled: false,
      type: "secondary",
      link: "/contact-sales",
    },
  },
];
