"use client";
import { Accordion, Icon } from "@/components/atoms";
import {
  UserAvatar,
  PersonalizePop,
  ThemeButtons,
} from "@/components/molecules";
import { useSidebar, useUser } from "@/hooks";
import { signOutAction } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSettings = () => {
  const route = useRouter();
  const { user } = useUser();
  const { open: openSidebar } = useSidebar();
  const [open, setOpen] = useState(false);
  const handleClickLogOut = async () => {
    const error = await signOutAction();
    console.log(error, "error");
    route.push("/authentication");
  };
  return (
    <div
      className={cn("menu-button-btn mx-auto flex space-x-2 text-[#666] border-t border-[#666]/30 items-center", {
        "lg:!px-1 lg:!py-2 lg:justify-center": !openSidebar,
      })}
    >
      <Accordion
        onValueChange={(value) => setOpen(Boolean(value))}
        type="single"
        collapsible
        className={cn("w-full", {
          "block lg:hidden": !openSidebar,
        })}
      >
        <Accordion.Item value="item-1">
          <Accordion.Trigger className="text-nowrap">
            <UserAvatar src={user?.avatar_url} className="!border-none w-9 h-9 rounded-md !ml-0  " />
            <span className="text-[#666] max-w-[132px] w-[calc(100%-32px)] truncate overflow-clip">{user?.name}</span>
          </Accordion.Trigger>
          <Accordion.Content className="mt-5 justify-start">
            {/* <p className="text-grey-15 text-xs mb-2">Appearance</p> */}
            {/* <ThemeButtons /> */}
            <p className="text-black text-xs my-2">Quick settings</p>
            <div className="flex items-center cursor-pointer group hover:text-[#666] mb-1">
              <Icon
                type="SparkleIcon"
                className="w-4 h-4 stroke-white group-hover:stroke-[#666] mr-1"
              />
              <PersonalizePop />
            </div>
            <Link
              href="/dashboard/settings"
              className="flex items-center  text-sm cursor-pointer group hover:text-[#666] mb-1"
            >
              <Icon
                type="GearIcon"
                className="fill-black min-w-4 h-4 group-hover:fill-[#666] mr-1"
              />
              All settings
            </Link>
            <button
              onClick={handleClickLogOut}
              type="button"
              className="flex items-center text-sm cursor-pointer group hover:text-[#666]"
            >
              <Icon
                type="LoginIcon"
                className="w-4 h-4 stroke-black group-hover:stroke-[#666] mr-1"
              />
              Log Out
            </button>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <UserAvatar src={user?.avatar_url}
        className={cn(
          " hidden justify-center items-center !border-none w-9 h-9 rounded-md !ml-0 ",
          {
            "lg:flex": !openSidebar,
          }
        )}
      />
      {!open && openSidebar && (
        <Link
          href="/dashboard/settings">
          <Icon type="GearIcon" className="min-w-4 h-4 !ml-3 fill-[#547a91]" />

        </Link>
      )}
    </div>
  );
};

export { UserSettings };
