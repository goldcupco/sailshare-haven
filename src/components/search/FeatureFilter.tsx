
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

interface FeatureFilterProps {
  features: string[];
  handleFeatureChange: (feature: string) => void;
}

const FeatureFilter: React.FC<FeatureFilterProps> = ({ 
  features, 
  handleFeatureChange 
}) => {
  const availableFeatures = ['Captain Included', 'Instant Book', 'WiFi', 'Air Conditioning'];
  
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center justify-between">
        Features
        <ChevronDown className="h-4 w-4" />
      </h3>
      <div className="space-y-2">
        {availableFeatures.map(feature => (
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
  );
};

export default FeatureFilter;
