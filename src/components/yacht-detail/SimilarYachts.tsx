
import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@/components/ui/rating";
import { Yacht } from "@/lib/types";

interface SimilarYachtsProps {
  currentYachtId: string;
  similarYachts: Yacht[];
}

const SimilarYachts = ({ currentYachtId, similarYachts }: SimilarYachtsProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">
        Similar Yachts You May Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarYachts
          .filter((y) => y.id !== currentYachtId)
          .slice(0, 3)
          .map((similarYacht) => (
            <Link
              key={similarYacht.id}
              to={`/yacht/${similarYacht.id}`}
              className="group"
            >
              <div className="rounded-xl overflow-hidden mb-3 aspect-[4/3]">
                <img
                  src={similarYacht.images[0]}
                  alt={similarYacht.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-lg mb-1">
                {similarYacht.name}
              </h3>
              <div className="flex items-center mb-1">
                <Rating value={similarYacht.rating} readOnly size="sm" />
                <span className="text-sm ml-1">
                  ({similarYacht.reviewCount})
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">
                {similarYacht.location.city}, {similarYacht.location.state}
              </p>
              <p className="font-bold">
                ${similarYacht.pricePerDay}{" "}
                <span className="text-gray-600 font-normal">/ day</span>
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SimilarYachts;
