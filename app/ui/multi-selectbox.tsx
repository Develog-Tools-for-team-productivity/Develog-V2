"use client";

import { useState } from "react";
import { Repository } from "@/services/githubService";

type MultiSelectBoxProps = {
  options: Repository[];
  selectedOptions: number[];
  onOptionToggle: (optionId: number) => void;
};

export function MultiSelectBox({
  options,
  selectedOptions,
  onOptionToggle,
}: MultiSelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-4">
      <div
        className="border p2 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0
          ? `${selectedOptions.length} 개 선택됨`
          : "옵션 선택"}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full border rounded mt-1 bg-white z-10">
          {options.map((option) => (
            <div
              key={option.id}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selectedOptions.includes(option.id) ? "bg-blue-100" : ""
              }`}
              onClick={() => onOptionToggle(option.id)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
