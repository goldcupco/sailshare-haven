
import React from "react";
import { BadgeCheck, Sailboat } from "lucide-react";

const BookingExperience: React.FC = () => {
  return (
    <section className="bg-ocean-50 py-12 mt-8">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            The Best Yacht Booking Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SailHaven provides a seamless booking process and exceptional customer service
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <BadgeCheck className="h-8 w-8 text-primary" />,
              title: "Verified Listings",
              description: "Every yacht in our collection is verified for quality and safety."
            },
            {
              icon: <Sailboat className="h-8 w-8 text-primary" />,
              title: "Experienced Captains",
              description: "Optional professional captains available for all yacht rentals."
            },
            {
              icon: <BadgeCheck className="h-8 w-8 text-primary" />,
              title: "Secure Payments",
              description: "Book with confidence using our secure payment platform."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingExperience;
