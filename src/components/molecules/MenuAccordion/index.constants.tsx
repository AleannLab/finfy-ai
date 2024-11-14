import { MenuItem } from "@/types";
import { Icon } from "@/components/atoms";

export const menuItems: MenuItem[] = [
  {
    value: "career-coach",
    icon: () => (
      <Icon
        type="SparkleIcon"
        className="w-6 h-6"
      />
    ),
    title: "Career Coach",
    link: "/dashboard/career-coach/chat",
    href: "/dashboard/career-coach",
    contents: [],
  },
  {
    value: "tutor",
    icon: () => (
      <Icon
        type="DocumentIcon"
        className="w-6 h-6"
      />
    ),
    title: "Tutor",
    link: "/dashboard/tutor/chat",
    href: "/dashboard/tutor",
    contents: [],
  },
  {
    value: "teacher",
    icon: () => (
      <Icon
        type="TeacherIcon"
        className="w-6 h-6"
      />
    ),
    title: "Teacher",
    link: "/dashboard/teacher/chat",
    href: "/dashboard/teacher",
    contents: [],
  },
];
