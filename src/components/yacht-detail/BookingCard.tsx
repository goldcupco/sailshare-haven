
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarIcon, Users, MessageSquare, Star } from "lucide-react";

interface BookingCardProps {
  price: number;
  instantBook: boolean;
  capacity: number;
  owner: {
    name: string;
    rating: number;
    responseRate: number;
  };
  onBookNow: () => void;
  onInstantBook: () => void;
  onContactOwner: () => void;
}

const BookingCard = ({
  price,
  instantBook,
  capacity,
  owner,
  onBookNow,
  onInstantBook,
  onContactOwner,
}: BookingCardProps) => {
  return (
    <Card className="p-6 sticky top-24">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-gray-600"> / day</span>
          </div>
          {instantBook && (
            <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
              <span>Instant Book</span>
            </div>
          )}
        </div>

        <div className="border rounded-lg mb-4">
          <div className="flex">
            <div className="flex-1 p-3 border-r">
              <p className="text-sm text-gray-500">Start Date</p>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-gray-600" />
                <span>Select date</span>
              </div>
            </div>
            <div className="flex-1 p-3">
              <p className="text-sm text-gray-500">End Date</p>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-gray-600" />
                <span>Select date</span>
              </div>
            </div>
          </div>
          <div className="p-3 border-t">
            <p className="text-sm text-gray-500">Guests</p>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-600" />
              <span>
                1 guest{" "}
                <span className="text-sm text-gray-500">
                  (max {capacity})
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <Button
            className="w-full"
            size="lg"
            onClick={onBookNow}
          >
            Request to Book
          </Button>
          {instantBook && (
            <Button
              className="w-full"
              variant="secondary"
              size="lg"
              onClick={onInstantBook}
            >
              Instant Book
            </Button>
          )}
          <Button
            className="w-full"
            variant="outline"
            onClick={onContactOwner}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Owner
          </Button>
        </div>

        <div className="text-sm text-gray-500 text-center">
          You won't be charged yet
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <span>${price} x 1 day</span>
          <span>${price}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Service fee</span>
          <span>${Math.round(price * 0.1)}</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>${price + Math.round(price * 0.1)}</span>
        </div>
      </div>

      <div className="mt-6 bg-ocean-50 rounded-lg p-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-600 font-semibold mr-3">
            {owner.name.substring(0, 1)}
          </div>
          <div>
            <p className="font-semibold">{owner.name}</p>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 mr-1" />
              <span className="text-sm">
                {owner.rating} · {owner.responseRate}%
                response
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
