
import { useState } from "react";
import { Search, BookOpen, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface SearchBoxProps {
  size?: "default" | "large";
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchBox = ({ 
  size = "default", 
  placeholder = "Search for any concept...", 
  autoFocus = false 
}: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex w-full ${size === "large" ? "max-w-2xl" : "max-w-md"}`}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className={`${size === "large" ? "h-5 w-5" : "h-4 w-4"} text-muted-foreground`} />
        </div>
        <Input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full ${size === "large" ? "pl-10 pr-14 py-6 text-lg" : "pl-9 pr-12"} rounded-r-none border-r-0`}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
      <Button 
        type="submit" 
        className={`rounded-l-none ${size === "large" ? "px-6 py-6 text-base" : ""}`}
      >
        <span className="hidden sm:inline mr-1">Search</span>
        <BookOpen className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBox;
