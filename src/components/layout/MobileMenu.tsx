
import { Link } from "react-router-dom";
import { ChevronDown, Sailboat } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isScrolled: boolean;
  isHomePage: boolean;
}

export const MobileMenu = ({ isScrolled, isHomePage }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Sailboat 
            className={`h-6 w-6 transition-colors ${
              isScrolled || !isHomePage ? "text-gray-900" : "text-white"
            }`} 
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center space-x-2">
              <Sailboat className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold">YachtRentHire</span>
            </Link>
          </div>
          
          <nav className="flex flex-col space-y-4">
            <Link to="/search" className="py-2 text-gray-700 hover:text-primary transition-colors">
              Find a Yacht
            </Link>
            <div className="py-2">
              <div className="flex items-center justify-between text-gray-700 hover:text-primary transition-colors">
                <span>Destinations</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                <Link to="/search?location=Miami,%20Florida" className="py-1 text-gray-600 hover:text-primary transition-colors text-sm">
                  Miami, Florida
                </Link>
                <Link to="/search?location=San%20Diego,%20California" className="py-1 text-gray-600 hover:text-primary transition-colors text-sm">
                  San Diego, California
                </Link>
                <Link to="/search?location=Newport,%20Rhode%20Island" className="py-1 text-gray-600 hover:text-primary transition-colors text-sm">
                  Newport, Rhode Island
                </Link>
                <Link to="/search?location=Seattle,%20Washington" className="py-1 text-gray-600 hover:text-primary transition-colors text-sm">
                  Seattle, Washington
                </Link>
              </div>
            </div>
            <Link to="/how-it-works" className="py-2 text-gray-700 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/list-your-yacht" className="py-2 text-gray-700 hover:text-primary transition-colors">
              List Your Yacht
            </Link>
            <Link to="/login" className="py-2 text-gray-700 hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/signup" className="py-2 text-gray-700 hover:text-primary transition-colors">
              Sign Up
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
