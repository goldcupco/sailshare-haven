
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ChevronLeft, MapPin } from "lucide-react";
import { Rating } from "@/components/ui/rating";

interface YachtHeaderProps {
  name: string;
  rating: number;
  reviewCount: number;
  location: {
    city: string;
    state: string;
  };
  favorited: boolean;
  onSaveToFavorites: () => void;
  onShareYacht: () => void;
}

const YachtHeader = ({
  name,
  rating,
  reviewCount,
  location,
  favorited,
  onSaveToFavorites,
  onShareYacht,
}: YachtHeaderProps) => {
  return (
    <>
      <Link
        to="/search"
        className="inline-flex items-center text-sm text-primary hover:underline mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to search results
      </Link>

      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center ${favorited ? 'bg-pink-50' : ''}`}
            onClick={onSaveToFavorites}
          >
            <Heart className={`h-4 w-4 mr-2 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
            {favorited ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={onShareYacht}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="flex items-center mr-4">
          <Rating value={rating} readOnly />
          <span className="ml-2 text-sm">
            ({reviewCount} reviews)
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location.city}, {location.state}</span>
        </div>
      </div>
    </>
  );
};

export default YachtHeader;
