"use client";

import { ChecklistContainer } from "@/components/checklist";

export default function Home() {
  const data = ["Page 1", "Page 2", "Page 3", "Page 4", "Page 5", "Page 6"];

  return (
    <div className="h-dvh flex items-center justify-center bg-white">
      <ChecklistContainer data={data} />
    </div>
  );
}
