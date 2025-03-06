
import React from "react";
import { Home, RulerIcon, Users } from "lucide-react";

interface YachtOverviewProps {
  length: number;
  cabins: number;
  capacity: number;
}

const YachtOverview = ({ length, cabins, capacity }: YachtOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border border-gray-100 rounded-xl p-6">
      <div className="flex items-center">
        <div className="mr-3 p-2 rounded-full bg-ocean-50">
          <RulerIcon className="h-5 w-5 text-ocean-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Length</p>
          <p className="font-semibold">{length} ft</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-3 p-2 rounded-full bg-ocean-50">
          <Home className="h-5 w-5 text-ocean-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Cabins</p>
          <p className="font-semibold">{cabins}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-3 p-2 rounded-full bg-ocean-50">
          <Users className="h-5 w-5 text-ocean-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Capacity</p>
          <p className="font-semibold">{capacity} guests</p>
        </div>
      </div>
    </div>
  );
};

export default YachtOverview;
