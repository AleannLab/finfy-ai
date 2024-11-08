import { cn } from "@/lib/utils";
import { FC } from "react";

interface LoaderProps {
  className?: string;
}

const Loader: FC<LoaderProps> = ({ className }) => {
  return <div className={cn("loader !z-[400]", className)}></div>;
};

export { Loader };
