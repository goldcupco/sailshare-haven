
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/home/Hero";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import LocationSection from "@/components/home/LocationSection";
import { Button } from "@/components/ui/button";
import { Anchor, ShieldCheck, Sailboat, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  // Initialize animation observers for intersection triggered animations
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

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-6">
                  <div className="animate-on-scroll">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">The Ultimate Yachting Experience</h2>
                    <p className="text-gray-600 mb-6">
                      Whether you're planning a day cruise, special event, or extended vacation, we make finding and booking the perfect yacht simple and seamless.
                    </p>
                  </div>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start animate-on-scroll">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center mr-4">
                        <Sailboat className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Extensive Fleet</h3>
                        <p className="text-gray-600">Access to thousands of luxury yachts across the country, from sleek sailboats to premium motor yachts.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start animate-on-scroll">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center mr-4">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Secure Booking</h3>
                        <p className="text-gray-600">Our platform offers secure payment processing and verification for peace of mind with every reservation.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start animate-on-scroll">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center mr-4">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Premium Experience</h3>
                        <p className="text-gray-600">Each yacht in our collection meets our high standards for quality, safety, and comfort.</p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-8 animate-on-scroll">
                    <Button className="bg-primary hover:bg-primary/90">
                      Learn How It Works
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 animate-on-scroll">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1571689248044-eb1f8d573e01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
                    alt="Luxury yacht experience"
                    className="rounded-xl shadow-2xl object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl max-w-xs animate-fade-up">
                    <div className="flex items-center mb-2">
                      <Anchor className="h-5 w-5 text-accent mr-2" />
                      <h4 className="font-semibold">Instant Booking</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Many of our yachts offer instant booking for immediate confirmation of your reservation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedYachts />
        <LocationSection />
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-ocean-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-ocean-100 max-w-2xl mx-auto">
                Hear from our satisfied customers about their unforgettable experiences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Our day on the Azure Dreams was absolutely perfect. The yacht was immaculate and the captain was professional and friendly. Will definitely book again!",
                  author: "Jennifer L.",
                  location: "Miami, FL",
                  delay: 0
                },
                {
                  quote: "From booking to departure, the entire process was seamless. The yacht exceeded our expectations and made our anniversary truly special.",
                  author: "Robert & Sarah T.",
                  location: "San Diego, CA",
                  delay: 100
                },
                {
                  quote: "As a first-time yacht renter, I was nervous, but the YachtRent team made everything so easy. The yacht was gorgeous and the day couldn't have been better.",
                  author: "Michael K.",
                  location: "Newport, RI",
                  delay: 200
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="glass dark:border-ocean-800 rounded-xl p-6 animate-on-scroll"
                  style={{ animationDelay: `${testimonial.delay}ms` }}
                >
                  <svg className="h-10 w-10 text-accent mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="mb-4 text-ocean-50 italic">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-ocean-200 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="bg-gradient-to-r from-ocean-900 to-ocean-800 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center animate-on-scroll">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Set Sail?</h2>
                  <p className="text-ocean-100 mb-8 max-w-md">
                    Browse our collection of premium yachts and book your perfect maritime experience today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-white text-ocean-900 hover:bg-white/90">
                      Find a Yacht
                    </Button>
                    <Button variant="outline" className="text-white border-white hover:bg-white/10">
                      List Your Yacht
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto animate-on-scroll">
                  <img
                    src="https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                    alt="Yacht at sunset"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
