
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  SlidersHorizontal, 
  ChevronDown
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import YachtTypeFilter from "./YachtTypeFilter";
import FeatureFilter from "./FeatureFilter";
import PriceRangeFilter from "./PriceRangeFilter";

interface SearchFiltersProps {
  filtersOpen: boolean;
  toggleFilters: () => void;
  yachtTypes: string[];
  features: string[];
  priceRange: { min: number; max: number; };
  handleYachtTypeChange: (type: string) => void;
  handleFeatureChange: (feature: string) => void;
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number; }>>;
  clearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filtersOpen,
  toggleFilters,
  yachtTypes,
  features,
  priceRange,
  handleYachtTypeChange,
  handleFeatureChange,
  setPriceRange,
  clearFilters
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleFilters}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {filtersOpen ? 'Hide' : 'Show'}
          </Button>
        </div>
        
        <div className={`space-y-6 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
          <PriceRangeFilter 
            priceRange={priceRange} 
            setPriceRange={setPriceRange} 
          />
          
          <YachtTypeFilter 
            yachtTypes={yachtTypes} 
            handleYachtTypeChange={handleYachtTypeChange} 
          />
          
          <FeatureFilter 
            features={features} 
            handleFeatureChange={handleFeatureChange} 
          />
          
          {/* Clear Filters Button */}
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
