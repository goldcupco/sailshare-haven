
import React from "react";

interface YachtDescriptionProps {
  description: string;
}

const YachtDescription = ({ description }: YachtDescriptionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Description</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-600">
        Experience luxury on the water with this magnificent vessel.
        Perfect for day trips, overnight stays, or extended voyages.
        The yacht comes fully equipped with modern amenities and can be
        operated by our experienced captain and crew.
      </p>
    </div>
  );
};

export default YachtDescription;
