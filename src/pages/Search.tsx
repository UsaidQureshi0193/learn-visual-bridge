
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBox from "@/components/SearchBox";
import ConceptCard from "@/components/ConceptCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Filter, History, X } from "lucide-react";

// Sample data
const sampleConcepts = [
  {
    title: "Quantum Superposition",
    description: "Understanding how particles can exist in multiple states simultaneously.",
    difficulty: "hard",
    category: "Physics",
    slug: "quantum-superposition"
  },
  {
    title: "Natural Selection",
    description: "The process by which species adapt to their environment over time.",
    difficulty: "medium",
    category: "Biology",
    slug: "natural-selection"
  },
  {
    title: "Logarithmic Functions",
    description: "Mathematical functions that are the inverse of exponential functions.",
    difficulty: "medium",
    category: "Mathematics",
    slug: "logarithmic-functions"
  },
  {
    title: "Cognitive Dissonance",
    description: "The mental discomfort that results from holding contradictory beliefs.",
    difficulty: "easy",
    category: "Psychology",
    slug: "cognitive-dissonance"
  },
  {
    title: "Photosynthesis",
    description: "The process used by plants to convert light energy into chemical energy.",
    difficulty: "medium",
    category: "Biology",
    slug: "photosynthesis"
  },
  {
    title: "Supply and Demand",
    description: "Economic model of price determination in a market.",
    difficulty: "easy",
    category: "Economics",
    slug: "supply-and-demand"
  },
  {
    title: "Derivative Calculus",
    description: "Mathematical function that describes the rate at which a function changes.",
    difficulty: "hard",
    category: "Mathematics",
    slug: "derivative-calculus"
  },
  {
    title: "Object-Oriented Programming",
    description: "Programming paradigm based on the concept of objects and classes.",
    difficulty: "medium",
    category: "Computer Science",
    slug: "object-oriented-programming"
  }
];

const categories = [
  "All Categories",
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "Psychology",
  "Economics",
  "Computer Science"
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [recentSearches] = useState(["Quantum physics", "Cell division", "Derivatives"]);
  
  const filterConcepts = () => {
    return sampleConcepts.filter(concept => {
      const matchesSearch = searchQuery === "" || 
        concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = selectedCategory === "All Categories" || 
        concept.category === selectedCategory;
        
      return matchesSearch && matchesCategory;
    });
  };
  
  const filteredConcepts = filterConcepts();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-edu-purple-light/50 to-background py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Search for Concepts</h1>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Type in any academic concept you're curious about, and we'll help you
              understand it through visual explanations and examples.
            </p>
            <div className="flex justify-center">
              <SearchBox 
                size="large" 
                autoFocus={true}
                placeholder="Search for any concept (e.g., 'quantum physics', 'photosynthesis')"
              />
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="browse" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="browse" className="gap-2">
                    <BookOpen className="h-4 w-4" /> Browse 
                  </TabsTrigger>
                  <TabsTrigger value="history" className="gap-2">
                    <History className="h-4 w-4" /> Recent Searches
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <select 
                      className="text-sm bg-transparent border-none focus:outline-none pr-8"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <TabsContent value="browse" className="mt-0">
                {filteredConcepts.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredConcepts.map((concept, index) => (
                      <ConceptCard 
                        key={index}
                        title={concept.title}
                        description={concept.description}
                        difficulty={concept.difficulty as "easy" | "medium" | "hard"}
                        category={concept.category}
                        slug={concept.slug}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No concepts found matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All Categories");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Recent Searches</h3>
                    <Button variant="ghost" size="sm">Clear All</Button>
                  </div>
                  
                  {recentSearches.length > 0 ? (
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-md hover:bg-muted/80 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <History className="h-4 w-4 text-muted-foreground" />
                            <span>{search}</span>
                          </div>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">You have no recent searches.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
