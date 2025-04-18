
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          <div className="rounded-full p-5 bg-edu-purple-light mx-auto w-fit mb-6">
            <Search className="h-8 w-8 text-edu-purple" />
          </div>
          
          <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/search">
                <Search className="mr-2 h-4 w-4" /> Search Concepts
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <Link to="/" className="flex items-center justify-center gap-1 hover:text-foreground transition-colors">
              <ArrowLeft className="h-3 w-3" /> Return to the main page
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
