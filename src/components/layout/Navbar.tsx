
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sailboat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/SearchBar";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { DesktopNav } from "./DesktopNav";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled || !isHomePage
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <Sailboat 
              className={cn(
                "h-8 w-8 transition-colors duration-300",
                isScrolled || !isHomePage ? "text-primary" : "text-white"
              )} 
            />
            <span 
              className={cn(
                "text-xl font-bold transition-colors duration-300",
                isScrolled || !isHomePage ? "text-gray-900" : "text-white"
              )}
            >
              SailHaven
            </span>
          </Link>

          <DesktopNav isScrolled={isScrolled} isHomePage={isHomePage} />

          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className={cn(
                "transition-colors",
                isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <MobileMenu isScrolled={isScrolled} isHomePage={isHomePage} />
          </div>
        </div>
        
        {showSearch && (
          <div className="md:hidden mt-4 animate-fade-in">
            <SearchBar variant="compact" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
