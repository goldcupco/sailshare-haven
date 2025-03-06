
import { Link } from "react-router-dom";
import { Heart, LogIn, LogOut, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationsDropdown } from "./DestinationsDropdown";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DesktopNavProps {
  isScrolled: boolean;
  isHomePage: boolean;
}

export const DesktopNav = ({ isScrolled, isHomePage }: DesktopNavProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]").length;
  });
  const { toast } = useToast();

  const handleFavorites = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to access your favorites.",
      });
      return;
    }
    toast({
      title: "Favorites",
      description: "View your favorite yachts and saved searches.",
    });
  };

  const handleMessages = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to access your messages.",
      });
      return;
    }
    toast({
      title: "Messages",
      description: "Access your conversations with yacht owners and charter services.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

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
          onClick={handleFavorites}
          className={cn(
            "transition-colors relative",
            isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}
        >
          <Heart className="h-5 w-5" />
          {favorites > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {favorites}
            </span>
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMessages}
          className={cn(
            "transition-colors",
            isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        
        {isLoggedIn ? (
          <Button
            variant="ghost"
            className={cn(
              "items-center transition-colors",
              isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-1" />
            Log Out
          </Button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};
