"use client";

import { DropdownMenu, Icon } from "@/components/atoms";
import { FC, PropsWithChildren, useState } from "react";
import { ConfirmDeletePop, RenameTitleChatPop } from "@/components/molecules";
interface DropDownModalProps extends PropsWithChildren {
  chatId: string;
  title: string;
}

const DropDownModal: FC<DropDownModalProps> = ({ children, chatId, title }) => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <DropdownMenu onOpenChange={handleOpenChange} open={open}>
      <DropdownMenu.Trigger asChild>
        <div>{children}</div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-navy-25 border-navy-5 text-[#473513]">
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item className="flex cursor-pointer hover:bg-navy-5 items-center w-full gap-4">
            <Icon type="ShareIcon" className="w-6 h-6 stroke-grey-15" />
            <p>Share</p>
          </DropdownMenu.Item>
          <RenameTitleChatPop chatId={chatId} title={title} handleClose={handleClose}>
            <DropdownMenu.Item
              onSelect={(event) => event.preventDefault()}
              className="flex cursor-pointer hover:bg-navy-5 items-center w-full gap-4"
            >
              <Icon type="PenIcon" className="w-6 h-6 fill-grey-15" />
              <p>Rename</p>
            </DropdownMenu.Item>
          </RenameTitleChatPop>
          {/* <DropdownMenu.Item className="flex hover:bg-navy-5 items-center w-full gap-4">
            <Icon type="InboxIcon" className="size-4 text-grey-15" />
            <p>Archive</p>
          </DropdownMenu.Item> */}
          <ConfirmDeletePop chatId={chatId} handleClose={handleClose}>
            <DropdownMenu.Item
              onSelect={(event) => event.preventDefault()}
              className="flex cursor-pointer hover:bg-navy-5 items-center w-full gap-4 text-red-500 "
            >
              <Icon type="DeleteIcon" className="w-6 h-6 stroke-red-5" />
              <p>Delete</p>
            </DropdownMenu.Item>
          </ConfirmDeletePop>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export { DropDownModal };
