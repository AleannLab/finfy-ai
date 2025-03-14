import { FinancialTab } from "@/components/organisms";
import { FC } from "react";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage: FC<ChatPageProps> = ({ params }) => {
  return (
    <div className="bg-navy-25 w-full overflow-auto p-10 flex flex-col min-h-full">
      <FinancialTab />
    </div>
  );
};

export default ChatPage;
