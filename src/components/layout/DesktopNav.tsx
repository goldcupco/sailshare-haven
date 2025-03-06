
import { Link } from "react-router-dom";
import { Heart, LogIn, LogOut, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationsDropdown } from "./DestinationsDropdown";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
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
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const { toast } = useToast();

  // Listen for changes to favorites in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(favs.length);
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleFavorites = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to access your favorites.",
      });
      return;
    }
    
    // Toggle favorites modal
    setShowFavoritesModal(!showFavoritesModal);
    
    if (!showFavoritesModal) {
      // Only show toast when opening
      toast({
        title: "Favorites",
        description: "View your favorite yachts and saved searches.",
      });
    }
    
    // For demo purposes, we'll add a fake favorite if there are none
    if (favorites === 0) {
      const fakeFavorites = [{ id: 1, name: "Ocean Explorer" }];
      localStorage.setItem("favorites", JSON.stringify(fakeFavorites));
      setFavorites(1);
    }
  };

  const handleMessages = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to access your messages.",
      });
      return;
    }
    
    // Toggle chat modal
    setShowChatModal(!showChatModal);
    
    if (!showChatModal) {
      // Only show toast when opening
      toast({
        title: "Messages",
        description: "Access your conversations with yacht owners and charter services.",
      });
    }
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

      {/* Favorites Modal */}
      {showFavoritesModal && isLoggedIn && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowFavoritesModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Favorites</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowFavoritesModal(false)}>✕</Button>
            </div>
            <div className="space-y-4">
              {favorites > 0 ? (
                <div className="border rounded-md p-3 flex items-center">
                  <div>
                    <h3 className="font-medium">Ocean Explorer</h3>
                    <p className="text-sm text-gray-500">42ft • Miami, FL</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    View Details
                  </Button>
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">You have no favorites yet.</p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full">Browse More Yachts</Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && isLoggedIn && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowChatModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Messages</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowChatModal(false)}>✕</Button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 min-h-[300px]">
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No messages yet.</p>
                <p className="text-sm">Start a conversation with a yacht owner or charter service.</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Type a message..."
                  disabled
                />
                <Button size="sm" disabled>Send</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
