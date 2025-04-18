
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CheckCircle, XCircle, Award, Brain, ArrowRight } from "lucide-react";
import { Progress } from "./ui/progress";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizSectionProps {
  conceptTitle: string;
  questions: QuizQuestion[];
}

const QuizSection = ({ conceptTitle, questions }: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (!hasAnswered) {
      setSelectedOption(index);
    }
  };

  const checkAnswer = () => {
    setHasAnswered(true);
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (completed) {
    return (
      <Card className="animate-fade-slide-in">
        <CardHeader className="text-center">
          <CardTitle>Quiz Completed!</CardTitle>
          <CardDescription>
            You scored {score} out of {questions.length} on {conceptTitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="rounded-full p-4 bg-edu-purple/10 text-edu-purple">
            <Award className="h-16 w-16" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{Math.round((score / questions.length) * 100)}%</p>
            <p className="text-muted-foreground">
              {score === questions.length 
                ? "Perfect! You've mastered this concept!"
                : score > questions.length / 2 
                  ? "Great job! You're on the right track."
                  : "Keep practicing to improve your understanding."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={resetQuiz} className="w-full sm:w-auto">
            Try Again <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-slide-in">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl">Test Your Knowledge</CardTitle>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-edu-purple" />
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{questions[currentQuestion].question}</h3>
          <RadioGroup value={selectedOption?.toString()} className="gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 p-3 rounded-md border cursor-pointer ${
                  hasAnswered && index === questions[currentQuestion].correctAnswer
                    ? "border-edu-green bg-edu-green-light/20"
                    : hasAnswered && index === selectedOption && index !== questions[currentQuestion].correctAnswer
                    ? "border-edu-orange bg-edu-orange-light/20"
                    : "hover:border-edu-purple hover:bg-muted"
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={hasAnswered} />
                <div className="flex-1">
                  <Label htmlFor={`option-${index}`} className="flex justify-between items-center">
                    <span>{option}</span>
                    {hasAnswered && index === questions[currentQuestion].correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-edu-green" />
                    )}
                    {hasAnswered && index === selectedOption && index !== questions[currentQuestion].correctAnswer && (
                      <XCircle className="h-5 w-5 text-edu-orange" />
                    )}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>

          {hasAnswered && (
            <div className="p-4 border rounded-md bg-muted/40 animate-fade-slide-in">
              <h4 className="font-medium mb-1">Explanation:</h4>
              <p className="text-muted-foreground text-sm">{questions[currentQuestion].explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {hasAnswered ? (
            <span>
              {selectedOption === questions[currentQuestion].correctAnswer
                ? "Correct! Well done."
                : "That's not quite right. Review the explanation."}
            </span>
          ) : (
            <span>Select an answer to continue</span>
          )}
        </div>
        {!hasAnswered ? (
          <Button 
            onClick={checkAnswer} 
            disabled={selectedOption === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={nextQuestion}>
            {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizSection;
