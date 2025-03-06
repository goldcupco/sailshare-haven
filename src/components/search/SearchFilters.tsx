
import React, { useState } from "react";
import YachtTypeFilter from "./YachtTypeFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import FeatureFilter from "./FeatureFilter";
import BookingExperience from "./BookingExperience";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

interface SearchFiltersProps {
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  yachtTypes: string[];
  setYachtTypes: React.Dispatch<React.SetStateAction<string[]>>;
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  instantBookOnly: boolean;
  setInstantBookOnly: React.Dispatch<React.SetStateAction<boolean>>;
  clearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  priceRange,
  setPriceRange,
  yachtTypes,
  setYachtTypes,
  features,
  setFeatures,
  instantBookOnly,
  setInstantBookOnly,
  clearFilters
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters = () => {
    return (
      yachtTypes.length > 0 ||
      features.length > 0 ||
      instantBookOnly ||
      priceRange.min !== 0 ||
      priceRange.max !== 5000
    );
  };

  const activeFilterCount = () => {
    let count = 0;
    if (yachtTypes.length > 0) count++;
    if (features.length > 0) count++;
    if (instantBookOnly) count++;
    if (priceRange.min !== 0 || priceRange.max !== 5000) count++;
    return count;
  };

  const FiltersComponent = () => (
    <div className="space-y-6">
      <YachtTypeFilter
        yachtTypes={yachtTypes}
        handleYachtTypeChange={(type) => {
          const index = yachtTypes.indexOf(type);
          if (index === -1) {
            setYachtTypes([...yachtTypes, type]);
          } else {
            setYachtTypes(yachtTypes.filter(t => t !== type));
          }
        }}
      />
      
      <PriceRangeFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      
      <FeatureFilter
        features={features}
        handleFeatureChange={(feature) => {
          const index = features.indexOf(feature);
          if (index === -1) {
            setFeatures([...features, feature]);
          } else {
            setFeatures(features.filter(f => f !== feature));
          }
        }}
      />
      
      <BookingExperience
        instantBookOnly={instantBookOnly}
        setInstantBookOnly={setInstantBookOnly}
      />
      
      {hasActiveFilters() && (
        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden lg:block lg:col-span-1">
        <FiltersComponent />
      </div>

      {/* Mobile filters toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters {activeFilterCount() > 0 && `(${activeFilterCount()})`}
        </Button>
        
        {/* Mobile filters panel */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 bg-white z-50 overflow-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <FiltersComponent />
            
            <div className="mt-6 pt-4 border-t sticky bottom-0 bg-white">
              <Button
                className="w-full"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {activeFilterCount() > 0 ? "filtered" : "all"} results
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFilters;
