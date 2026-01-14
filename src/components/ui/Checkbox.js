"use client";

import { forwardRef } from "react";
import { PressedClassWrapper } from "./PressedClassWrapper";
import { CheckMarkIcon } from "./CheckMarkIcon";

export const Checkbox = forwardRef(function Checkbox(
  { className, ...props },
  ref
) {
  return (
    <label>
      <PressedClassWrapper className={"checkbox-wrapper inline-flex items-center cursor-pointer " + (className ? className : "")}>
        <input
          ref={ref}
          type="checkbox"
          {...props}
        />
        <div className="checkbox-box">
          <CheckMarkIcon className="checkbox-checkmark" />
        </div>
      </PressedClassWrapper>
    </label>
  );
});
