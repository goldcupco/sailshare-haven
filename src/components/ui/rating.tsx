
import React from "react";
import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  readOnly?: boolean;
}

const Rating = ({
  value,
  max = 5,
  className,
  size = "md",
  showValue = false,
  readOnly = false,
}: RatingProps) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const starSize = sizeClasses[size];

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn("fill-accent text-accent", starSize)}
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <StarHalf className={cn("text-accent", starSize)} />
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn("text-gray-300", starSize)}
          />
        ))}
      </div>
      
      {showValue && (
        <span className="ml-1 text-sm font-medium">{value.toFixed(1)}</span>
      )}
    </div>
  );
};

export { Rating };
