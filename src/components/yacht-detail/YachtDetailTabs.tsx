
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Ship, Anchor, LifeBuoy, User } from "lucide-react";

interface YachtDetailTabsProps {
  amenities: string[];
  type: string;
  year: number;
  captain: {
    included: boolean;
  };
}

const YachtDetailTabs = ({ amenities, type, year, captain }: YachtDetailTabsProps) => {
  return (
    <Tabs defaultValue="amenities" className="w-full mb-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="specifications">
          Specifications
        </TabsTrigger>
        <TabsTrigger value="rules">Rules & Policies</TabsTrigger>
      </TabsList>
      <TabsContent value="amenities" className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-3 p-2 rounded-full bg-ocean-50">
                <Info className="h-4 w-4 text-ocean-600" />
              </div>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="specifications" className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-full bg-ocean-50">
              <Ship className="h-4 w-4 text-ocean-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Yacht Type</p>
              <p className="font-semibold">{type}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-full bg-ocean-50">
              <Anchor className="h-4 w-4 text-ocean-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Year Built</p>
              <p className="font-semibold">{year}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-full bg-ocean-50">
              <LifeBuoy className="h-4 w-4 text-ocean-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Safety Equipment</p>
              <p className="font-semibold">Full Safety Kit</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-full bg-ocean-50">
              <User className="h-4 w-4 text-ocean-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Captain</p>
              <p className="font-semibold">
                {captain.included ? "Included" : "Optional"}
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="rules" className="p-4">
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="mr-3 p-1 rounded-full bg-ocean-50 mt-0.5">
              <Info className="h-4 w-4 text-ocean-600" />
            </div>
            <span>No smoking allowed on board</span>
          </li>
          <li className="flex items-start">
            <div className="mr-3 p-1 rounded-full bg-ocean-50 mt-0.5">
              <Info className="h-4 w-4 text-ocean-600" />
            </div>
            <span>Pets may be allowed with prior approval</span>
          </li>
          <li className="flex items-start">
            <div className="mr-3 p-1 rounded-full bg-ocean-50 mt-0.5">
              <Info className="h-4 w-4 text-ocean-600" />
            </div>
            <span>Security deposit required</span>
          </li>
          <li className="flex items-start">
            <div className="mr-3 p-1 rounded-full bg-ocean-50 mt-0.5">
              <Info className="h-4 w-4 text-ocean-600" />
            </div>
            <span>Cancellation policy: 48-hour notice required</span>
          </li>
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default YachtDetailTabs;
