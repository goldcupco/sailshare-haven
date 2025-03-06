
import React from "react";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";

interface Review {
  user: string;
  date: string;
  rating: number;
  text: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-6">
        {reviews.slice(0, 3).map((review, index) => (
          <div key={index} className="border-b border-gray-100 pb-6">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-600 font-semibold mr-3">
                {review.user.substring(0, 1)}
              </div>
              <div>
                <p className="font-semibold">{review.user}</p>
                <p className="text-sm text-gray-500">
                  {review.date}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <Rating value={review.rating} readOnly size="sm" />
              <p className="mt-2 text-gray-600">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
      {reviews.length > 3 && (
        <Button variant="outline" className="mt-4">
          See all {reviews.length} reviews
        </Button>
      )}
    </div>
  );
};

export default ReviewsSection;
