
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Rating } from "@/components/ui/rating";
import { yachts } from "@/lib/data";
import { Yacht } from "@/lib/types";
import {
  CalendarIcon,
  ChevronLeft,
  MapPin,
  User,
  Users,
  LifeBuoy,
  Anchor,
  Ship,
  Heart,
  Share2,
  Star,
  MessageSquare,
  Info,
  Home,
  Ruler
} from "lucide-react";

const YachtDetail = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const yacht: Yacht | undefined = yachts.find((y) => y.id === id);

  if (!yacht) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container max-w-6xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Yacht Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">
              We couldn't find the yacht you're looking for.
            </p>
            <Link to="/search">
              <Button>Browse All Yachts</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBookNow = () => {
    toast({
      title: "Booking Initiated",
      description: "Your request has been sent to the yacht owner.",
    });
  };

  const handleSaveToFavorites = () => {
    toast({
      title: "Added to Favorites",
      description: "This yacht has been added to your favorites.",
    });
  };

  const handleShareYacht = () => {
    toast({
      title: "Share Options",
      description: "Sharing options are now available.",
    });
  };

  const handleContactOwner = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the yacht owner.",
    });
  };

  const handleInstantBook = () => {
    toast({
      title: "Booking Confirmed",
      description: "Your booking has been confirmed instantly!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Breadcrumb navigation */}
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/search"
            className="inline-flex items-center text-sm text-primary hover:underline mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to search results
          </Link>

          {/* Yacht Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="rounded-xl overflow-hidden h-[400px]">
              <img
                src={yacht.images[0]}
                alt={yacht.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 h-[400px]">
              {yacht.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden relative"
                >
                  <img
                    src={image}
                    alt={`${yacht.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && yacht.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        +{yacht.images.length - 5} photos
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Yacht Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <h1 className="text-3xl md:text-4xl font-bold">{yacht.name}</h1>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={handleSaveToFavorites}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={handleShareYacht}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <Rating value={yacht.rating} readOnly />
                  <span className="ml-2 text-sm">
                    ({yacht.reviews.length} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{yacht.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border border-gray-100 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-ocean-50">
                    <Ruler className="h-5 w-5 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Length</p>
                    <p className="font-semibold">{yacht.length} ft</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-ocean-50">
                    <Home className="h-5 w-5 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cabins</p>
                    <p className="font-semibold">{yacht.cabins}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-ocean-50">
                    <Users className="h-5 w-5 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-semibold">{yacht.capacity} guests</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 mb-4">{yacht.description}</p>
                <p className="text-gray-600">
                  Experience luxury on the water with this magnificent vessel.
                  Perfect for day trips, overnight stays, or extended voyages.
                  The yacht comes fully equipped with modern amenities and can be
                  operated by our experienced captain and crew.
                </p>
              </div>

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
                    {yacht.amenities.map((amenity, index) => (
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
                        <p className="font-semibold">{yacht.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3 p-2 rounded-full bg-ocean-50">
                        <Anchor className="h-4 w-4 text-ocean-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Year Built</p>
                        <p className="font-semibold">{yacht.year}</p>
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
                          {yacht.captain ? "Included" : "Optional"}
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

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-6">
                  {yacht.reviews.slice(0, 3).map((review, index) => (
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
                {yacht.reviews.length > 3 && (
                  <Button variant="outline" className="mt-4">
                    See all {yacht.reviews.length} reviews
                  </Button>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <div className="rounded-xl overflow-hidden h-[300px] bg-ocean-50 flex items-center justify-center mb-2">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-ocean-600 mx-auto mb-2" />
                    <p className="text-ocean-600 font-medium">
                      Map view available
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  {yacht.location}{" "}
                  <span className="text-primary hover:underline cursor-pointer">
                    Get directions
                  </span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold">${yacht.price}</span>
                      <span className="text-gray-600"> / day</span>
                    </div>
                    {yacht.instantBook && (
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
                            (max {yacht.capacity})
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleBookNow}
                    >
                      Request to Book
                    </Button>
                    {yacht.instantBook && (
                      <Button
                        className="w-full"
                        variant="secondary"
                        size="lg"
                        onClick={handleInstantBook}
                      >
                        Instant Book
                      </Button>
                    )}
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleContactOwner}
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
                    <span>${yacht.price} x 1 day</span>
                    <span>${yacht.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>${Math.round(yacht.price * 0.1)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${yacht.price + Math.round(yacht.price * 0.1)}</span>
                  </div>
                </div>

                <div className="mt-6 bg-ocean-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-600 font-semibold mr-3">
                      {yacht.owner.name.substring(0, 1)}
                    </div>
                    <div>
                      <p className="font-semibold">{yacht.owner.name}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-sm">
                          {yacht.owner.rating} · {yacht.owner.responseRate}%
                          response
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Similar Yachts */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Similar Yachts You May Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {yachts
                .filter((y) => y.id !== yacht.id)
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
                        ({similarYacht.reviews.length})
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">
                      {similarYacht.location}
                    </p>
                    <p className="font-bold">
                      ${similarYacht.price}{" "}
                      <span className="text-gray-600 font-normal">/ day</span>
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default YachtDetail;
