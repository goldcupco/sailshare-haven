
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Yacht } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

export const useSearchFilters = (initialYachts: Yacht[]) => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // State for filters
  const [yachtTypes, setYachtTypes] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 100, max: 10000 });

  const locationParam = searchParams.get("location");
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const guestsParam = searchParams.get("guests");

  // Initialize filters from URL params
  useEffect(() => {
    const typesParam = searchParams.get("types");
    const featuresParam = searchParams.get("features");
    
    if (typesParam) {
      setYachtTypes(typesParam.split(','));
    }
    
    if (featuresParam) {
      setFeatures(featuresParam.split(','));
    }
  }, [searchParams]);

  useEffect(() => {
    // Simulate API fetch with a delay
    setLoading(true);
    const timer = setTimeout(() => {
      // Filter yachts based on search params (in a real app, this would be an API call)
      let filteredYachts = [...initialYachts];
      
      if (locationParam) {
        filteredYachts = filteredYachts.filter(yacht => 
          yacht.location.city.toLowerCase().includes(locationParam.toLowerCase()) ||
          yacht.location.state.toLowerCase().includes(locationParam.toLowerCase()) ||
          yacht.location.country.toLowerCase().includes(locationParam.toLowerCase())
        );
      }
      
      if (guestsParam) {
        const guestCount = parseInt(guestsParam);
        filteredYachts = filteredYachts.filter(yacht => yacht.capacity >= guestCount);
      }
      
      // Filter by yacht types - Fix the exact matching here
      if (yachtTypes.length > 0) {
        filteredYachts = filteredYachts.filter(yacht => 
          yachtTypes.includes(yacht.type)
        );
        
        // Add debugging to understand the filtering
        console.log("Filtering by yacht types:", yachtTypes);
        console.log("Filtered yachts:", filteredYachts.map(y => ({id: y.id, name: y.name, type: y.type})));
      }
      
      // Filter by features/amenities
      if (features.length > 0) {
        filteredYachts = filteredYachts.filter(yacht => 
          features.every(feature => {
            // Handle special cases for features that aren't directly in amenities
            if (feature === 'Captain Included') {
              return yacht.captain?.included;
            } else if (feature === 'Instant Book') {
              return yacht.instantBook;
            } else {
              return yacht.amenities.includes(feature);
            }
          })
        );
      }
      
      setYachts(filteredYachts);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [locationParam, startDateParam, endDateParam, guestsParam, yachtTypes, features, initialYachts]);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleYachtTypeChange = (type: string) => {
    setYachtTypes(prev => {
      let newTypes;
      if (prev.includes(type)) {
        newTypes = prev.filter(t => t !== type);
      } else {
        newTypes = [...prev, type];
      }
      
      // Update URL parameters
      updateSearchParams("types", newTypes.join(','));
      return newTypes;
    });
  };

  const handleFeatureChange = (feature: string) => {
    setFeatures(prev => {
      let newFeatures;
      if (prev.includes(feature)) {
        newFeatures = prev.filter(f => f !== feature);
      } else {
        newFeatures = [...prev, feature];
      }
      
      // Update URL parameters
      updateSearchParams("features", newFeatures.join(','));
      return newFeatures;
    });
  };

  const updateSearchParams = (param: string, value: string) => {
    if (value) {
      searchParams.set(param, value);
    } else {
      searchParams.delete(param);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setYachtTypes([]);
    setFeatures([]);
    setPriceRange({ min: 100, max: 10000 });
    
    // Remove filter parameters from URL
    searchParams.delete("types");
    searchParams.delete("features");
    setSearchParams(searchParams);
    
    toast({
      title: "Filters cleared",
      description: "All search filters have been reset",
    });
  };

  return {
    yachts,
    loading,
    filtersOpen,
    yachtTypes,
    features,
    priceRange,
    locationParam,
    startDateParam,
    endDateParam,
    toggleFilters,
    handleYachtTypeChange,
    handleFeatureChange,
    setPriceRange,
    clearFilters
  };
};
