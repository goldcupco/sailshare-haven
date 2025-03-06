
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import YachtCard from "@/components/shared/YachtCard";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Yacht } from "@/lib/types";
import { featuredYachts } from "@/lib/data";
import { 
  Sailboat, 
  SlidersHorizontal, 
  ChevronDown, 
  BadgeCheck 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Search = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Add state for filters
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
      let filteredYachts = [...featuredYachts];
      
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
  }, [locationParam, startDateParam, endDateParam, guestsParam, yachtTypes, features]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 mb-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {locationParam 
                ? `Yachts in ${locationParam}` 
                : "All Available Yachts"}
            </h1>
            <p className="text-gray-600">
              {yachts.length} {yachts.length === 1 ? 'yacht' : 'yachts'} available
              {startDateParam && endDateParam ? ' for your dates' : ''}
            </p>
          </div>
          
          <div className="mb-6">
            <SearchBar variant="compact" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters sidebar */}
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
                  {/* Price Range */}
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
                  
                  {/* Yacht Type */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center justify-between">
                      Yacht Type
                      <ChevronDown className="h-4 w-4" />
                    </h3>
                    <div className="space-y-2">
                      {['Motor Yacht', 'Sailing Yacht', 'Catamaran', 'Superyacht'].map(type => (
                        <div key={type} className="flex items-center">
                          <Checkbox 
                            id={type}
                            checked={yachtTypes.includes(type)}
                            onCheckedChange={() => handleYachtTypeChange(type)}
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                          />
                          <label htmlFor={type} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center justify-between">
                      Features
                      <ChevronDown className="h-4 w-4" />
                    </h3>
                    <div className="space-y-2">
                      {['Captain Included', 'Instant Book', 'WiFi', 'Air Conditioning'].map(feature => (
                        <div key={feature} className="flex items-center">
                          <Checkbox
                            id={feature}
                            checked={features.includes(feature)}
                            onCheckedChange={() => handleFeatureChange(feature)}
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                          />
                          <label htmlFor={feature} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Clear Filters Button */}
                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Yacht listing */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
                  ))}
                </div>
              ) : yachts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {yachts.map(yacht => (
                    <YachtCard key={yacht.id} yacht={yacht} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sailboat className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No yachts found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search filters or exploring different locations
                  </p>
                  <Button onClick={clearFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Best booking experience section */}
        <section className="bg-ocean-50 py-12 mt-8">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                The Best Yacht Booking Experience
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                SailHaven provides a seamless booking process and exceptional customer service
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <BadgeCheck className="h-8 w-8 text-primary" />,
                  title: "Verified Listings",
                  description: "Every yacht in our collection is verified for quality and safety."
                },
                {
                  icon: <Sailboat className="h-8 w-8 text-primary" />,
                  title: "Experienced Captains",
                  description: "Optional professional captains available for all yacht rentals."
                },
                {
                  icon: <BadgeCheck className="h-8 w-8 text-primary" />,
                  title: "Secure Payments",
                  description: "Book with confidence using our secure payment platform."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
