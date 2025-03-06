
import React from "react";
import { ChevronDown } from "lucide-react";

interface PriceRangeFilterProps {
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ 
  priceRange, 
  setPriceRange 
}) => {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center justify-between">
        Price Range
        <ChevronDown className="h-4 w-4" />
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Min: ${priceRange.min}</span>
          <span className="text-sm text-gray-600">Max: ${priceRange.max}</span>
        </div>
        {/* Simple price range slider placeholder */}
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full w-1/2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
