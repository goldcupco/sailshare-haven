
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
    // Add a slight delay to avoid multiple toasts appearing at once
    const timer = setTimeout(() => {
      testSupabaseConnection().catch(error => {
        console.error("Failed to test Supabase connection:", error);
      });
    }, 1000);
    
    return () => clearTimeout(timer);
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
