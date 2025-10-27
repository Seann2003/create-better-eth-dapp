"use client";

import Image from "next/image";

export type OptionCardProps = {
  image: string;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function OptionCard({
  image,
  label,
  description,
  isSelected,
  onClick,
}: OptionCardProps) {
  return (
    <div
      className={`bg-card border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md active:shadow-lg active:scale-[0.98] ${
        isSelected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border hover:border-primary/50 shadow-md"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <Image
          src={image}
          alt={label}
          width={24}
          height={24}
          className="mr-2"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wide">
            {label}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
