"use client";

import { Button, Field, Select } from "@/components/atoms";
import { CardTemplate } from "@/components/molecules";
import { useForm } from "react-hook-form";
import { useNavigationOnboarding, useUser } from "@/hooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const CardCurrentSelectRole = () => {
  const { updateUser, statusUpdate, user } = useUser();
  const { nextStep, prevStep } = useNavigationOnboarding();
  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      currentRole: user?.currentRole || "",
    },
  });

  const onSubmit = async (values: { currentRole?: string }) => {
    if (user?.id) {
      // await updateUser({ currentRole: values.currentRole });
      // toast.success("The name was successfully saved!");
      nextStep();
    }
  };

  const roleOptions = [
    "Principle",
    "Deputy Principle",
    "Teacher",
    "Finance Department",
    "Admissions Department",
    "Sports Department",
    "ICT Department",
    "Other",
  ];

  return (
    <CardTemplate
      title="What’s your role?"
      description="Already have an account? We have tools to save time for every role. Help us help you!"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardTemplate.Content>
          <Select
            value={watch("currentRole")}
            onValueChange={(value) => setValue("currentRole", value)}
            disabled={statusUpdate === "loading"}
          >
            <Select.Trigger>
              <Select.Value placeholder="Select your role" />
            </Select.Trigger>
            <Select.Content className="bg-white">
              {roleOptions.map((role) => (
                <Select.Item key={role} value={role}>
                  {role}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex gap-4 flex-col mt-4">
          <Button variant="main" disabled={statusUpdate === "loading"} className="" type="submit" size="xl" full>
            {statusUpdate === "loading" ? <Loader2 className="animate-spin" /> : "Next"}
          </Button>
          <Button onClick={prevStep} variant="outlineMain" className="" type="button" size="xl" full>
            Back
          </Button>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardCurrentSelectRole };
