
import React from "react";
import { MapPin } from "lucide-react";

interface LocationSectionProps {
  location: {
    city: string;
    state: string;
    country: string;
  };
}

const LocationSection = ({ location }: LocationSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Location</h2>
      <div className="rounded-xl overflow-hidden h-[300px] bg-ocean-50 flex items-center justify-center mb-2">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-ocean-600 mx-auto mb-2" />
          <p className="text-ocean-600 font-medium">
            Map view available
          </p>
        </div>
      </div>
      <p className="text-gray-600">
        {location.city}, {location.state}, {location.country}{" "}
        <span className="text-primary hover:underline cursor-pointer">
          Get directions
        </span>
      </p>
    </div>
  );
};

export default LocationSection;
