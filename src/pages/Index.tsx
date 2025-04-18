
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Lightbulb, Sparkles, Grid2X2, PenTool } from "lucide-react";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import ConceptCard from "@/components/ConceptCard";
import Footer from "@/components/Footer";

const popularConcepts = [
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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-edu-purple-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-slide-in">
              Visualize Complex Concepts, <span className="gradient-text">Simplify Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-slide-in" style={{ animationDelay: "0.1s" }}>
              Making abstract academic ideas easier to understand through
              visual explanations, analogies, and interactive examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-slide-in" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="bg-edu-purple hover:bg-edu-purple-dark">
                <Link to="/search">Start Learning</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/examples">View Examples</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-edu-blue/10 rounded-full animate-pulse" />
            <div className="relative z-10 animate-float">
              <img 
                src="/placeholder.svg" 
                alt="Concept visualization" 
                className="max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Search Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl font-bold">Search Any Concept</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Type in any academic concept you're struggling with, and we'll help you understand it through 
              visualizations and simplified explanations.
            </p>
          </div>
          <div className="flex justify-center">
            <SearchBox size="large" autoFocus={false} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our visualization engine breaks down complex concepts into 
              easy-to-understand components using these approaches:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 stagger-fade-in">
            <div className="bg-background p-6 rounded-lg border shadow-sm">
              <div className="rounded-full p-3 bg-edu-blue-light w-fit mb-4">
                <Lightbulb className="h-6 w-6 text-edu-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Simplified Explanations</h3>
              <p className="text-muted-foreground">
                Clear, jargon-free explanations that break down complex topics into 
                digestible information you can actually understand.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border shadow-sm">
              <div className="rounded-full p-3 bg-edu-purple-light w-fit mb-4">
                <Sparkles className="h-6 w-6 text-edu-purple" />
              </div>
              <h3 className="text-xl font-medium mb-2">Visual Analogies</h3>
              <p className="text-muted-foreground">
                Connect abstract ideas to familiar concepts using visual metaphors 
                that make learning intuitive and memorable.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border shadow-sm">
              <div className="rounded-full p-3 bg-edu-orange-light w-fit mb-4">
                <Grid2X2 className="h-6 w-6 text-edu-orange" />
              </div>
              <h3 className="text-xl font-medium mb-2">Practical Examples</h3>
              <p className="text-muted-foreground">
                See real-world applications of academic concepts to understand how 
                they apply to situations you might encounter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Concepts Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Concepts</h2>
            <Button variant="ghost" asChild>
              <Link to="/search">View All <BookOpen className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularConcepts.map((concept, index) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-edu-purple text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Learning Easier?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are using our visualization engine to understand
            difficult concepts faster and more deeply.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/search">
              Get Started <PenTool className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
