
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DestinationsDropdownProps {
  isScrolled: boolean;
  isHomePage: boolean;
}

export const DestinationsDropdown = ({ isScrolled, isHomePage }: DestinationsDropdownProps) => {
  return (
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
  );
};
