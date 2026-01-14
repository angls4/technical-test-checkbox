"use client";

import { useContext } from "react";
import { PressedClassWrapper } from "../ui/PressedClassWrapper";
import { Checkbox } from "../ui/Checkbox";
import { ChecklistContext } from "./ChecklistContext";

export const ChecklistItemAll = ({ label, name }) => {
  const context = useContext(ChecklistContext);
  const [checkAll, setCheckAll] = [context.checkAll, context.setCheckAll];

  function handleChange(e) {
    setCheckAll(e.target.checked);

    if (e.target.checked) {
      context.setCheckCount(0);
      setCheckAll(true);
    } else {
      context.setCheckCount(context.itemCount);
      setCheckAll(false);
    }
  }

  return (
    <li>
      <label>
        <PressedClassWrapper className="checkbox-wrapper h-full flex justify-between items-center gap-0 cursor-pointer">
          <span>{label}</span>
          <Checkbox 
            name={name} 
            className="mr-5.25" 
            onChange={handleChange} 
            checked={checkAll} 
          />
        </PressedClassWrapper>
      </label>
    </li>
  );
};
