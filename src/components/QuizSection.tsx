
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  {
    id: "q11",
    text: "How do you prioritize your tasks?",
    options: [
      { value: 5, label: "By deadline and importance using a matrix" },
      { value: 4, label: "I tackle the most difficult tasks first" },
      { value: 3, label: "I start with quick wins to build momentum" },
      { value: 2, label: "Based on my energy levels and mood" },
      { value: 1, label: "I often work on what feels urgent in the moment" },
    ],
  },
  {
    id: "q12",
    text: "How do you handle information consumption (reading, learning)?",
    options: [
      { value: 5, label: "Scheduled deep dives with notes and summaries" },
      { value: 4, label: "Regular short bursts throughout the day" },
      { value: 3, label: "Batched in dedicated sessions" },
      { value: 2, label: "Continuously as information comes to me" },
      { value: 1, label: "Mostly when I need specific information for a task" },
    ],
  },
  {
    id: "q13",
    text: "How do you prefer to track your productivity?",
    options: [
      { value: 5, label: "Detailed metrics and analytics" },
      { value: 4, label: "Regular reviews of completed tasks" },
      { value: 3, label: "Reflection on output quality rather than quantity" },
      { value: 2, label: "Feeling of accomplishment at the end of the day" },
      { value: 1, label: "I rarely track productivity formally" },
    ],
  },
  {
    id: "q14",
    text: "When do you do your most creative thinking?",
    options: [
      { value: 5, label: "During structured brainstorming sessions" },
      { value: 4, label: "When relaxed and not focused on work" },
      { value: 3, label: "Early in the morning before distractions" },
      { value: 2, label: "Late at night when it's quiet" },
      { value: 1, label: "Spontaneously throughout the day" },
    ],
  },
  {
    id: "q15",
    text: "How do you handle unexpected interruptions?",
    options: [
      { value: 5, label: "I have systems in place to minimize them" },
      { value: 4, label: "I batch them and address at specific times" },
      { value: 3, label: "I'm flexible and can usually pivot easily" },
      { value: 2, label: "They often derail my productivity completely" },
      { value: 1, label: "I welcome them as breaks from focused work" },
    ],
  },
  {
    id: "q16",
    text: "What helps you stay motivated long-term?",
    options: [
      { value: 5, label: "Clear goals with measurable milestones" },
      { value: 4, label: "Connection to a bigger purpose or mission" },
      { value: 3, label: "Variety and new challenges" },
      { value: 2, label: "Recognition and external validation" },
      { value: 1, label: "Immediate rewards and gratification" },
    ],
  },
  {
    id: "q17",
    text: "How do you approach multitasking?",
    options: [
      { value: 5, label: "I avoid it completely - one task at a time" },
      { value: 4, label: "I batch similar activities together" },
      { value: 3, label: "I can effectively juggle multiple simple tasks" },
      { value: 2, label: "I often have several complex projects active at once" },
      { value: 1, label: "I prefer having multiple inputs at all times" },
    ],
  },
  {
    id: "q18",
    text: "How would you describe your decision-making process?",
    options: [
      { value: 5, label: "Methodical and data-driven" },
      { value: 4, label: "Balanced between analytical and intuitive" },
      { value: 3, label: "Quick and decisive" },
      { value: 2, label: "Collaborative and consensus-seeking" },
      { value: 1, label: "Intuitive and gut-feeling based" },
    ],
  },
  {
    id: "q19",
    text: "How do you handle repetitive or routine tasks?",
    options: [
      { value: 5, label: "I create systems or automate them" },
      { value: 4, label: "I batch them into specific time blocks" },
      { value: 3, label: "I delegate them when possible" },
      { value: 2, label: "I mix them with more engaging tasks" },
      { value: 1, label: "I often procrastinate on them" },
    ],
  },
  {
    id: "q20",
    text: "What's your approach to maintaining work-life balance?",
    options: [
      { value: 5, label: "Strict boundaries with set work hours" },
      { value: 4, label: "Regular disconnected time for rejuvenation" },
      { value: 3, label: "Flexibility to work when inspired, rest when needed" },
      { value: 2, label: "Integration of work and life in a fluid way" },
      { value: 1, label: "I struggle with balance and often overwork" },
    ],
  },
  {
    id: "q21",
    text: "How do you prefer to learn new skills or information?",
    options: [
      { value: 5, label: "Structured courses with clear progression" },
      { value: 4, label: "Self-directed learning with regular practice" },
      { value: 3, label: "By doing and experimenting hands-on" },
      { value: 2, label: "Through discussions and collaborative learning" },
      { value: 1, label: "Immersive deep-dives when needed" },
    ],
  },
  {
    id: "q22",
    text: "When do you typically schedule meetings or collaborative work?",
    options: [
      { value: 5, label: "Early in the day to get them out of the way" },
      { value: 4, label: "Mid-morning when energy is high" },
      { value: 3, label: "Around lunchtime as a break from solo work" },
      { value: 2, label: "Afternoons when I'm less focused on deep work" },
      { value: 1, label: "I try to batch them on specific days" },
    ],
  },
  {
    id: "q23",
    text: "How do you respond to high-pressure situations?",
    options: [
      { value: 5, label: "I thrive and become hyper-focused" },
      { value: 4, label: "I methodically break down problems and stay calm" },
      { value: 3, label: "I seek collaboration to solve complex challenges" },
      { value: 2, label: "I need quiet time to process before responding" },
      { value: 1, label: "I often feel overwhelmed initially but adapt" },
    ],
  },
  {
    id: "q24",
    text: "What environment changes have the biggest impact on your productivity?",
    options: [
      { value: 5, label: "Noise level and audio environment" },
      { value: 4, label: "Visual organization and lack of clutter" },
      { value: 3, label: "Lighting conditions and natural light" },
      { value: 2, label: "Temperature and physical comfort" },
      { value: 1, label: "Presence or absence of other people" },
    ],
  },
  {
    id: "q25",
    text: "Which statement best describes your ideal workflow?",
    options: [
      { value: 5, label: "Predictable routine with scheduled focus periods" },
      { value: 4, label: "Dynamic and flexible, adapting to daily energy" },
      { value: 3, label: "Project-based intensity followed by recovery" },
      { value: 2, label: "Collaborative with regular team interaction" },
      { value: 1, label: "Autonomous with freedom to structure my own time" },
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">Productivity Style Quiz</h1>
        <p className="text-indigo-700 mt-2">Question {currentQuestion + 1} of {questions.length}</p>
      </header>

      <div className="mb-6">
        <Progress value={progress} className="h-2.5 bg-indigo-100" indicatorClassName="bg-gradient-to-r from-indigo-600 to-purple-600" />
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-indigo-100 shadow-lg hover:shadow-xl transition-all">
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
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-sm"
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
          className="text-indigo-700 border-indigo-300 hover:bg-indigo-50"
        >
          <ChevronLeft size={18} className="mr-1" /> Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 transform transition-all hover:-translate-y-0.5"
        >
          {currentQuestion < questions.length - 1 ? (
            <>Next Question <ChevronRight size={18} className="ml-1" /></>
          ) : (
            "See Results"
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuizSection;
