
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizSectionProps {
  onComplete: (answers: Record<string, number>) => void;
}

const questions = [
  {
    id: "q1",
    text: "What time of day do you feel mentally sharpest?",
    options: [
      { value: 5, label: "Early morning (5-8 AM)" },
      { value: 4, label: "Morning (8-11 AM)" },
      { value: 3, label: "Midday (11 AM-2 PM)" },
      { value: 2, label: "Afternoon (2-5 PM)" },
      { value: 1, label: "Evening (5-8 PM)" },
      { value: 0, label: "Late night (8 PM or later)" },
    ],
  },
  {
    id: "q2",
    text: "How long does it typically take you to get into a productive flow state?",
    options: [
      { value: 5, label: "Almost immediately (less than 5 minutes)" },
      { value: 4, label: "Quickly (5-15 minutes)" },
      { value: 3, label: "Moderately fast (15-30 minutes)" },
      { value: 2, label: "It takes some time (30-60 minutes)" },
      { value: 1, label: "Usually quite a while (over 1 hour)" },
    ],
  },
  {
    id: "q3",
    text: "When approaching a large project, do you prefer to:",
    options: [
      { value: 5, label: "Break it into many small tasks and work in short bursts" },
      { value: 4, label: "Create a detailed plan with milestones before starting" },
      { value: 3, label: "Dive in and figure it out as I go" },
      { value: 2, label: "Clear a large block of time to work without interruption" },
      { value: 1, label: "Wait for inspiration to strike before getting started" },
    ],
  },
  {
    id: "q4",
    text: "Which work pattern best describes you?",
    options: [
      { value: 5, label: "I prefer to work in short, intense sprints" },
      { value: 4, label: "I like a consistent, steady pace throughout the day" },
      { value: 3, label: "I work best when I have long blocks of focused time" },
      { value: 2, label: "My energy and focus fluctuate throughout the day" },
      { value: 1, label: "I prefer to work when inspiration strikes me" },
    ],
  },
  {
    id: "q5",
    text: "How does your energy typically flow throughout the day?",
    options: [
      { value: 5, label: "Highest in the morning, gradually decreasing" },
      { value: 4, label: "Peaks mid-morning and mid-afternoon" },
      { value: 3, label: "Builds gradually, reaching peak in late afternoon" },
      { value: 2, label: "Low in morning, highest in evening/night" },
      { value: 1, label: "Unpredictable fluctuations throughout the day" },
    ],
  },
  {
    id: "q6",
    text: "After intense focus, how do you prefer to recover?",
    options: [
      { value: 5, label: "Short breaks (5-10 minutes) between tasks" },
      { value: 4, label: "Physical activity (walk, stretch, exercise)" },
      { value: 3, label: "Switch to a different type of work" },
      { value: 2, label: "Longer breaks with complete mental disconnection" },
      { value: 1, label: "Social interaction or conversations" },
    ],
  },
  {
    id: "q7",
    text: "What environment helps you focus best?",
    options: [
      { value: 5, label: "Complete silence with minimal distractions" },
      { value: 4, label: "Background ambient noise or music" },
      { value: 3, label: "Moderate activity around me (like a café)" },
      { value: 2, label: "Changing environments based on my task" },
      { value: 1, label: "Collaborative spaces with others working nearby" },
    ],
  },
  {
    id: "q8",
    text: "How do you respond to deadlines?",
    options: [
      { value: 5, label: "I work steadily well ahead of the deadline" },
      { value: 4, label: "I create a schedule and stick to it" },
      { value: 3, label: "I start early but finish with a final push" },
      { value: 2, label: "I work well under pressure as the deadline approaches" },
      { value: 1, label: "I need deadline pressure to get motivated" },
    ],
  },
  {
    id: "q9",
    text: "Which productivity tools do you find most helpful?",
    options: [
      { value: 5, label: "Detailed task management systems" },
      { value: 4, label: "Calendar blocking and scheduling" },
      { value: 3, label: "Simple to-do lists" },
      { value: 2, label: "Focus timers (like Pomodoro)" },
      { value: 1, label: "Minimal tools/analog systems" },
    ],
  },
  {
    id: "q10",
    text: "What's your biggest productivity challenge?",
    options: [
      { value: 5, label: "Getting started on tasks" },
      { value: 4, label: "Maintaining focus without distractions" },
      { value: 3, label: "Balancing multiple projects/responsibilities" },
      { value: 2, label: "Managing energy throughout the day" },
      { value: 1, label: "Feeling motivated or inspired" },
    ],
  },
];

const QuizSection = ({ onComplete }: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      // Save answer
      setAnswers({
        ...answers,
        [questions[currentQuestion].id]: parseInt(selectedOption),
      });

      if (currentQuestion < questions.length - 1) {
        // Move to next question
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Quiz complete
        const finalAnswers = {
          ...answers,
          [questions[currentQuestion].id]: parseInt(selectedOption),
        };
        onComplete(finalAnswers);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id]?.toString() || null);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-indigo-900">Productivity Style Quiz</h1>
        <p className="text-indigo-700 mt-2">Question {currentQuestion + 1} of {questions.length}</p>
      </header>

      <div className="mb-6">
        <Progress value={progress} className="h-2 bg-indigo-100" indicatorClassName="bg-indigo-600" />
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl font-medium text-indigo-900 mb-6">{question.text}</h2>

          <RadioGroup
            value={selectedOption || ""}
            onValueChange={handleOptionSelect}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedOption === option.value.toString()
                    ? "bg-indigo-50 border-indigo-300"
                    : "border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30"
                }`}
                onClick={() => handleOptionSelect(option.value.toString())}
              >
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`option-${option.value}`}
                  className="text-indigo-600"
                />
                <Label
                  htmlFor={`option-${option.value}`}
                  className="ml-3 flex-grow cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className="text-indigo-700 border-indigo-300"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
        </Button>
      </div>
    </div>
  );
};

export default QuizSection;
