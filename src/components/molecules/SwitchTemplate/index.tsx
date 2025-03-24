'use client'
import { Label, Switch } from "@/components/atoms";
import { ToggleSwitch } from "@/components/atoms/Togler";
import { FC, useState } from "react";

interface SwitchTemplateProps {
  id?: string;
  label?: string;
}

const SwitchTemplate: FC<SwitchTemplateProps> = ({ label, id }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={id} className="text-sm font-medium text-[#666]">{label}</Label>
      {/* <Switch defaultChecked id={id} className="border-[#666] border " /> */}
      <ToggleSwitch disable={false} isOn={isOn} setIsOn={setIsOn} />
    </div>
  );
};

export { SwitchTemplate };
