"use client";

import { Button, Field } from "@/components/atoms";
import { useRouter } from "next/navigation";
import { CardTemplate } from "@/components/molecules";
import { useForm } from "react-hook-form";
import { useNavigationOnboarding, useUser } from "@/hooks";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const subjectOptions = [
  "All subjects (FET)",
  "Accounting",
  "Economic Management Science",
  "History",
  "Geography",
  "Information Systems",
  "Life Sciences",
  "Computer Application Technology",
  "Business Studies",
  "Math",
  "Mathematics Literacy",
  "English HL",
  "English FAL",
  "Afrikaans HT",
  "Afrikaans EAT",
  "Coding & Robotics",
  "Social Science",
  "Technology",
  "Natural Science",
];


const CardSubject = () => {
  const { updateUser, statusUpdate, user } = useUser();
  const { nextStep, prevStep } = useNavigationOnboarding();
  const route = useRouter();
  const [selectedSubject, setSelectedSubject] = useState(
    user?.subject ? JSON.parse(user.subject) : []
  );
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customSubject, setCustomSubject] = useState("");


  const toggleGrade = (subject: string) => {
    setSelectedSubject((prev: any[]) =>
      prev.includes(subject) ? prev.filter((g) => g !== subject) : [...prev, subject]
    );
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (user?.id) {
      try {
        const updatedSubjects = customSubject
          ? [...selectedSubject, customSubject]
          : selectedSubject;

        await updateUser({ subject: JSON.stringify(updatedSubjects) });
        toast.success("Subjects successfully saved!");
        nextStep();
      } catch (error) {
        toast.error("Failed to save subjects.");
      }
    }
  };


  return (
    <CardTemplate
      title="What subject(s) do you teach?"
      description="We’ll recommend the tools that are most popular for your key subjects."
      classes={{
        card: "max-w-[618px] !max-h-[70vh] overflow-auto w-full",
        cardHeader: "!text-center",
        cardTitle: "!text-center",
      }}
    >
      <form onSubmit={onSubmit}>
        <CardTemplate.Content>
          <div className="w-full flex flex-wrap justify-center gap-3">
            {subjectOptions.map((subject) => (
              <div
                key={subject}
                className={`px-4 py-2 rounded-lg border cursor-pointer transition-all duration-200 flex justify-center items-center gap-2.5 text-sm font-medium leading-tight w-full sm:w-auto ${selectedSubject.includes(subject) ? "border-black" : "border-[#E9E9E9]"}`}
                onClick={() => toggleGrade(subject)}
              >
                {subject}
              </div>
            ))}
          </div>
          <div className="self-stretch inline-flex w-full flex-col justify-start items-center gap-1 mt-4">
            <div
              className="justify-start mx-auto text-black text-base font-semibold underline leading-normal cursor-pointer"
              onClick={() => setShowCustomInput(true)}
            >
              I don’t see my subject
            </div>
            {showCustomInput && (
              <div className="self-stretch flex flex-col justify-start items-start gap-2 mt-2">
                <div className="self-stretch justify-start text-[#666666] text-sm font-semibold leading-tight">Enter your subject</div>
                <Field
                  full
                  placeholder="subject"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="self-stretch outline-offset-[-1px]"
                />
              </div>
            )}
          </div>
        </CardTemplate.Content>
        <CardTemplate.Footer className="flex flex-col gap-2 max-w-[280px] mt-4 mx-auto w-full">
          <Button variant="main" type="submit" size="xl" full disabled={statusUpdate === "loading" || !selectedSubject?.length}>
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

export { CardSubject };