import { EmbedTerms } from "@/components/atoms";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="text-[#547a91] text-3xl font-bold">Privacy Policy</h1>
      <EmbedTerms documentType="privacy" />
    </div>
  );
};

export { PrivacyPolicy };
