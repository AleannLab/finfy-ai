import { EmbedTerms } from "@/components/atoms";

const TermsOfServicePolicy = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="text-[#666] text-3xl font-bold">Terms of Service</h1>
      <EmbedTerms documentType="tos" />
    </div>
  );
};

export { TermsOfServicePolicy };
