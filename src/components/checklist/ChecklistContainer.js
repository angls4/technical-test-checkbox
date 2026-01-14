"use client";

import { useState } from "react";
import { Separator } from "../ui/Separator";
import { Button } from "../ui/Button";
import { ChecklistContext } from "./ChecklistContext";
import { ChecklistItemAll } from "./ChecklistItemAll";
import { ChecklistItem } from "./ChecklistItem";

export const ChecklistContainer = ({ data }) => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkCount, setCheckCount] = useState(data.length);

  return (
    <ChecklistContext.Provider 
      value={{
        checkAll, 
        setCheckAll, 
        checkCount, 
        setCheckCount, 
        itemCount: data.length
      }}
    >
      <ul className="checklist-container flex flex-col items-center justify-start">
        <ChecklistItemAll label="All pages" name="all-pages" />
        <Separator className="w-full" />
        <div className="h-41 overflow-y-scroll no-scrollbar">
          {data.map((item, index) => (
            <ChecklistItem 
              key={index} 
              label={item} 
              name={"page-" + (index + 1)} 
            />
          ))}
        </div>
        <Separator className="w-full" />
        <Button className="my-2.5">
          <span>Done</span>
        </Button>
      </ul>
    </ChecklistContext.Provider>
  );
};
