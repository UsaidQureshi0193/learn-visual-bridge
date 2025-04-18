
import { Link } from "react-router-dom";
import { BookOpen, Search, Brain, Award } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-edu-purple" />
          <span className="font-bold text-xl">
            <span className="gradient-text">Concept</span> Visualization
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/search" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            Search Concepts
          </Link>
          <Link to="/examples" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            Examples
          </Link>
          <Link to="/about" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button className="bg-edu-purple hover:bg-edu-purple-dark">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
