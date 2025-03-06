
import React from "react";
import { BadgeCheck, Sailboat } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BookingExperienceProps {
  instantBookOnly: boolean;
  setInstantBookOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingExperience: React.FC<BookingExperienceProps> = ({
  instantBookOnly,
  setInstantBookOnly
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Booking Experience</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Instant Book</p>
          <p className="text-sm text-gray-500">Only show yachts you can book instantly</p>
        </div>
        <Switch 
          checked={instantBookOnly}
          onCheckedChange={setInstantBookOnly}
        />
      </div>
    </div>
  );
};

export default BookingExperience;
