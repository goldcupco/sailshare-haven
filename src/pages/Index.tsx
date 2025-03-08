
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import LocationSection from "@/components/home/LocationSection";
import DatabaseStatusSection from "@/components/home/DatabaseStatusSection";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import { clearConnectionTestCache } from "@/lib/supabase";

const Index = () => {
  useEffect(() => {
    // Clear the connection test cache on component mount
    clearConnectionTestCache();
    
    console.log("Index component mounted - initializing connection test");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <DatabaseStatusSection />
      <FeaturedYachts />
      <LocationSection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
