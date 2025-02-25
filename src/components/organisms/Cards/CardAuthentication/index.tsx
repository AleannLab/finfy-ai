"use client";

import { Button } from "@/components/atoms";
import { CardTemplate } from "@/components/molecules";

const CardAuthentication = () => {
  return (
    <CardTemplate
      classes={{
        cardTitle: "text-center",
      }}
      title="Welcome to Career Buddy!"
      description="Log in or sign up to access personalized career guidance, upload study materials and images, and receive tailored responses to help you succeed in school and beyond."
    >
      <CardTemplate.Content className="flex flex-col gap-4 mt-4" >
        <Button className="!rounded-md" size="xl" full href="/login" as="link">
          Log in
        </Button>
        {/* <Button className="!bg-transparent !rounded-md" size="xl" full href="/sign-up" as="link">
          Sign up
        </Button> */}
      </CardTemplate.Content>
      <CardTemplate.Footer className="flex flex-col w-full mt-6 justify-center items-center">
          <Button
            variant="link"
            size="xs"
            className="text-md-center rounded-md mx-auto  underline-offset-1 underline font-normal self-end"
            href="/reset-password"
            as="link"
          >
            Stay logged out
          </Button>
        </CardTemplate.Footer>
    </CardTemplate>
  );
};

export { CardAuthentication };
