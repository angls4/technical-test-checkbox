"use client";

// imports
import { forwardRef, useState, createContext, useEffect, useContext } from "react";

const PressedClassWrapper = ({ children, className, ...props }) => {
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
    <div onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} className={(isPressed ? "pressed " : "") + (className ? className : "")} {...props}>
      {children}
    </div>
  );
}

const CheckMarkIcon = ({className}) => (
  <svg width="17" height="13" viewBox="0 0 17 13" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 6.572L6.04879 11.5072C6.06925 11.5254 6.10055 11.5237 6.11899 11.5035L16.14 0.5" stroke="currentColor" strokeLinecap="round"/>
  </svg>
);

const Checkbox = forwardRef(function Checkbox(
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

const Separator = ({className}) => (
  <div className={"separator px-3.75 py-[9.5px] " + (className ? className : "")}>
    <svg width="340" height="1" viewBox="0 0 340 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.35" y1="0.349997" x2="339.65" y2="0.349997" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
    </svg>
  </div>
  // <div className={"px-3.75 my-2.5 " + (className ? className : "")}>
  //   <div className="separator"></div>
  // </div>
);

const Button = ({className, children, ...props}) => {
  return (
    <PressedClassWrapper className={"btn flex justify-center items-center " + (className ? className : "")} {...props}>
      {children}
    </PressedClassWrapper>
  );
}

const ChecklistItemAll = ({label,name}) => {
  const context = useContext(ChecklistContext);
  const [checkAll, setCheckAll] = [context.checkAll, context.setCheckAll];

  function handleChange(e) {
    setCheckAll(e.target.checked);

    if (e.target.checked) {
      context.setCheckCount(0);
      setCheckAll(true);
    }
    else {
      context.setCheckCount(context.itemCount);
      setCheckAll(false);
    }
  }

  return (
    <li>
      <label>
        <PressedClassWrapper className="checkbox-wrapper h-full flex justify-between items-center gap-0 cursor-pointer">
          <span>{label}</span>
          <Checkbox name={name} className="mr-5.25" onChange={handleChange} checked={checkAll} />
        </PressedClassWrapper>
      </label>
    </li>
  )
}

const ChecklistItem = ({label,name}) => {
  const [checked, setChecked] = useState(false);
  const context = useContext(ChecklistContext);

  useEffect(() => {
    if (context.checkAll) {
      setChecked(true);
    }
    else if (context.checkCount === context.itemCount) {
      setChecked(false);
    }
  }, [context.checkAll]);

  function handleChange(e) {
    setChecked(e.target.checked);

    if (e.target.checked) {
      context.setCheckCount(context.checkCount - 1);
      if (context.checkCount === 1) {
        context.setCheckAll(true);
      }
    }
    else {
      context.setCheckCount(context.checkCount + 1);
      if (context.checkAll)
        context.setCheckAll(false);
    }
  }

  return (
    <li>
      <label>
        <PressedClassWrapper className="checkbox-wrapper h-full flex justify-between items-center gap-0 cursor-pointer">
          <span>{label}</span>
          <Checkbox name={name} className="mr-5.25" onChange={handleChange} checked={checked} />
        </PressedClassWrapper>
      </label>
    </li>
  )
}

const ChecklistContext = createContext();

const ChecklistContainer = ({ data }) => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkCount, setCheckCount] = useState(data.length);

  return (
    <ChecklistContext.Provider value={{checkAll, setCheckAll, checkCount, setCheckCount, itemCount: data.length}}>
      <ul className="checklist-container flex flex-col items-center justify-start">
        <ChecklistItemAll label="All pages" name="all-pages" />
        <Separator className="w-full" />
        <div className="h-41 overflow-y-scroll no-scrollbar">
          {
            data.map((item, index) => {
              return (
                <ChecklistItem key={index} label={item} name={"page-" + (index+1)} />
              );
            })
          }
        </div>
        <Separator className="w-full" />
        <Button className="my-2.5">
          <span>Done</span>
        </Button>
      </ul>
    </ChecklistContext.Provider>
  );
}

export default function Home() {
  const data = ["Page 1", "Page 2", "Page 3", "Page 4", "Page 5", "Page 6"];

  return (
    <div className="h-dvh flex items-center justify-center bg-white">
      <ChecklistContainer data={data} />
    </div>
  );
}
