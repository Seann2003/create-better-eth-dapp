"use client";

import { useState } from "react";
import OptionCard from "./OptionCard";
import Image from "next/image";

export type CardOption = {
  readonly label: string;
  readonly value: string;
  readonly description: string;
  readonly image: string;
};

export default function Card({
  category,
  options,
  onStackUpdate,
  selectedValue,
}: {
  category: string;
  options: readonly CardOption[];
  onStackUpdate: (value: CardOption | null) => void;
  selectedValue: CardOption | null;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleOptionClick = (option: CardOption) => {
    const isSelected = selectedValue?.label === option.label;

    if (isSelected) {
      onStackUpdate(null);
    } else {
      onStackUpdate(option);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div
        className="flex items-center justify-between p-4 border-b border-border cursor-pointer hover:bg-muted/50 active:bg-muted active:shadow-sm transition-all duration-150"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold text-card-foreground tracking-wide">
          {category}
        </h2>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {options.map((option: CardOption) => {
              const isSelected = selectedValue?.label === option.label;
              return (
                <OptionCard
                  key={option.value}
                  image={option.image}
                  label={option.label}
                  description={option.description}
                  isSelected={isSelected}
                  onClick={() => handleOptionClick(option)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
