
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Yacht } from "@/lib/types";
import { featuredYachts } from "@/lib/data";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CalendarIcon,
  Map,
  Anchor,
  Sailboat,
  Users,
  Ruler,
  Home,
  Shield,
  Check, 
  Info,
  ChevronLeft,
  Heart,
  Share2
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const YachtDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [yacht, setYacht] = useState<Yacht | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState<string>("2");
  const [includeCaptain, setIncludeCaptain] = useState<boolean>(false);
  const { toast } = useToast();

  // Calculate rental days and total
  const rentalDays = startDate && endDate 
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;
    
  const subtotal = yacht ? yacht.pricePerDay * rentalDays : 0;
  const captainFee = (yacht?.captain.optional && includeCaptain && yacht?.captain.pricePerDay) 
    ? yacht.captain.pricePerDay * rentalDays 
    : 0;
  const serviceFee = subtotal * 0.10; // 10% service fee
  const total = subtotal + captainFee + serviceFee;

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    const timer = setTimeout(() => {
      const yachtData = featuredYachts.find(y => y.id === id);
      if (yachtData) {
        setYacht(yachtData);
        setSelectedImage(yachtData.imageUrl);
        
        // Set default captain option
        if (yachtData.captain.included) {
          setIncludeCaptain(true);
        }
      }
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const handleBookNow = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Please select dates",
        description: "You need to select both start and end dates for your trip.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Booking Initiated",
      description: `Your booking request for ${yacht?.name} has been received!`,
      variant: "default"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container px-4 md:px-6">
            <div className="h-96 bg-gray-100 rounded-lg animate-pulse mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-8 bg-gray-100 rounded animate-pulse w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2 mb-8"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 bg-gray-100 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!yacht) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container px-4 md:px-6 text-center py-12">
            <Sailboat className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Yacht Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find the yacht you're looking for.
            </p>
            <Link to="/search">
              <Button>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Breadcrumbs */}
          <div className="mb-4 flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/search" className="text-gray-500 hover:text-primary">Search</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{yacht.name}</span>
          </div>
          
          {/* Yacht Name and Quick Info */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">{yacht.name}</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <Heart className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Rating value={yacht.rating} showValue />
              <span className="ml-2 text-gray-600">({yacht.reviewCount} reviews)</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-600">
                <Map className="inline-block h-3.5 w-3.5 mr-1" />
                {yacht.location.city}, {yacht.location.state}
              </span>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
            <div className="md:col-span-8">
              <div className="relative rounded-xl overflow-hidden bg-gray-100 h-[400px] md:h-[500px]">
                <img 
                  src={selectedImage} 
                  alt={yacht.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                {yacht.images.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className={`relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer transition-all ${
                      selectedImage === image ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${yacht.name} - view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Yacht Details */}
            <div className="md:col-span-2">
              {/* Description & Host */}
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {yacht.type} hosted by {yacht.owner.name}
                    </h2>
                    <ul className="flex flex-wrap text-sm text-gray-600 gap-x-4 gap-y-1">
                      <li className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Up to {yacht.capacity} guests
                      </li>
                      <li className="flex items-center">
                        <Ruler className="h-4 w-4 mr-1" />
                        {yacht.length} ft
                      </li>
                      <li className="flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        {yacht.cabins} {yacht.cabins === 1 ? 'cabin' : 'cabins'}
                      </li>
                      <li className="flex items-center">
                        <Info className="h-4 w-4 mr-1" />
                        Year {yacht.year}
                      </li>
                    </ul>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={yacht.owner.avatarUrl} 
                        alt={yacht.owner.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <p className="text-gray-700 whitespace-pre-line">
                    {yacht.description}
                  </p>
                </div>
                
                <Separator className="my-6" />
                
                {/* Captain Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Anchor className="mr-2 h-5 w-5 text-primary" />
                    Captain Information
                  </h3>
                  <div className="bg-ocean-50 rounded-lg p-4">
                    {yacht.captain.included ? (
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Professional Captain Included</p>
                          <p className="text-sm text-gray-600">This yacht comes with a professional captain to navigate and ensure your safety.</p>
                        </div>
                      </div>
                    ) : yacht.captain.optional ? (
                      <div className="flex items-start">
                        <Sailboat className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Captain Optional</p>
                          <p className="text-sm text-gray-600">
                            You can choose to hire a captain for an additional 
                            ${yacht.captain.pricePerDay} per day or navigate the yacht yourself if qualified.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">No Captain - Self-Navigate</p>
                          <p className="text-sm text-gray-600">This yacht is for self-navigation only. You must have appropriate boating licenses and experience.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                    {yacht.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Location */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Location</h3>
                <div className="rounded-lg overflow-hidden h-64 mb-2 bg-gray-100">
                  {/* Map placeholder - would be replaced with actual map component */}
                  <div className="w-full h-full flex items-center justify-center bg-ocean-100">
                    <Map className="h-8 w-8 text-ocean-900" />
                    <span className="ml-2 font-medium text-ocean-900">Map View</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  {yacht.location.city}, {yacht.location.state}, {yacht.location.country}
                </p>
              </div>
            </div>
            
            {/* Right Column - Booking Form */}
            <div className="md:col-span-1">
              <Card className="sticky top-28">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold">${yacht.pricePerDay}</span>
                      <span className="text-gray-600">per day</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Rating value={yacht.rating} size="sm" />
                      <span className="ml-1 text-sm text-gray-600">
                        ({yacht.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Date Selection */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "MMM d, yyyy") : "Select"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                              disabled={(date) => 
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !endDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "MMM d, yyyy") : "Select"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                              disabled={(date) => 
                                date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                (startDate ? date <= startDate : false)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    {/* Guests */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Guests</label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: yacht.capacity }, (_, i) => i + 1).map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Captain Option */}
                    {yacht.captain.optional && (
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <Anchor className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium">Include Captain</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={includeCaptain}
                          onChange={(e) => setIncludeCaptain(e.target.checked)}
                          className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                      </div>
                    )}
                    
                    {/* Price Breakdown */}
                    {rentalDays > 0 && (
                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>${yacht.pricePerDay} x {rentalDays} days</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        
                        {captainFee > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Captain fee</span>
                            <span>${captainFee.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm">
                          <span>Service fee</span>
                          <span>${serviceFee.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Book Now Button */}
                    <Button 
                      onClick={handleBookNow} 
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      {instantBook ? "Book Now" : "Request to Book"}
                    </Button>
                    
                    {/* Instant Book Badge */}
                    {yacht.instantBook && (
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <Sailboat className="h-4 w-4 mr-1 text-primary" />
                        <span>Instant Book Available</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default YachtDetail;
