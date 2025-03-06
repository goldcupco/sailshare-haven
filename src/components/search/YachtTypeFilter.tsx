
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

interface YachtTypeFilterProps {
  yachtTypes: string[];
  handleYachtTypeChange: (type: string) => void;
}

const YachtTypeFilter: React.FC<YachtTypeFilterProps> = ({ 
  yachtTypes, 
  handleYachtTypeChange 
}) => {
  const availableYachtTypes = ['Motor Yacht', 'Sailing Yacht', 'Catamaran', 'Superyacht'];
  
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center justify-between">
        Yacht Type
        <ChevronDown className="h-4 w-4" />
      </h3>
      <div className="space-y-2">
        {availableYachtTypes.map(type => (
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
  );
};

export default YachtTypeFilter;
