
import React from "react";
import { Button } from "@/components/ui/button";
import { Sailboat } from "lucide-react";
import YachtCard from "@/components/shared/YachtCard";
import { Yacht } from "@/lib/types";

interface SearchResultsProps {
  loading: boolean;
  yachts: Yacht[];
  clearFilters: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  loading,
  yachts,
  clearFilters
}) => {
  return (
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
  );
};

export default SearchResults;
