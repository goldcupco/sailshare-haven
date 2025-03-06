
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import SearchHeader from "@/components/search/SearchHeader";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { allYachts } from "@/lib/data";
import { Yacht } from "@/lib/types";
import { getYachtListings } from "@/lib/yacht-services";
import { Loader2 } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [filteredYachts, setFilteredYachts] = useState<Yacht[]>([]);
  
  // Filters
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [yachtTypes, setYachtTypes] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [instantBookOnly, setInstantBookOnly] = useState(false);
  
  const locationParam = searchParams.get("location");
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const guestsParam = searchParams.get("guests");
  
  useEffect(() => {
    const fetchYachts = async () => {
      setLoading(true);
      try {
        // Try to fetch from Supabase
        const supabaseYachts = await getYachtListings();
        
        if (supabaseYachts && supabaseYachts.length > 0) {
          setYachts(supabaseYachts);
        } else {
          // Fall back to mock data
          setYachts(allYachts);
        }
      } catch (error) {
        console.error("Error fetching yachts:", error);
        // Fall back to mock data
        setYachts(allYachts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchYachts();
  }, []);
  
  useEffect(() => {
    // Apply filters
    const applyFilters = () => {
      let results = [...yachts];
      
      // Location filter
      if (locationParam) {
        results = results.filter(yacht => 
          yacht.location.city.toLowerCase().includes(locationParam.toLowerCase()) || 
          yacht.location.state.toLowerCase().includes(locationParam.toLowerCase())
        );
      }
      
      // Guests filter
      if (guestsParam) {
        const guests = parseInt(guestsParam);
        if (!isNaN(guests)) {
          results = results.filter(yacht => yacht.capacity >= guests);
        }
      }
      
      // Price range filter
      results = results.filter(yacht => 
        yacht.pricePerDay >= priceRange.min && 
        yacht.pricePerDay <= priceRange.max
      );
      
      // Yacht type filter
      if (yachtTypes.length > 0) {
        results = results.filter(yacht => 
          yachtTypes.includes(yacht.type.toLowerCase())
        );
      }
      
      // Features filter (amenities)
      if (features.length > 0) {
        results = results.filter(yacht => 
          features.every(feature => 
            yacht.amenities.some(amenity => 
              amenity.toLowerCase().includes(feature.toLowerCase())
            )
          )
        );
      }
      
      // Instant book filter
      if (instantBookOnly) {
        results = results.filter(yacht => yacht.instantBook);
      }
      
      setFilteredYachts(results);
    };
    
    if (yachts.length > 0) {
      applyFilters();
    }
  }, [yachts, locationParam, guestsParam, priceRange, yachtTypes, features, instantBookOnly]);
  
  const clearFilters = () => {
    setPriceRange({ min: 0, max: 5000 });
    setYachtTypes([]);
    setFeatures([]);
    setInstantBookOnly(false);
  };
  
  const initialLoading = loading && yachts.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {initialLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-gray-600">Loading yachts...</p>
            </div>
          ) : (
            <>
              <SearchHeader 
                locationParam={locationParam}
                yachtsCount={filteredYachts.length}
                startDateParam={startDateParam}
                endDateParam={endDateParam}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <SearchFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  yachtTypes={yachtTypes}
                  setYachtTypes={setYachtTypes}
                  features={features}
                  setFeatures={setFeatures}
                  instantBookOnly={instantBookOnly}
                  setInstantBookOnly={setInstantBookOnly}
                  clearFilters={clearFilters}
                />
                
                <SearchResults
                  loading={loading}
                  yachts={filteredYachts}
                  clearFilters={clearFilters}
                />
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
