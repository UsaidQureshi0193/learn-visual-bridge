
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Book, Image, ChevronDown, ChevronUp, ExternalLink, Grid2X2 } from "lucide-react";
import { Button } from "./ui/button";

interface VisualExplanationProps {
  conceptTitle: string;
  simpleExplanation: string;
  visualAnalogy: {
    title: string;
    description: string;
    imageUrl: string;
  };
  examples: Array<{
    title: string;
    description: string;
  }>;
}

const VisualExplanation = ({
  conceptTitle,
  simpleExplanation,
  visualAnalogy,
  examples
}: VisualExplanationProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden animate-fade-slide-in">
      <CardContent className="p-0">
        <Tabs defaultValue="explanation" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none">
            <TabsTrigger value="explanation" className="gap-2">
              <Book className="h-4 w-4" /> 
              <span className="hidden sm:inline">Explanation</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="gap-2">
              <Image className="h-4 w-4" /> 
              <span className="hidden sm:inline">Visual Analogy</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="gap-2">
              <Grid2X2 className="h-4 w-4" /> 
              <span className="hidden sm:inline">Examples</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explanation" className="p-6">
            <h3 className="text-xl font-medium mb-4">Understanding {conceptTitle}</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {expanded ? simpleExplanation : `${simpleExplanation.slice(0, 250)}...`}
              </p>
              {simpleExplanation.length > 250 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1"
                >
                  {expanded ? (
                    <>Read less <ChevronUp className="h-4 w-4" /></>
                  ) : (
                    <>Read more <ChevronDown className="h-4 w-4" /></>
                  )}
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="visual" className="p-6">
            <h3 className="text-xl font-medium mb-4">{visualAnalogy.title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden bg-muted/30 border aspect-video flex items-center justify-center">
                <img 
                  src={visualAnalogy.imageUrl} 
                  alt={visualAnalogy.title} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <p className="text-muted-foreground">{visualAnalogy.description}</p>
                <Button variant="outline" size="sm" className="mt-4">
                  <ExternalLink className="h-4 w-4 mr-2" /> View in 3D
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="p-6">
            <h3 className="text-xl font-medium mb-4">Real-World Examples</h3>
            <div className="grid gap-4">
              {examples.map((example, index) => (
                <div key={index} className="p-4 rounded-lg border bg-background">
                  <h4 className="font-medium mb-2">{example.title}</h4>
                  <p className="text-muted-foreground text-sm">{example.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VisualExplanation;
