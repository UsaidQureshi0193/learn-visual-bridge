
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBox from "@/components/SearchBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, BookOpen, CheckCircle, Info, ArrowLeft } from "lucide-react";

const Results = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  // This would typically be an API call using the query
  // For demo purposes, we're returning a static result
  const getSearchResults = () => {
    return {
      exactMatch: query.toLowerCase().includes("quantum") ? {
        title: "Quantum Superposition",
        description: "A fundamental principle of quantum mechanics that describes a physical system existing partly in all its particular, theoretically possible states simultaneously.",
        difficulty: "hard",
        category: "Physics",
        slug: "quantum-superposition"
      } : null,
      relatedConcepts: [
        {
          title: "Quantum Entanglement",
          description: "A quantum phenomenon where pairs or groups of particles are generated or interact in ways such that the quantum state of each particle cannot be described independently.",
          difficulty: "hard",
          category: "Physics",
          slug: "quantum-entanglement",
          relevance: 92
        },
        {
          title: "Wave-Particle Duality",
          description: "The concept that every particle or quantum entity may be described as either a particle or a wave, depending on the context of the experiment.",
          difficulty: "medium",
          category: "Physics",
          slug: "wave-particle-duality",
          relevance: 85
        },
        {
          title: "Heisenberg Uncertainty Principle",
          description: "A fundamental principle in quantum mechanics that states that there is a limit to the precision with which complementary variables can be measured.",
          difficulty: "medium",
          category: "Physics",
          slug: "uncertainty-principle",
          relevance: 78
        }
      ],
      suggestedStartingPoints: [
        {
          title: "Introduction to Quantum Mechanics",
          description: "A beginner-friendly overview of the basic principles of quantum mechanics.",
          difficulty: "easy",
          category: "Physics",
          slug: "intro-quantum-mechanics"
        },
        {
          title: "History of Quantum Theory",
          description: "The development of quantum theory through the 20th century and its major contributors.",
          difficulty: "easy",
          category: "Physics",
          slug: "quantum-theory-history"
        }
      ]
    };
  };
  
  const results = getSearchResults();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-edu-purple-light/50 to-background py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/search">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search
                </Link>
              </Button>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Results for: "{query}"</h1>
            <div className="w-full max-w-2xl">
              <SearchBox autoFocus={false} />
            </div>
          </div>
        </section>
        
        {/* Results */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Best Match */}
                {results.exactMatch && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-edu-green" />
                      Best Match
                    </h2>
                    
                    <Card className="overflow-hidden border-edu-purple animate-fade-slide-in">
                      <div className="bg-edu-purple text-white px-4 py-1 text-sm font-medium">
                        Perfect Match
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium">{results.exactMatch.title}</h3>
                          <Badge className="bg-edu-purple/10 text-edu-purple">
                            {results.exactMatch.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {results.exactMatch.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge className={`${
                            results.exactMatch.difficulty === "easy" ? "bg-edu-green-light text-edu-green-dark" : 
                            results.exactMatch.difficulty === "medium" ? "bg-edu-yellow-light text-edu-yellow-dark" : 
                            "bg-edu-orange-light text-edu-orange-dark"
                          }`}>
                            {results.exactMatch.difficulty.charAt(0).toUpperCase() + results.exactMatch.difficulty.slice(1)}
                          </Badge>
                          <Button asChild>
                            <Link to={`/concept/${results.exactMatch.slug}`}>
                              Explore This Concept <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Related Concepts */}
                <div className="space-y-4">
                  <h2 className="text-xl font-medium flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-edu-blue" />
                    Related Concepts
                  </h2>
                  
                  <div className="space-y-4">
                    {results.relatedConcepts.map((concept, index) => (
                      <Card key={index} className="overflow-hidden card-hover animate-fade-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-medium mb-1">{concept.title}</h3>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-edu-purple/10 text-edu-purple">
                                  {concept.category}
                                </Badge>
                                <Badge className={`${
                                  concept.difficulty === "easy" ? "bg-edu-green-light text-edu-green-dark" : 
                                  concept.difficulty === "medium" ? "bg-edu-yellow-light text-edu-yellow-dark" : 
                                  "bg-edu-orange-light text-edu-orange-dark"
                                }`}>
                                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-muted/50">
                              {concept.relevance}% Match
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {concept.description}
                          </p>
                          <div className="flex justify-end">
                            <Button variant="outline" asChild>
                              <Link to={`/concept/${concept.slug}`}>
                                View Concept <ArrowRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Need help? */}
                <Card className="bg-edu-purple/5 border-edu-purple/20">
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                      <div className="rounded-full p-3 bg-edu-purple/10 text-edu-purple mt-1">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Not finding what you need?</h3>
                        <p className="text-muted-foreground mb-4">
                          Try rephrasing your search or check out our suggested starting points below.
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/search">
                            Refine Your Search
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Starting Points */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Info className="h-4 w-4 text-edu-blue" />
                      Suggested Starting Points
                    </h3>
                    <div className="space-y-4">
                      {results.suggestedStartingPoints.map((concept, index) => (
                        <div key={index} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                          <h4 className="font-medium mb-1">{concept.title}</h4>
                          <p className="text-muted-foreground text-sm mb-2">
                            {concept.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <Badge className="bg-edu-green-light text-edu-green-dark">
                              Beginner Friendly
                            </Badge>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/concept/${concept.slug}`}>
                                Start Here
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
