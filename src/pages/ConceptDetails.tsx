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
import { useConceptData } from "@/hooks/useConceptData";
import { useToast } from "@/components/ui/use-toast";

const ConceptDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();
  
  const { data: conceptData, isLoading, error } = useConceptData(slug || "");
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      duration: 2000,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-8 w-64 bg-muted rounded"></div>
            <div className="h-4 w-48 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Error Loading Concept</h2>
              <p className="text-muted-foreground">
                We couldn't load the concept details. Please try again later.
              </p>
              <Button className="mt-4" asChild>
                <Link to="/search">Back to Search</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (!conceptData) {
    return null;
  }
  
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
