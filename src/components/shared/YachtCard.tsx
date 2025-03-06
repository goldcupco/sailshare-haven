
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Heart, MapPin, Users, Ruler, Sailboat, Calendar } from "lucide-react";
import { Yacht } from "@/lib/types";
import { cn } from "@/lib/utils";

interface YachtCardProps {
  yacht: Yacht;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const YachtCard = ({ yacht, className, size = "md" }: YachtCardProps) => {
  const [favorited, setFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorited(!favorited);
  };

  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-sm",
    lg: "max-w-md",
  };

  const imageHeightClasses = {
    sm: "h-40",
    md: "h-52",
    lg: "h-64",
  };

  return (
    <Link to={`/yacht/${yacht.id}`}>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border-gray-200/80",
          sizeClasses[size],
          className
        )}
      >
        <div className={cn("relative overflow-hidden", imageHeightClasses[size])}>
          <img
            src={yacht.imageUrl}
            alt={yacht.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-500 hover:scale-105 image-fade-in",
              imageLoaded ? "loaded" : ""
            )}
            onLoad={() => setImageLoaded(true)}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full h-8 w-8"
            onClick={toggleFavorite}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors", 
                favorited ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </Button>
          {yacht.instantBook && (
            <Badge className="absolute bottom-2 left-2 bg-accent/90 text-black font-medium">
              Instant Book
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg line-clamp-1">{yacht.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{yacht.location.city}, {yacht.location.state}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Rating value={yacht.rating} size="sm" />
              <span className="text-sm text-gray-500 ml-1">({yacht.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="outline" className="flex items-center font-normal text-gray-600">
              <Users className="h-3.5 w-3.5 mr-1" />
              {yacht.capacity} guests
            </Badge>
            <Badge variant="outline" className="flex items-center font-normal text-gray-600">
              <Ruler className="h-3.5 w-3.5 mr-1" />
              {yacht.length}ft
            </Badge>
            <Badge variant="outline" className="flex items-center font-normal text-gray-600">
              <Sailboat className="h-3.5 w-3.5 mr-1" />
              {yacht.type}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between p-4 pt-0 border-t border-gray-100 mt-3">
          <div>
            <span className="font-semibold text-lg">${yacht.pricePerDay}</span>
            <span className="text-gray-500 text-sm"> / day</span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Calendar className="h-4 w-4 mr-1" />
            Check Availability
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default YachtCard;
