
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/shared/SearchBar";
import { cn } from "@/lib/utils";

const heroBackgrounds = [
  'https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1593351415075-3bac9f45c877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1628690920626-d8149a19adf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
        setTransitioning(false);
      }, 1000);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background images with crossfade effect */}
      {heroBackgrounds.map((bg, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
            index === currentBg ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: `url(${bg})`,
            zIndex: index === currentBg ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center px-4 md:px-6">
        <div 
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-700 delay-100",
            transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          <h1 className="text-white font-bold tracking-tight mb-4 text-4xl md:text-5xl lg:text-6xl animate-fade-up">
            Find Your Perfect <br className="hidden md:inline" />
            <span className="text-accent">Yachting Experience</span>
          </h1>
          <p className="text-white/90 text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Explore the world's finest yacht rentals for unforgettable journeys on the water
          </p>
          
          <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
