
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { popularLocations } from "@/lib/data";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const LocationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));

    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore top yachting locations across the country
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularLocations.map((location, index) => (
            <Link 
              key={location.id}
              to={`/search?location=${encodeURIComponent(location.name)}`}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden h-full border-gray-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <Badge 
                    className="absolute top-3 right-3 bg-white/90 text-gray-900 font-medium"
                  >
                    {location.count} yachts
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {location.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{location.name.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
