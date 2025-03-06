import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Sailboat,
  DollarSign,
  Calendar,
  Shield,
  Users,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
  Loader2
} from "lucide-react";
import { submitYachtListingInterest } from "@/lib/yacht-services";

const ListYourYacht = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    yachtType: "",
    yachtLength: "",
    location: "",
    comments: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  
  const handleGetStarted = () => {
    // Scroll to form section
    const formSection = document.getElementById("yacht-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
    toast({
      title: "Let's get you started!",
      description: "Fill out the form below to list your yacht."
    });
  };
  
  const handleLearnMore = () => {
    // Scroll to the "How It Works" section
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
    }
    toast({
      title: "Learn about our process",
      description: "Discover how listing your yacht works in 3 simple steps."
    });
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if required fields are filled
    const requiredFields = ["firstName", "lastName", "email", "phone"];
    const isFormValid = requiredFields.every(field => formData[field as keyof typeof formData]);
    
    if (isFormValid) {
      setLoading(true);
      
      try {
        await submitYachtListingInterest(formData);
        
        toast({
          title: "Information Submitted!",
          description: "We'll contact you soon to complete your yacht listing.",
          variant: "default"
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          yachtType: "",
          yachtLength: "",
          location: "",
          comments: ""
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your information. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Please fill all required fields",
        description: "We need your contact information to proceed.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-ocean-100/80 to-ocean-50/80 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  List Your Yacht and Start Earning
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  Turn your yacht into a source of income. Join thousands of yacht owners who trust SailHaven to connect them with qualified renters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleLearnMore}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury yacht"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md max-w-xs">
                  <div className="flex items-center mb-1">
                    <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                    <span className="font-semibold">Earn up to $50,000 per season</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Our top owners earn significant income from their listings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Why List With SailHaven?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide everything you need to successfully rent your yacht with confidence and ease.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Access to Qualified Renters",
                  description: "Connect with pre-screened renters looking for quality yacht experiences."
                },
                {
                  icon: <DollarSign className="h-10 w-10 text-primary" />,
                  title: "Maximize Your Income",
                  description: "Set your own rates and availability to optimize your earning potential."
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "$1M Insurance Coverage",
                  description: "Rentals are protected by our comprehensive insurance policy."
                },
                {
                  icon: <Calendar className="h-10 w-10 text-primary" />,
                  title: "Flexible Scheduling",
                  description: "Full control over your calendar and booking availability."
                },
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Quick & Easy Setup",
                  description: "List your yacht in minutes with our streamlined process."
                },
                {
                  icon: <Star className="h-10 w-10 text-primary" />,
                  title: "Support & Resources",
                  description: "Access to owner resources and dedicated support team."
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-ocean-50 rounded-full">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-ocean-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                How Listing Your Yacht Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our simple 3-step process gets you up and running quickly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "1",
                  title: "Create Your Listing",
                  description: "Add photos, details, pricing, and availability for your yacht."
                },
                {
                  number: "2",
                  title: "Accept Bookings",
                  description: "Review booking requests and communicate with potential renters."
                },
                {
                  number: "3",
                  title: "Get Paid",
                  description: "Receive secure payments directly to your account after each trip."
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white p-8 rounded-xl shadow-sm h-full">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                    <div className="pt-6 text-center">
                      <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Hear From Our Yacht Owners
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See what other yacht owners are saying about their experience with SailHaven.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "I've been able to offset my yacht maintenance costs completely thanks to SailHaven. The platform is so easy to use, and the support team is always responsive.",
                  author: "Captain Michael",
                  yacht: "42' Sailing Yacht",
                  location: "Miami, FL"
                },
                {
                  quote: "As a new yacht owner, I was hesitant to rent my boat to strangers. SailHaven's verification process and insurance coverage gave me peace of mind, and now it's a great source of income.",
                  author: "Jessica T.",
                  yacht: "38' Catamaran",
                  location: "San Diego, CA"
                },
                {
                  quote: "I've tried other platforms, but SailHaven has brought me the most bookings by far. The quality of renters is excellent, and the payment process is seamless.",
                  author: "Captain Robert",
                  yacht: "55' Motor Yacht",
                  location: "Fort Lauderdale, FL"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-ocean-50 p-6 rounded-xl shadow-sm">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6 flex-1">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.yacht} • {testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 bg-ocean-50/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We only succeed when you do. Our fee structure is designed to maximize your earnings.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="standard" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="standard">Standard Listing</TabsTrigger>
                  <TabsTrigger value="premium">Premium Listing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard" className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">Standard Listing</h3>
                      <div className="flex items-end mb-6">
                        <span className="text-4xl font-bold">15%</span>
                        <span className="text-gray-600 ml-2">commission per booking</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {[
                          "Basic listing with up to 10 photos",
                          "Standard search visibility",
                          "$1M insurance coverage",
                          "24/7 customer support",
                          "Secure payment processing"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => {
                          toast({
                            title: "Standard Plan Selected",
                            description: "You've chosen our Standard Listing plan."
                          });
                          const formSection = document.getElementById("yacht-form");
                          if (formSection) {
                            formSection.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        Get Started
                      </Button>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-4">What's included:</h4>
                      <ul className="space-y-4">
                        <li className="flex">
                          <div className="mr-4 bg-ocean-100 p-2 rounded-full">
                            <Sailboat className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-medium">Full Listing Control</h5>
                            <p className="text-gray-600 text-sm">Set your own pricing, availability, and booking requirements.</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mr-4 bg-ocean-100 p-2 rounded-full">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-medium">Insurance Protection</h5>
                            <p className="text-gray-600 text-sm">Comprehensive coverage for peace of mind during rentals.</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mr-4 bg-ocean-100 p-2 rounded-full">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-medium">Renter Screening</h5>
                            <p className="text-gray-600 text-sm">Access to verified renters with profile reviews.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="premium" className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                        RECOMMENDED
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Premium Listing</h3>
                      <div className="flex items-end mb-6">
                        <span className="text-4xl font-bold">10%</span>
                        <span className="text-gray-600 ml-2">commission per booking</span>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {[
                          "Enhanced listing with up to 30 photos",
                          "Priority search placement",
                          "$2M insurance coverage",
                          "Priority 24/7 support",
                          "Secure payment processing",
                          "Professional photography service",
                          "Marketing promotion"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => {
                          toast({
                            title: "Premium Plan Selected",
                            description: "You've chosen our Premium Listing plan. Great choice!"
                          });
                          const formSection = document.getElementById("yacht-form");
                          if (formSection) {
                            formSection.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        Get Started
                      </Button>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-4">Premium Benefits:</h4>
                      <ul className="space-y-4">
                        <li className="flex">
                          <div className="mr-4 bg-ocean-100 p-2 rounded-full">
                            <Star className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-medium">Featured Placement</h5>
                            <p className="text-gray-600 text-sm">Priority visibility in search results and featured sections.</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mr-4 bg-ocean-100 p-2 rounded-full">
                            <DollarSign className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-medium">Lower Commission</h5>
                            <p className="text-gray-600 text-sm">Reduced 10% commission rate for higher earnings.</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mr-4 bg-ocean-100 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-medium">Booking Optimization</h5>
                            <p className="text-gray-600 text-sm">Advanced tools to maximize your booking potential.</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mr-4 bg-ocean-100 p-2 rounded-full">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h5 className="font-medium">Extended Insurance</h5>
                            <p className="text-gray-600 text-sm">Higher coverage limits for additional protection.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Get Started Form Section */}
        <section id="yacht-form" className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Ready to List Your Yacht?
                </h2>
                <p className="text-gray-600 mb-8">
                  Complete this form to get started. Our team will contact you shortly to help set up your listing and answer any questions.
                </p>
                <div className="bg-ocean-50 p-6 rounded-xl mb-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    No upfront fees
                  </h3>
                  <p className="text-sm text-gray-600">
                    There's no cost to list your yacht. You only pay when you earn.
                  </p>
                </div>
                <div className="bg-ocean-50 p-6 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    Full support available
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our team can help with pricing, photography, and listing optimization.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Enter your first name" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Enter your last name" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input 
                      id="phone" 
                      placeholder="Enter your phone number" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yachtType">Yacht Type</Label>
                      <select
                        id="yachtType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.yachtType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select type</option>
                        <option value="motor">Motor Yacht</option>
                        <option value="sailing">Sailing Yacht</option>
                        <option value="catamaran">Catamaran</option>
                        <option value="superyacht">Superyacht</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yachtLength">Yacht Length (ft)</Label>
                      <Input 
                        id="yachtLength" 
                        placeholder="Enter length in feet" 
                        value={formData.yachtLength}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="Where is your yacht located?" 
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="comments">Additional Information</Label>
                    <Textarea 
                      id="comments" 
                      placeholder="Tell us more about your yacht and any questions you have"
                      className="min-h-[100px]"
                      value={formData.comments}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Information"
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Join the SailHaven Owner Community Today
              </h2>
              <p className="text-white/90 mb-8">
                Turn your yacht from an expense into an income-generating asset. Join thousands of successful yacht owners on the premier yacht rental marketplace.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => {
                  const formSection = document.getElementById("yacht-form");
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: "smooth" });
                  }
                  toast({
                    title: "Let's get your yacht listed!",
                    description: "Complete the form to join our marketplace."
                  });
                }}
              >
                List Your Yacht Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListYourYacht;
