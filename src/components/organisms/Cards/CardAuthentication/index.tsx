"use client";

import { Button } from "@/components/atoms";
import { CardTemplate } from "@/components/molecules";

const CardAuthentication = () => {
  return (
    <CardTemplate
      classes={{
        cardTitle: "text-center",
        card: "",
        cardDescription: "text-center text-[#666]"
      }}
      title="Welcome to Espen!"
      description="Log in or sign up for personalized AI tutoring, career guidance, homework help, exam strategies, and multilingual revision notes. Teachers also receive instant CAPS lesson plans, assessment creation and other intervention tools"
    >
      <CardTemplate.Content className="flex flex-col gap-2 mt-4" >
        <Button variant="main" className="!rounded-md" size="xl" full href="/login" as="link">
          Log in
        </Button>
        <Button variant="outlineMain" className="!rounded-md" size="xl" full href="/sign-up" as="link">
          Sign up
        </Button>
      </CardTemplate.Content>
      <CardTemplate.Footer className="flex flex-col w-full mt-6 justify-center items-center">
          <Button
            variant="link"
            size="xs"
            className="text-md-center rounded-md mx-auto  underline-offset-1 underline font-normal self-end"
            href="/authentication"
            as="link"
          >
            Stay logged out
          </Button>
        </CardTemplate.Footer>
    </CardTemplate>
  );
};

export { CardAuthentication };
