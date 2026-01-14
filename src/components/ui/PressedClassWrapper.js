"use client";

import { useState } from "react";

export const PressedClassWrapper = ({ children, className, ...props }) => {
  const [isPressed, setIsPressed] = useState(false);

  function onMouseDown(e) {
    e.stopPropagation();
    setIsPressed(true);
  }

  function onMouseUp(e) {
    e.stopPropagation();
    setIsPressed(false);
  }

  function onMouseLeave(e) {
    e.stopPropagation();
    setIsPressed(false);
  }

  return (
    <div 
      onMouseDown={onMouseDown} 
      onMouseUp={onMouseUp} 
      onMouseLeave={onMouseLeave} 
      className={(isPressed ? "pressed " : "") + (className ? className : "")} 
      {...props}
    >
      {children}
    </div>
  );
};
