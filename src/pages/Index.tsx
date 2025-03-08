
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import LocationSection from "@/components/home/LocationSection";
import DatabaseStatusSection from "@/components/home/DatabaseStatusSection";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import { testSupabaseConnection } from "@/lib/supabase";

const Index = () => {
  const [hasTestedConnection, setHasTestedConnection] = useState(false);

  useEffect(() => {
    // Only test connection once to avoid toast pileups
    if (hasTestedConnection) return;
    
    // Test Supabase connection with a slight delay
    const timer = setTimeout(() => {
      testSupabaseConnection()
        .catch(error => {
          console.error("Failed to test Supabase connection:", error);
        })
        .finally(() => {
          setHasTestedConnection(true);
        });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [hasTestedConnection]);

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
