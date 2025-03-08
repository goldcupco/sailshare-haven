
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import LocationSection from "@/components/home/LocationSection";
import DatabaseStatusSection from "@/components/home/DatabaseStatusSection";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import { testSupabaseConnection } from "@/lib/supabase";

const Index = () => {
  useEffect(() => {
    // Test Supabase connection when the component mounts
    const checkConnection = async () => {
      try {
        await testSupabaseConnection();
      } catch (error) {
        console.error("Failed to test Supabase connection:", error);
      }
    };
    
    checkConnection();
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
