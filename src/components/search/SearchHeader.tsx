
import React from "react";

interface SearchHeaderProps {
  locationParam: string | null;
  yachtsCount: number;
  startDateParam: string | null;
  endDateParam: string | null;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  locationParam,
  yachtsCount,
  startDateParam,
  endDateParam
}) => {
  const formatLocation = (location: string) => {
    return location
      .split(',')[0]
      .trim()
      .replace(/(\w+)/g, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase());
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {locationParam 
          ? `Yachts in ${formatLocation(locationParam)}` 
          : "All Available Yachts"}
      </h1>
      <p className="text-gray-600">
        {yachtsCount} {yachtsCount === 1 ? 'yacht' : 'yachts'} available
        {startDateParam && endDateParam ? ' for your dates' : ''}
      </p>
    </div>
  );
};

export default SearchHeader;
