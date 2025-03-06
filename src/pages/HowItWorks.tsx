
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { 
  Ship, 
  Calendar, 
  MessageCircle, 
  Anchor, 
  CheckCircle2, 
  ShieldCheck, 
  LifeBuoy, 
  Headphones
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-ocean-100/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                How SailHaven Works
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Discover how easy it is to book your dream yacht experience or list your vessel with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Find a Yacht
                </Button>
                <Button size="lg" variant="outline">
                  List Your Yacht
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Booking Process Steps */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Booking Your Perfect Yacht in 4 Simple Steps
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our streamlined booking process makes it easy to find and reserve the perfect yacht for your next adventure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Ship className="h-10 w-10 text-primary" />,
                  title: "Search & Discover",
                  description: "Browse our extensive collection of yachts filtered by location, size, and features."
                },
                {
                  icon: <Calendar className="h-10 w-10 text-primary" />,
                  title: "Book Your Dates",
                  description: "Select your preferred dates and submit a booking request to the yacht owner."
                },
                {
                  icon: <MessageCircle className="h-10 w-10 text-primary" />,
                  title: "Connect & Confirm",
                  description: "Communicate with the yacht owner to confirm details and answer any questions."
                },
                {
                  icon: <Anchor className="h-10 w-10 text-primary" />,
                  title: "Enjoy Your Trip",
                  description: "Meet the captain, board your yacht, and enjoy an unforgettable experience on the water."
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative">
                  <div className="absolute -top-4 -left-4 bg-ocean-50 w-8 h-8 rounded-full flex items-center justify-center border border-primary text-primary font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-ocean-50 rounded-full">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-ocean-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Hear From Our Happy Sailors
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Read what our customers have to say about their experiences with SailHaven.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "SailHaven made booking a yacht for our anniversary so easy. The boat was exactly as described and the captain was amazing!",
                  author: "Michael & Sarah",
                  location: "Miami, FL"
                },
                {
                  quote: "As first-time yacht renters, we were nervous, but the whole process was seamless. The support team answered all our questions promptly.",
                  author: "James & Emily",
                  location: "San Diego, CA"
                },
                {
                  quote: "We've used SailHaven three times now and each experience has been fantastic. We'll never use another platform for our sailing adventures.",
                  author: "Robert & Jennifer",
                  location: "Newport, RI"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6 flex-1">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Trust & Safety Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Trust & Safety Guaranteed
                </h2>
                <p className="text-gray-600 mb-8">
                  At SailHaven, we prioritize your safety and peace of mind. Every yacht in our marketplace undergoes a rigorous verification process, and all transactions are secure.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
                      title: "Secure Payments",
                      description: "All transactions are protected with bank-level security."
                    },
                    {
                      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
                      title: "Verified Listings",
                      description: "Each yacht is verified for accuracy and quality."
                    },
                    {
                      icon: <LifeBuoy className="h-6 w-6 text-primary" />,
                      title: "Safety Standards",
                      description: "All vessels meet or exceed coast guard safety requirements."
                    },
                    {
                      icon: <Headphones className="h-6 w-6 text-primary" />,
                      title: "24/7 Support",
                      description: "Our customer service team is always available to assist you."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Yacht safety"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md border border-gray-100 max-w-xs">
                  <div className="flex items-center mb-2">
                    <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-semibold">Safe & Secure</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Every voyage is backed by our guarantee for a worry-free experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-ocean-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about booking and renting yachts with SailHaven.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {[
                {
                  question: "Do I need boating experience to rent a yacht?",
                  answer: "Not necessarily. Many yacht rentals come with a professional captain who will handle the navigation and operation of the vessel. If you want to operate the yacht yourself, you'll need to provide proof of boating experience and any required licenses."
                },
                {
                  question: "What's included in the rental price?",
                  answer: "Rental prices typically include the use of the yacht for the specified time period. Additional costs may include fuel, captain's fee, crew gratuity, catering, and other amenities. Each listing clearly specifies what's included."
                },
                {
                  question: "Can I cancel or reschedule my booking?",
                  answer: "Cancellation policies vary by yacht owner. Each listing specifies the cancellation policy, ranging from flexible to strict. You can view the specific policy before confirming your booking."
                },
                {
                  question: "How far in advance should I book?",
                  answer: "We recommend booking as early as possible, especially during peak seasons and for special occasions. Popular yachts and dates can fill up quickly, sometimes months in advance."
                },
                {
                  question: "Is insurance included in my rental?",
                  answer: "Basic insurance coverage is typically provided by the yacht owner. However, additional coverage options may be available. We recommend reviewing the insurance details in the listing or discussing with the owner."
                }
              ].map((faq, index) => (
                <div key={index} className="py-5">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="text-lg">{faq.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-3">{faq.answer}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to Experience the Ultimate Yachting Adventure?
              </h2>
              <p className="text-white/90 mb-8">
                Whether you're planning a day trip, weekend getaway, or extended voyage, we have the perfect yacht for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Find a Yacht
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  List Your Yacht
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
