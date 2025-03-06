
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import YachtCard from "@/components/shared/YachtCard";
import { featuredYachts } from "@/lib/data";
import { ChevronRight } from "lucide-react";

const FeaturedYachts = () => {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-ocean-50">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Yachts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium yachts available for your next adventure
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredYachts.map((yacht, index) => (
            <div 
              key={yacht.id} 
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <YachtCard yacht={yacht} />
            </div>
          ))}
        </div>
        
        <div className="text-center animate-on-scroll">
          <Link to="/search">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 transition-all duration-300 px-8"
            >
              View All Yachts
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedYachts;
