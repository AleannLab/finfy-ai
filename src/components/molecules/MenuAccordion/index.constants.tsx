import { MenuItem } from "@/types";
import { Icon } from "@/components/atoms";

export const menuItems: MenuItem[] = [
  {
    value: "career-coach",
    icon: () => (
      <Icon
        type="DocumentIcon"
        className="w-6 h-6 stroke-grey-15 group-hover:stroke-white"
      />
    ),
    title: "Career Coach",
    link: "/dashboard/chat",
    href: "/dashboard",
    contents: [],
  },
  {
    value: "assistant",
    icon: () => (
      <Icon
        type="SparkleIcon"
        className="w-6 h-6 stroke-grey-15 group-hover:stroke-white"
      />
    ),
    title: "Tutor",
    link: "/dashboard/chat",
    href: "/dashboard",
    contents: [],
  },
];
