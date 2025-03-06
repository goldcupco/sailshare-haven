
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ 
  priceRange, 
  setPriceRange 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localRange, setLocalRange] = useState([priceRange.min, priceRange.max]);
  
  const MIN_PRICE = 0;
  const MAX_PRICE = 5000;

  useEffect(() => {
    // Update local range when external priceRange changes
    setLocalRange([priceRange.min, priceRange.max]);
  }, [priceRange]);

  const handleSliderChange = (values: number[]) => {
    setLocalRange(values);
  };

  const handleSliderCommit = (values: number[]) => {
    setPriceRange({ min: values[0], max: values[1] });
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h3 
        className="font-medium mb-3 flex items-center justify-between cursor-pointer"
        onClick={toggleOpen}
      >
        Price Range
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </h3>
      
      {isOpen && (
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Min: {formatPrice(localRange[0])}</span>
            <span className="text-sm text-gray-600">Max: {formatPrice(localRange[1])}</span>
          </div>
          
          <Slider
            defaultValue={localRange}
            value={localRange}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={100}
            onValueChange={handleSliderChange}
            onValueCommit={handleSliderCommit}
            className="my-6"
          />
          
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Minimum</span>
              <span className="font-medium">{formatPrice(localRange[0])}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500">Maximum</span>
              <span className="font-medium">{formatPrice(localRange[1])}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRangeFilter;
