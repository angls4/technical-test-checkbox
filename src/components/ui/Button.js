"use client";

import { PressedClassWrapper } from "./PressedClassWrapper";

export const Button = ({ className, children, ...props }) => {
  return (
    <PressedClassWrapper 
      className={"btn flex justify-center items-center " + (className ? className : "")} 
      {...props}
    >
      {children}
    </PressedClassWrapper>
  );
};
