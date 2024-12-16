import { Icon } from "@/components/atoms";
import { plans } from "@/utils/constants";
import { CardSubscribePlan } from "@/components/organisms";
import { Plan } from "@/types";
import { useUser } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

export enum BillingCycle {
  MONTHLY = 'monthly',
  ANNUALLY = 'annually'
}

export enum PlanType {
  PERSONAL = 'personal',
  BUSINESS = 'business'
}

function transformStripeProduct(stripeProduct: any): Plan[] {
  const { id, name, prices } = stripeProduct;

  const transformedPrices = prices.map((price: any) => {
    const { unit_amount, currency, recurring, metadata, id: priceId } = price;
    const billingCycle = recurring?.interval === "month" ? BillingCycle.MONTHLY : BillingCycle.ANNUALLY;

    return {
      id,
      name,
      pricing: {
        id: priceId,
        amount: unit_amount / 100,
        currency: currency.toUpperCase(),
        billingCycle,
        formattedPrice: `$${(unit_amount / 100).toLocaleString()} / ${
          billingCycle === "monthly" ? "month" : "year"
        }`,
      },
      description: {
        short: metadata.description,
        detailed: `Features include: ${Object.keys(metadata)
          .filter((key) => key.startsWith("feature"))
          .map((key) => metadata[key])
          .join(", ")}.`,
      },
      features: {
        highlighted: Object.keys(metadata)
          .filter((key) => key.startsWith("feature"))
          .map((key) => metadata[key]),
      },
      ctaButton: {
        label: `Choose ${billingCycle} plan`,
        isDisabled: false,
        type: "primary",
        link: null,
      },
    };
  });

  return transformedPrices;
}

const SubscriptionTab = () => {
  const { user } = useUser();
  const subscriptionId = user?.subscribe_plan; // ID підписки користувача

  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY);
  const [stripePlans, setStripePlans] = useState<Plan[]>([]);
  const [planType, setPlanType] = useState<PlanType>(PlanType.PERSONAL)

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const response = await fetch(
          `/api/stripe-subscription?subscriptionId=${subscriptionId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subscription");
        }

        const subscription = await response.json();
        const planId = subscription.items.data[0]?.price.product;
        setCurrentPlanId(planId);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    if (subscriptionId) {
      fetchCurrentPlan();
    }
  }, [subscriptionId]);

  useEffect(() => {
    const fetchStripeProducts = async () => {
      try {
        const response = await fetch(
          `/api/stripe-products?currency=usd`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stripe products");
        }

        const products = await response.json();

        if (products.length > 0) {
          const formattedProducts = transformStripeProduct(products[0]);
          setStripePlans(formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
      
    fetchStripeProducts();
  }, []);

  const plan  = useMemo(() => {
    if (planType === PlanType.PERSONAL) {
      return stripePlans.find((stripePlan) => stripePlan.pricing.billingCycle === billingCycle);
    } else {
      return plans[1];
    }
  },[billingCycle, stripePlans, planType])


  console.log(plan, currentPlanId, plans);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="my-9">
      <div className="p-4 border rounded-md bg-navy-15 border-navy-5">
        <div className="flex flex-col gap-4 mb-8">
          <h3 className="flex gap-2 text-2xl font-semibold text-white items-center">
            <Icon
              type="DollarIcon"
              className="w-6 h-6 stroke-transparent fill-white"
            />
            Subscriptions
          </h3>
          <div className="w-full flex gap-2 text-lg font-semibold text-white justify-center">
            Upgrade your plan
          </div>
          <div className="flex items-center justify-center ">
              <div className={clsx("p-1 h-fit flex items-center gap-3 rounded-full border border-[#374061]")}>
                  <button
                      className={clsx('w-1/2 rounded-full p-2 font-medium text-sm', {"bg-[#515AD9] text-white" : planType === PlanType.PERSONAL})}
                      onClick={() => setPlanType(PlanType.PERSONAL)}
                  >
                      Personal
                  </button>
                  <button
                      className={clsx('w-1/2 rounded-full p-2 font-medium text-sm ', {"bg-[#515AD9] text-white" : planType === PlanType.BUSINESS})}
                      onClick={() => setPlanType(PlanType.BUSINESS)}
                  >
                      Business
                  </button>
              </div>
          </div>
          <div className="mx-auto">
            {plan ? (
              <CardSubscribePlan plan={plan as Plan} billingCycle={planType === PlanType.PERSONAL ? billingCycle : undefined} setBillingCycle={planType === PlanType.PERSONAL ? setBillingCycle : undefined} />
            ) : (
              <div className="text-white">No plan found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SubscriptionTab };
