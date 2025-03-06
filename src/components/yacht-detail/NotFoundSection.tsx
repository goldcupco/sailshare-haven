
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundSection = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Yacht Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        We couldn't find the yacht you're looking for.
      </p>
      <Link to="/search">
        <Button>Browse All Yachts</Button>
      </Link>
    </div>
  );
};

export default NotFoundSection;
