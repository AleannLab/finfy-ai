"use client";

import { FC, useEffect, useState } from "react";
import { Accordion, Button, Icon as IconComponent } from "@/components/atoms";
import { DropDownModal } from "@/components/molecules";
import Link from "next/link";
import { categorizeDate, cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types";
import { menuItems } from "./index.constants";
import { useChat, useSidebar } from "@/hooks";
import { extractDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import {
  fetchMessagesForChat,
  setChatId,
} from "@/lib/store/features/chat/chatSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { CreateNewChatPop } from "@/components/organisms";
interface MenuAccordionItemProps {
  item: MenuItem;
  contents: any;
  handleOpen?: any;
  isHideChevron?: boolean;
  href: string;
  onClick: () => void;
  OnChangeState: () => void;
}

const MenuAccordionItem: FC<MenuAccordionItemProps> = ({
  item,
  contents,
  isHideChevron,
  handleOpen,
  href,
  onClick,
  OnChangeState,
}) => {
  const { open, handleToggle } = useSidebar();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const Icon = item.icon;
  // Sort contents by date in descending order
  const sortedContents = [...contents].sort(
    (a, b) =>
      new Date(b.created_at || b.date).getTime() -
      new Date(a.created_at || b.date).getTime()
  );

  // Function to categorize and group contents by date
  const groupedContents = sortedContents.reduce((groups, content) => {
    const category = categorizeDate(
      content.created_at ? extractDate(content.created_at) : content.date
    );
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(content);
    return groups;
  }, {} as Record<string, { title: string; chatId: string; date: string }[]>);

  const handleClick = (link: string, chatId: string) => {
    router.push(link, undefined);
    if (chatId) {
      dispatch(fetchMessagesForChat(chatId as string));
      dispatch(setChatId(chatId as string));
    }
    handleToggle()
  };

  const isActive =
    pathname === item.link || pathname.startsWith(`${item.link}/`);
  const isActiveType =
    pathname.includes(item.href);

  return (
    <Accordion.Item className="flex flex-col max-w-full gap-0.5" value={item.value}>
      <Accordion.Trigger
        isOpen={isActiveType}
        isHideChevron={isHideChevron && !open}
        disabled={isHideChevron}
        onClick={() => {
          handleOpen()
          router.push(href)
          OnChangeState()
        }}
        className={cn("p-2 rounded-sm group", {
          "bg-[#547A91] text-[#f3f9fd] stroke-[#f3f9fd]": isActiveType,
        }, { "hover:text-[#f3f9fd] hover:stroke-[#f3f9fd] hover:bg-[#547A91]": !isActiveType })}
      >
        <div className={"flex justify-between w-full items-center"}>
          <Link
            href={href}
            onClick={onClick}
            className="flex gap-3 items-center"
          >
            <span className={cn("w-6 h-6 flex justify-center items-center group-hover:stroke-[#F3F9ED]", isActiveType ? "text-[#F3F9ED] stroke-[#F3F9ED]" : "stroke-[#547A91] text-[#547A91]")}>
              <Icon />
            </span>
            <span className={cn("group-hover:text-[#F3F9ED] ", isActiveType ? "text-[#F3F9ED] " : "")}>{item.title}</span>
          </Link>
          {isHideChevron && (
            <span className="text-[10px] font-normal">Coming Soon</span>
          )}
        </div>
      </Accordion.Trigger>
      {open && (
        <>
          {Object.keys(groupedContents).length ? (
            Object.entries(groupedContents).map(([group, contents]: any) => (
              <Accordion.Content key={group}>
                <p className="text-sm lg:text-xs my-1">{group}</p>
                {contents.filter((chat: any) => item.href.includes(chat?.type)).map((content: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={cn("flex justify-between !z-[200] max-w-[calc(100%-20px)] group lg:max-w-full hover:bg-[#547A91] p-2 rounded-sm", pathname.includes(content?.chatId) ? "bg-[#547A91] !text-[#F3F9ED]" : "")}
                    >
                      <button
                        onClick={() =>
                          handleClick(
                            content.chatId ? `${item.link}/${content.chatId}` : content.id ? `${item.link}/${content.id}` : item.link,
                            content.chatId
                          )
                        }
                        className="flex flex-col w-[90%] lg:w-[180px]"
                      >
                        <p className={cn("menu-list-btn max-w-[calc(100%)] text-start m-0 group-hover:text-white", pathname.includes(content?.chatId) ? " !text-[#F3F9ED]" : "text-[#547A91]")}>
                          {content.title}
                        </p>
                      </button>
                      {content.id && (
                        <DropDownModal chatId={content.chatId} title={content.title}>
                          <Button
                            className="!px-2 !z-[200] !py-0 !rounded-sm"
                            variant="ghost"
                          >
                            <IconComponent
                              type="DotsIcon"
                              className="stroke-grey-15 w-4 h-4"
                            />
                          </Button>
                        </DropDownModal>
                      )}
                    </div>
                  )
                })}
              </Accordion.Content>
            ))
          ) : (
            <>
              <Accordion.Content className="flex justify-between">
                {/* <Link
                  href={item.link}
                  className="menu-list-btn flex gap-1 ml-1 items-center"
                >
                  Start a new thread...
                </Link> */}
                <CreateNewChatPop>
                  <button
                    className="menu-list-btn bg-transparent  flex gap-1 ml-1 items-center"
                  >
                    Start a new thread...
                  </button>
                </CreateNewChatPop>
              </Accordion.Content>

            </>
          )}
        </>
      )}
    </Accordion.Item>
  );
};

const MenuAccordion: FC = () => {
  const { chats, handleResetChat } = useChat();
  const { handleOpen } = useSidebar();
  const [value, setValue] = useState('')
  const pathname = usePathname();

  useEffect(() => {

    if (pathname.includes('tutor')) {
      setValue('tutor')
    }
    if (pathname.includes('career-coach')) {
      setValue('career-coach')
    }
    if (pathname.includes('teacher')) {
      setValue('teacher')
    }
  }, [pathname])

  const handleAccordionToggle = (itemValue: string) => {
    // Toggle logic based on the current value and pathname
    setValue((prevValue) => {
      if (pathname.includes(itemValue)) {
        // If the current path matches and the accordion is open, toggle it closed
        return prevValue === itemValue ? '' : itemValue;
      }
      // Otherwise, set it to the given value
      return itemValue;
    });
  };

  return (
    <Accordion
      value={value}
      type="single"
      collapsible
      className="flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden max-w-full max-h-[calc(100vh-150px)] scrollbar-thin"
    >
      {menuItems.map((item) => (
        <MenuAccordionItem
          key={item.value}
          item={item}
          contents={item.value === "career-coach" || item.value === "tutor" || item.value === "teacher" ? chats : item.contents}
          handleOpen={handleOpen}
          isHideChevron={item.isHideChevron}
          onClick={() => {
            handleResetChat()
          }}
          OnChangeState={() => {
            handleAccordionToggle(item.value);
          }}
          href={item.href}
        />
      ))}
    </Accordion>
  );
};

export { MenuAccordion };
