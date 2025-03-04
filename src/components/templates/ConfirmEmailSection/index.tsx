import { Suspense } from "react";
import { CardConfirmEmail } from "@/components/organisms";

const ConfirmEmailSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardConfirmEmail />
    </Suspense>
  );
};

export { ConfirmEmailSection };
