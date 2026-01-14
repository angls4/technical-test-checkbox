"use client";

import { useState, useEffect, useContext } from "react";
import { PressedClassWrapper } from "../ui/PressedClassWrapper";
import { Checkbox } from "../ui/Checkbox";
import { ChecklistContext } from "./ChecklistContext";

export const ChecklistItem = ({ label, name }) => {
  const [checked, setChecked] = useState(false);
  const context = useContext(ChecklistContext);

  useEffect(() => {
    if (context.checkAll) {
      setChecked(true);
    } else if (context.checkCount === context.itemCount) {
      setChecked(false);
    }
  }, [context.checkAll, context.checkCount, context.itemCount]);

  function handleChange(e) {
    setChecked(e.target.checked);

    if (e.target.checked) {
      context.setCheckCount(context.checkCount - 1);
      if (context.checkCount === 1) {
        context.setCheckAll(true);
      }
    } else {
      context.setCheckCount(context.checkCount + 1);
      if (context.checkAll) {
        context.setCheckAll(false);
      }
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
            checked={checked} 
          />
        </PressedClassWrapper>
      </label>
    </li>
  );
};
