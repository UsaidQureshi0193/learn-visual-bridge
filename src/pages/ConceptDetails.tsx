
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisualExplanation from "@/components/VisualExplanation";
import QuizSection from "@/components/QuizSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Share2, Bookmark, BookmarkCheck, ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Sample data based on slug
const getConceptData = (slug: string) => {
  // In a real application, this would fetch from API
  const concepts = {
    "quantum-superposition": {
      title: "Quantum Superposition",
      description: "Understanding how particles can exist in multiple states simultaneously.",
      difficulty: "hard",
      category: "Physics",
      longDescription: "Quantum superposition is a fundamental principle of quantum mechanics that states that a physical system—such as an electron—exists partly in all its particular, theoretically possible states simultaneously, but, when measured, gives a result corresponding to only one of the possible configurations.",
      visualAnalogy: {
        title: "The Spinning Coin Analogy",
        description: "Think of a spinning coin on a table. While it's spinning, is it heads or tails? In a way, it's both at the same time until it stops spinning and falls to one side. Quantum particles are similar—they exist in multiple states simultaneously until they're observed or measured.",
        imageUrl: "/placeholder.svg"
      },
      examples: [
        {
          title: "Schrödinger's Cat",
          description: "The famous thought experiment where a cat in a box is both alive and dead simultaneously until observed, demonstrating the concept of superposition in macroscopic terms."
        },
        {
          title: "Electron Orbitals",
          description: "Electrons in atoms don't follow specific paths but exist as probability clouds, being in multiple positions simultaneously until measured."
        },
        {
          title: "Quantum Computing",
          description: "Quantum computers use superposition to perform calculations with qubits that can be both 0 and 1 simultaneously, enabling parallel processing."
        }
      ],
      quizQuestions: [
        {
          question: "What happens to a quantum particle in superposition when it is measured?",
          options: [
            "It continues to exist in multiple states",
            "It collapses into one definite state",
            "It disappears completely",
            "It splits into multiple particles"
          ],
          correctAnswer: 1,
          explanation: "When measured, a quantum particle in superposition collapses into just one of its possible states. This is known as wavefunction collapse."
        },
        {
          question: "Which of the following best describes quantum superposition?",
          options: [
            "Particles moving at super high speeds",
            "Particles existing in multiple states simultaneously",
            "Particles changing from one state to another",
            "Particles with super high energy"
          ],
          correctAnswer: 1,
          explanation: "Quantum superposition describes how particles can exist in multiple states simultaneously until they are observed or measured."
        },
        {
          question: "Which technology directly utilizes quantum superposition?",
          options: [
            "Solar panels",
            "Conventional computers",
            "Quantum computers",
            "Microwave ovens"
          ],
          correctAnswer: 2,
          explanation: "Quantum computers use qubits that can be in superposition, allowing them to perform certain calculations much faster than classical computers."
        }
      ],
      relatedConcepts: ["quantum-entanglement", "wave-particle-duality", "uncertainty-principle"]
    },
    // More concepts would be defined here...
    "default": {
      title: "Concept Not Found",
      description: "The concept you're looking for doesn't exist in our database yet.",
      difficulty: "medium",
      category: "General",
      longDescription: "We're constantly adding new concepts to our database. Please check back later or search for a different concept.",
      visualAnalogy: {
        title: "No Visual Analogy Available",
        description: "We don't have a visual analogy for this concept yet.",
        imageUrl: "/placeholder.svg"
      },
      examples: [
        {
          title: "No Examples Available",
          description: "We don't have examples for this concept yet."
        }
      ],
      quizQuestions: [
        {
          question: "Sample question?",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 0,
          explanation: "This is a sample explanation."
        }
      ],
      relatedConcepts: []
    }
  };

  return concepts[slug as keyof typeof concepts] || concepts.default;
};

const ConceptDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const conceptData = getConceptData(slug || "");
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Concept Header */}
        <section className="bg-gradient-to-b from-edu-purple-light/50 to-background py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/search">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-edu-purple/10 text-edu-purple hover:bg-edu-purple/20">
                    {conceptData.category}
                  </Badge>
                  <Badge className={`
                    ${conceptData.difficulty === "easy" ? "bg-edu-green-light text-edu-green-dark" : 
                      conceptData.difficulty === "medium" ? "bg-edu-yellow-light text-edu-yellow-dark" : 
                      "bg-edu-orange-light text-edu-orange-dark"}
                  `}>
                    {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold">{conceptData.title}</h1>
                <p className="text-muted-foreground mt-2">{conceptData.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleBookmark}>
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-1 text-edu-purple" /> 
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-1" /> 
                      Save
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Concept Content */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Long Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium mb-4">Understanding {conceptData.title}</h2>
                  <p className="text-muted-foreground">{conceptData.longDescription}</p>
                </CardContent>
              </Card>
              
              {/* Visual Explanation */}
              <VisualExplanation 
                conceptTitle={conceptData.title}
                simpleExplanation={conceptData.longDescription}
                visualAnalogy={conceptData.visualAnalogy}
                examples={conceptData.examples}
              />
              
              {/* Quiz Section */}
              <QuizSection 
                conceptTitle={conceptData.title}
                questions={conceptData.quizQuestions}
              />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Concepts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Related Concepts</h3>
                  <div className="space-y-3">
                    {conceptData.relatedConcepts.length > 0 ? (
                      conceptData.relatedConcepts.map((concept, index) => (
                        <Link 
                          key={index}
                          to={`/concept/${concept}`}
                          className="flex items-center p-3 rounded-md hover:bg-muted transition-colors"
                        >
                          <BookOpen className="h-4 w-4 mr-3 text-edu-purple" />
                          <span>
                            {concept.split('-')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No related concepts available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Feedback */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Was This Helpful?</h3>
                  <p className="text-muted-foreground mb-4">
                    Help us improve our explanations by providing feedback.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">Yes</Button>
                    <Button variant="outline" className="flex-1">Somewhat</Button>
                    <Button variant="outline" className="flex-1">No</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Ask a Question */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Still Confused?</h3>
                  <div className="relative">
                    <textarea 
                      className="w-full p-3 border rounded-md pr-10 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-edu-purple/50"
                      placeholder="Type your question here..."
                    />
                    <Button size="icon" className="absolute bottom-2 right-2 h-8 w-8 rounded-full">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Our team will respond to your question within 24 hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConceptDetails;
