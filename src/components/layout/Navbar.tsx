
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sailboat, Menu, X, ChevronDown, User, LogIn, Search, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SearchBar from "@/components/shared/SearchBar";
import { cn } from "@/lib/utils";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors",
                    isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
                  )}
                >
                  Destinations
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem>
                  <Link to="/search?location=Miami,%20Florida" className="w-full">
                    Miami, Florida
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/search?location=San%20Diego,%20California" className="w-full">
                    San Diego, California
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/search?location=Newport,%20Rhode%20Island" className="w-full">
                    Newport, Rhode Island
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/search?location=Seattle,%20Washington" className="w-full">
                    Seattle, Washington
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className={cn(
                "md:hidden transition-colors",
                isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden md:flex transition-colors",
                isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
              )}
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden md:flex transition-colors",
                isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
              )}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              className={cn(
                "hidden md:flex items-center transition-colors",
                isScrolled || !isHomePage ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
              )}
            >
              <LogIn className="h-5 w-5 mr-1" />
              Log In
            </Button>
            
            <Button
              className={cn(
                "hidden md:flex bg-primary hover:bg-primary/90"
              )}
            >
              <User className="h-5 w-5 mr-1" />
              Sign Up
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu 
                    className={cn(
                      "h-6 w-6 transition-colors",
                      isScrolled || !isHomePage ? "text-gray-900" : "text-white"
                    )} 
                  />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link to="/" className="flex items-center space-x-2">
                      <Sailboat className="h-7 w-7 text-primary" />
                      <span className="text-xl font-bold">SailHaven</span>
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
                    <Link to="#" className="py-2 text-gray-700 hover:text-primary transition-colors">
                      <Heart className="h-5 w-5 inline mr-2" />
                      Favorites
                    </Link>
                    <Link to="#" className="py-2 text-gray-700 hover:text-primary transition-colors">
                      <MessageCircle className="h-5 w-5 inline mr-2" />
                      Messages
                    </Link>
                  </nav>
                  
                  <div className="mt-8 space-y-3">
                    <Link to="/login" className="w-full">
                      <Button className="w-full" variant="outline">
                        <LogIn className="h-5 w-5 mr-2" />
                        Log In
                      </Button>
                    </Link>
                    <Link to="/signup" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <User className="h-5 w-5 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
