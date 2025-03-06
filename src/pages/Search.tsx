
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import SearchBar from "@/components/shared/SearchBar";
import { featuredYachts } from "@/lib/data";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import SearchHeader from "@/components/search/SearchHeader";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import BookingExperience from "@/components/search/BookingExperience";

const Search = () => {
  const {
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
  } = useSearchFilters(featuredYachts);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 mb-8">
          <SearchHeader 
            locationParam={locationParam}
            yachtsCount={yachts.length}
            startDateParam={startDateParam}
            endDateParam={endDateParam}
          />
          
          <div className="mb-6">
            <SearchBar variant="compact" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters sidebar */}
            <SearchFilters 
              filtersOpen={filtersOpen}
              toggleFilters={toggleFilters}
              yachtTypes={yachtTypes}
              features={features}
              priceRange={priceRange}
              handleYachtTypeChange={handleYachtTypeChange}
              handleFeatureChange={handleFeatureChange}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
            />
            
            {/* Yacht listing */}
            <SearchResults 
              loading={loading}
              yachts={yachts}
              clearFilters={clearFilters}
            />
          </div>
        </div>
        
        {/* Best booking experience section */}
        <BookingExperience />
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
