
import { Link } from "react-router-dom";
import { Heart, LogIn, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationsDropdown } from "./DestinationsDropdown";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  isScrolled: boolean;
  isHomePage: boolean;
}

export const DesktopNav = ({ isScrolled, isHomePage }: DesktopNavProps) => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-1">
        <Link 
          to="/search" 
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}
        >
          Find a Yacht
        </Link>
        <DestinationsDropdown isScrolled={isScrolled} isHomePage={isHomePage} />
        <Link 
          to="/how-it-works" 
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}
        >
          How It Works
        </Link>
        <Link 
          to="/list-your-yacht" 
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}
        >
          List Your Yacht
        </Link>
      </nav>

      <div className="hidden md:flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "transition-colors",
            isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}
        >
          <Heart className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "transition-colors",
            isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        
        <Link to="/login">
          <Button
            variant="ghost"
            className={cn(
              "items-center transition-colors",
              isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
            )}
          >
            <LogIn className="h-5 w-5 mr-1" />
            Log In
          </Button>
        </Link>
        
        <Link to="/signup">
          <Button className="bg-primary hover:bg-primary/90">
            <User className="h-5 w-5 mr-1" />
            Sign Up
          </Button>
        </Link>
      </div>
    </>
  );
};
