
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, User2, MessageSquare, ShieldCheck, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/lib/booking-services";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import { isAuthenticated } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { format, addDays, differenceInDays } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BookingCardProps {
  price: number;
  instantBook: boolean;
  capacity: number;
  yachtId: string;
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
  yachtId,
  owner,
  onBookNow,
  onInstantBook,
  onContactOwner
}: BookingCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [includeCaptain, setIncludeCaptain] = useState(false);
  const [captainFee, setCaptainFee] = useState(150); // Example fee
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3)
  });

  // Calculate booking details
  const daysCount = date?.from && date?.to ? differenceInDays(date.to, date.from) + 1 : 0;
  const subtotal = price * daysCount;
  const serviceFee = subtotal * 0.1; // 10% service fee
  const captainTotal = includeCaptain ? captainFee * daysCount : 0;
  const total = subtotal + serviceFee + captainTotal;

  const handleBookNow = async () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "Please select dates",
        description: "You must select a start and end date for your booking.",
        variant: "destructive"
      });
      return;
    }

    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You must be logged in to book a yacht.",
        variant: "destructive"
      });
      navigate("/login", { state: { returnTo: window.location.pathname } });
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        yacht_id: yachtId,
        start_date: format(date.from, "yyyy-MM-dd"),
        end_date: format(date.to, "yyyy-MM-dd"),
        total_price: total,
        captain_included: includeCaptain,
        guest_count: guestCount,
        special_requests: message || undefined
      });

      onBookNow();
      
      toast({
        title: "Booking Request Sent",
        description: "The yacht owner will respond to your request soon.",
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstantBook = async () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "Please select dates",
        description: "You must select a start and end date for your booking.",
        variant: "destructive"
      });
      return;
    }

    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You must be logged in to book a yacht.",
        variant: "destructive"
      });
      navigate("/login", { state: { returnTo: window.location.pathname } });
      return;
    }

    setLoading(true);
    try {
      await createBooking({
        yacht_id: yachtId,
        start_date: format(date.from, "yyyy-MM-dd"),
        end_date: format(date.to, "yyyy-MM-dd"),
        total_price: total,
        captain_included: includeCaptain,
        guest_count: guestCount,
        special_requests: message || undefined
      });

      onInstantBook();
      
      toast({
        title: "Booking Confirmed",
        description: "Your booking has been confirmed. Check your email for details.",
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="font-semibold text-2xl">${price}</span>
            <span className="text-gray-500 ml-1">/ day</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{owner.rating}</span>
            <span className="text-gray-400 mx-1">·</span>
            <span className="text-gray-500">{owner.responseRate}% response</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="booking-dates">Booking Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="booking-dates"
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-1.5"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select your dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="guest-count">Number of Guests</Label>
            <Input
              id="guest-count"
              type="number"
              min={1}
              max={capacity}
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="mt-1.5"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum {capacity} guests
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="captain-option"
              checked={includeCaptain}
              onChange={(e) => setIncludeCaptain(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="captain-option" className="ml-2">
              Include captain (${captainFee}/day)
            </Label>
          </div>

          <div>
            <Label htmlFor="message">Message to Owner (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Introduce yourself and share your plans..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <span>${price} x {daysCount} days</span>
            <span>${subtotal}</span>
          </div>
          {includeCaptain && (
            <div className="flex justify-between">
              <span>Captain fee</span>
              <span>${captainTotal}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {instantBook ? (
          <Button
            className="w-full bg-green-600 hover:bg-green-700 mb-3"
            onClick={handleInstantBook}
            disabled={loading || !date?.from || !date?.to}
          >
            {loading ? "Processing..." : "Instant Book"}
          </Button>
        ) : (
          <Button
            className="w-full bg-primary hover:bg-primary/90 mb-3"
            onClick={handleBookNow}
            disabled={loading || !date?.from || !date?.to}
          >
            {loading ? "Processing..." : "Request to Book"}
          </Button>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={onContactOwner}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact Owner
        </Button>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-600">
          <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
          <span>Secure payments through our platform</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
