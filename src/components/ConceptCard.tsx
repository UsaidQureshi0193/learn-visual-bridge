
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BookOpen, PieChart, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ConceptCardProps {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  slug: string;
}

const difficultyColors = {
  easy: "bg-edu-green-light text-edu-green-dark",
  medium: "bg-edu-yellow-light text-edu-yellow-dark",
  hard: "bg-edu-orange-light text-edu-orange-dark",
};

const ConceptCard = ({ title, description, difficulty, category, slug }: ConceptCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <PieChart className="h-4 w-4" />
          <span>Category: {category}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 bg-muted/40">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Lightbulb className="h-4 w-4 text-edu-yellow" />
          <span className="text-xs">Simplified explanations</span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/concept/${slug}`}>
            Explore <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConceptCard;
