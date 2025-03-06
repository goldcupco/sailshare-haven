
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import { useToast } from "@/components/ui/use-toast";
import { allYachts } from "@/lib/data";
import { Yacht } from "@/lib/types";

// Import refactored components
import YachtGallery from "@/components/yacht-detail/YachtGallery";
import YachtHeader from "@/components/yacht-detail/YachtHeader";
import YachtOverview from "@/components/yacht-detail/YachtOverview";
import YachtDescription from "@/components/yacht-detail/YachtDescription";
import YachtDetailTabs from "@/components/yacht-detail/YachtDetailTabs";
import ReviewsSection from "@/components/yacht-detail/ReviewsSection";
import LocationSection from "@/components/yacht-detail/LocationSection";
import BookingCard from "@/components/yacht-detail/BookingCard";
import SimilarYachts from "@/components/yacht-detail/SimilarYachts";
import NotFoundSection from "@/components/yacht-detail/NotFoundSection";

const sampleReviews = [
  {
    user: "John D.",
    date: "June 2023",
    rating: 5,
    text: "Amazing experience! The yacht was in perfect condition and the crew was professional and friendly."
  },
  {
    user: "Sarah M.",
    date: "May 2023",
    rating: 4.5,
    text: "Wonderful day on the water. Would highly recommend this yacht to anyone looking for a luxurious experience."
  },
  {
    user: "Robert T.",
    date: "April 2023",
    rating: 5,
    text: "Exceeded all expectations. The yacht was beautiful and had all the amenities we needed."
  }
];

const YachtDetail = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const yacht: Yacht | undefined = allYachts.find((y) => y.id === id);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const favoritesStr = localStorage.getItem("favorites");
    if (favoritesStr && yacht) {
      const favorites = JSON.parse(favoritesStr);
      setFavorited(favorites.some((fav: any) => fav.id === yacht.id));
    }
  }, [yacht]);

  if (!yacht) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container max-w-6xl mx-auto px-4 py-24">
          <NotFoundSection />
        </main>
        <Footer />
      </div>
    );
  }

  if (!yacht.reviews) {
    yacht.reviews = sampleReviews;
  }
  
  yacht.price = yacht.pricePerDay;
  
  // Ensure owner has a rating - provide a default if missing
  if (!yacht.owner.rating) {
    yacht.owner.rating = 4.9;
  }

  const handleBookNow = () => {
    toast({
      title: "Booking Initiated",
      description: "Your request has been sent to the yacht owner.",
    });
  };

  const handleSaveToFavorites = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to save favorites.",
      });
      return;
    }
    
    const newFavoritedState = !favorited;
    setFavorited(newFavoritedState);
    
    const favoritesStr = localStorage.getItem("favorites");
    let favorites = favoritesStr ? JSON.parse(favoritesStr) : [];
    
    if (newFavoritedState) {
      if (!favorites.some((fav: any) => fav.id === yacht.id)) {
        favorites.push({ 
          id: yacht.id, 
          name: yacht.name,
          location: `${yacht.location.city}, ${yacht.location.state}`
        });
      }
      toast({
        title: "Added to Favorites",
        description: `${yacht.name} has been added to your favorites.`
      });
    } else {
      favorites = favorites.filter((fav: any) => fav.id !== yacht.id);
      toast({
        title: "Removed from Favorites",
        description: `${yacht.name} has been removed from your favorites.`
      });
    }
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    window.dispatchEvent(new Event('storage'));
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
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <YachtHeader 
            name={yacht.name}
            rating={yacht.rating}
            reviewCount={yacht.reviews.length}
            location={yacht.location}
            favorited={favorited}
            onSaveToFavorites={handleSaveToFavorites}
            onShareYacht={handleShareYacht}
          />

          <YachtGallery images={yacht.images} name={yacht.name} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <YachtOverview 
                length={yacht.length}
                cabins={yacht.cabins}
                capacity={yacht.capacity}
              />

              <YachtDescription description={yacht.description} />

              <YachtDetailTabs 
                amenities={yacht.amenities}
                type={yacht.type}
                year={yacht.year}
                captain={yacht.captain}
              />

              <ReviewsSection reviews={yacht.reviews} />

              <LocationSection location={yacht.location} />
            </div>

            <div className="lg:col-span-1">
              <BookingCard 
                price={yacht.price}
                instantBook={yacht.instantBook}
                capacity={yacht.capacity}
                owner={{
                  name: yacht.owner.name,
                  rating: yacht.owner.rating,
                  responseRate: yacht.owner.responseRate
                }}
                onBookNow={handleBookNow}
                onInstantBook={handleInstantBook}
                onContactOwner={handleContactOwner}
              />
            </div>
          </div>

          <SimilarYachts 
            currentYachtId={yacht.id}
            similarYachts={allYachts}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default YachtDetail;
