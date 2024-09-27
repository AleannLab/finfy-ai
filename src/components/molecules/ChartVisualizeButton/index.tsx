"use client";

import { Button, Icon } from "@/components/atoms";
import { FC } from "react";

interface ChartVisualizeButtonProps {
  text: string;
  chart: any;
}

const ChartVisualizeButton: FC<ChartVisualizeButtonProps> = ({
  text,
  chart,
}) => {
  return (
    <Button
      full
      className="chart-button-border px-3 py-4 !rounded-lg text-base text-white justify-between bg-purple-15 bg-opacity-10"
      variant="ghost"
    >
      {text}
      <Icon type="PlusCircle" className="w-5 h-5 stroke-purple-15" />
    </Button>
  );
};

export { ChartVisualizeButton };
