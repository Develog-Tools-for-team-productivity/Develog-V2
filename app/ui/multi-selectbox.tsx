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
        className="rounded cursor-pointer p-2 bg-white text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0
          ? `${selectedOptions.length} 개 선택됨`
          : "레포지토리를 선택해주세요"}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full max-h-40 border rounded mt-1 bg-white z-10 text-sm overflow-scroll">
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
