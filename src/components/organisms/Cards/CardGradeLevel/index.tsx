"use client";

import { Button } from "@/components/atoms";
import { useRouter } from "next/navigation";
import { CardTemplate } from "@/components/molecules";
import { useForm } from "react-hook-form";
import { useNavigationOnboarding, useUser } from "@/hooks";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const gradeOptions = [
  "Foundation Phase (Grades 1 - 3)",
  "Intermediate Phase (Grades 4 - 6)",
  "Senior Phase (Grades 7 - 9)",
  "FET Phase (Grades 10 - 12)",
  "Higher Education (College & University)",
  "Professional Learning and Development",
];

const CardGradeLevel = () => {
  const { updateUser, statusUpdate, user } = useUser();
  const { nextStep, prevStep } = useNavigationOnboarding();
  const route = useRouter();
  const [selectedGrades, setSelectedGrades] = useState(
    user?.grade ? JSON.parse(user.grade) : []
  );

  const toggleGrade = (grade: string) => {
    setSelectedGrades((prev: any[]) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (user?.id) {
      try {
        await updateUser({ grade: JSON.stringify(selectedGrades) });
        toast.success("Grades successfully saved!");       
        nextStep();
      } catch (error) {
        toast.error("Failed to save grades.");
      }
    }
  };
  

  return (
    <CardTemplate
      title="What grade level(s) do you serve?"
      description="We currently offer tools for High School students (Grades 10–12). To help us expand and prioritize our development, please let us know which educational levels you'd like us to focus on next."
      classes={{
        card: "max-w-[605px] w-full",
        cardHeader: "!text-center",
        cardTitle: "!text-center",
      }}
    >
      <form onSubmit={onSubmit}>
        <CardTemplate.Content>
          <div className="w-full flex flex-wrap justify-center gap-3">
            {gradeOptions.map((grade) => (
              <div
                key={grade}
                className={`px-4 py-2 rounded-lg border cursor-pointer transition-all duration-200 flex justify-center items-center gap-2.5 text-sm font-medium leading-tight w-full sm:w-auto ${selectedGrades.includes(grade) ? "border-black" : "border-[#E9E9E9]"}`}
                onClick={() => toggleGrade(grade)}
              >
                {grade}
              </div>
            ))}
          </div>
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex flex-col gap-2 max-w-[280px] mt-4 mx-auto w-full">
          <Button variant="main" type="submit" size="xl" full disabled={statusUpdate === "loading" || !selectedGrades?.length}>
            {statusUpdate === "loading" ? <Loader2 className="animate-spin" /> : "Next"}
          </Button>
          <Button onClick={prevStep} variant="outlineMain" type="button" size="xl" full>
            Back
          </Button>
        </CardTemplate.Footer>
      </form>
    </CardTemplate>
  );
};

export { CardGradeLevel };