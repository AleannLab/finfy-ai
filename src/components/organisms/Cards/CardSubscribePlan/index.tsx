"use client";

import { Icon } from "@/components/atoms";
import { CardTemplate } from "@/components/molecules";
import { Plan } from "@/types";
import { FC } from "react";
import { BillingCycle } from "../../Tabs/SettingsTab/SubscriptionTab";
import clsx from "clsx";
import { useUser } from "@/hooks";
import { redirectToStripeCheckout, redirectToStripeCustomerProtal, StripeCheckoutMode, StripeCustomerPortalFlowType } from "@/lib/stripe";
import { useRouter } from "next/navigation";

interface CardSubscribePlanProps {
  plan: Plan;
  pricesForUpdate?: string[];
  subscription?: string | null;
  billingCycle?: BillingCycle;
  setBillingCycle?: (value: BillingCycle) => void;
}

const CardSubscribePlan: FC<CardSubscribePlanProps> = ({ plan, pricesForUpdate, subscription, billingCycle, setBillingCycle }) => {
  const { user } = useUser();
  const router = useRouter();

  const handleCTAButton = async () => {
    if (billingCycle) {
      if (user) {
        if (subscription && pricesForUpdate) {
          const stripeCustomerPortalRedirectUrl = await redirectToStripeCustomerProtal({
            customerId: `${user?.customer_id}`,
            subscriptionId: subscription,
            path: window.location.href,
            productToUpdate: {
              product: plan.id,
              prices: pricesForUpdate
            },
            stripeCustomerPortalFlowType: StripeCustomerPortalFlowType.SUBSCRIPTION_UPDATE
          })

          window.location.assign(stripeCustomerPortalRedirectUrl as string);
        } else {
          const stripeCheckoutRedirectUrl = await redirectToStripeCheckout({
            customer: `${user?.customer_id}`,
            supabaseUserId: `${user?.id}`,
            mode: StripeCheckoutMode.SUBSCRIPTION,
            email: `${user?.email}`,
            currency: plan.pricing.currency,
            path: window.location.href,
            cancelUrl: window.location.href,
            priceId: plan.pricing.id
          })
          window.location.assign(stripeCheckoutRedirectUrl as string);
        }
      }
    } else {
      router.push(plan.ctaButton.link as string);
    }
  }

  return (
    <CardTemplate className="mx-auto">
      <CardTemplate.Content className="relative">
        <div className="bg-navy-25 mx-auto rounded-xl p-6 max-w-sm text-white">
          {billingCycle && setBillingCycle && <div className="flex absolute -top-11 left-[28%] bg-[#272E48]  px-4 py-2 items-center justify-center gap-2 mb-6 rounded-full !border !border-[#374061] w-fit">
            <span className={clsx("text-gray-400 text-sm cursor-pointer hover:text-white", {"!text-[#515AD9]" : billingCycle === BillingCycle.MONTHLY})} onClick={() => setBillingCycle(BillingCycle.MONTHLY)}>
              Monthly
            </span>
            <span className={clsx("text-gray-400 text-sm cursor-pointer hover:text-white", {"!text-[#515AD9]": billingCycle === BillingCycle.ANNUALLY})} onClick={() => setBillingCycle(BillingCycle.ANNUALLY)}>
              Annually
            </span>
          </div>}

          <h2 className="text-3xl font-bold mb-6">{plan.name}</h2>
          <p className="text-2xl font-semibold mb-6">
            {plan.pricing.formattedPrice}
          </p>
          <p className="text-sm text-gray-400 mb-6 italic">{plan.description.short}</p>

          <ul className="space-y-2 mb-6">
            {plan.features.highlighted.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-400 gap-2 text-sm">
                <span><Icon type="CheckIcon"/></span> {feature}
              </li>
            ))}
          </ul>

          <button
            disabled={plan.ctaButton.isDisabled}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              plan.ctaButton.isDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#6870DA]"
            }`}
            onClick={handleCTAButton}
          >
            {plan.ctaButton.label}
          </button>
        </div>
      </CardTemplate.Content>
      <CardTemplate.Footer className="flex justify-between items-center mt-6"></CardTemplate.Footer>
    </CardTemplate>
  );
};

export { CardSubscribePlan };
