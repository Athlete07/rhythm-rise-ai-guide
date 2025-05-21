
import { Button } from "@/components/ui/button";
import { useState } from "react";
import IntroSection from "@/components/IntroSection";
import QuizSection from "@/components/QuizSection";
import ResultsSection from "@/components/ResultsSection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<"intro" | "quiz" | "results">("intro");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<{
    type: string;
    chronotype: string;
    description: string;
    timeBlocking: string[];
    tools: string[];
    habits: string[];
  } | null>(null);

  const startQuiz = () => {
    setCurrentSection("quiz");
  };

  const handleQuizComplete = (quizAnswers: Record<string, number>) => {
    setAnswers(quizAnswers);
    
    // Calculate results based on answers
    const result = calculateResults(quizAnswers);
    setResults(result);
    setCurrentSection("results");
  };

  const restartQuiz = () => {
    setAnswers({});
    setResults(null);
    setCurrentSection("intro");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {currentSection === "intro" && <IntroSection onStart={startQuiz} />}
        {currentSection === "quiz" && <QuizSection onComplete={handleQuizComplete} />}
        {currentSection === "results" && results && (
          <ResultsSection results={results} onRestart={restartQuiz} />
        )}
      </div>
    </div>
  );
};

// Calculate productivity style based on quiz answers
const calculateResults = (answers: Record<string, number>) => {
  // Sum up scores in different categories
  let cognitiveRhythm = 0;
  let workStyle = 0;
  let energyPattern = 0;
  let focusDrivers = 0;
  let toolUsage = 0;

  // Cognitive Rhythm questions (1-4)
  cognitiveRhythm += answers["q1"] || 0;
  cognitiveRhythm += answers["q2"] || 0;

  // Work Style questions (5-8)
  workStyle += answers["q3"] || 0;
  workStyle += answers["q4"] || 0;

  // Energy Pattern questions (9-12)
  energyPattern += answers["q5"] || 0;
  energyPattern += answers["q6"] || 0;

  // Focus Drivers questions (13-16)
  focusDrivers += answers["q7"] || 0;
  focusDrivers += answers["q8"] || 0;

  // Tool Usage questions (17-20)
  toolUsage += answers["q9"] || 0;
  toolUsage += answers["q10"] || 0;

  // Determine primary type based on highest score
  const scores = {
    "Deep Work Beast": cognitiveRhythm + focusDrivers,
    "Sprint Strategist": workStyle + toolUsage,
    "Flow Surfer": energyPattern + focusDrivers,
    "Structure Seeker": workStyle + toolUsage,
    "Hybrid Harmonizer": (cognitiveRhythm + energyPattern + workStyle + focusDrivers + toolUsage) / 5
  };

  const type = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  // Determine chronotype based on energy pattern and cognitive rhythm
  let chronotype = "Balanced Performer";
  if (answers["q1"] >= 4 && answers["q5"] >= 4) {
    chronotype = "Morning Lark";
  } else if (answers["q1"] <= 2 && answers["q5"] <= 2) {
    chronotype = "Night Owl";
  } else if (answers["q6"] >= 4) {
    chronotype = "Bi-phasic Performer";
  } else if (answers["q4"] >= 4) {
    chronotype = "Ultradian Sprinter";
  }

  // Return results object with type-specific recommendations
  const typeDescriptions = {
    "Deep Work Beast": "You thrive in long, uninterrupted sessions of focused work. You need significant time to enter your flow state, but once there, you can achieve remarkable depth and quality of work.",
    "Sprint Strategist": "You excel in short, high-intensity work bursts. You prefer variety and can quickly shift between different tasks, making you highly adaptable and efficient.",
    "Flow Surfer": "You work best when you can ride your natural creative waves. You need autonomy and the right environment to produce your best work, with strong sensitivity to your surroundings.",
    "Structure Seeker": "You thrive with clear routines and organized systems. You prefer predictability and benefit from detailed planning and regular checkpoints.",
    "Hybrid Harmonizer": "You naturally balance structure and flexibility. You adapt your work style intuitively based on the task at hand and your current energy levels."
  };

  // Generate recommendations based on type
  const timeBlockingStrategies = {
    "Deep Work Beast": [
      "Schedule 2-3 hour blocks of uninterrupted deep work",
      "Hold meetings only during your lower energy periods",
      "Plan for 15-30 minutes of warmup before deep work",
      "End your day with planning for tomorrow"
    ],
    "Sprint Strategist": [
      "Use 25-minute Pomodoro sprints with 5-minute breaks",
      "Group similar tasks together in blocks",
      "Schedule high-energy tasks during your peak hours",
      "Build in transition time between different types of work"
    ],
    "Flow Surfer": [
      "Create flexible time blocks that can shift based on energy",
      "Schedule creative work when you feel most inspired",
      "Build in buffer time between commitments",
      "Reserve one day per week for your most creative work"
    ],
    "Structure Seeker": [
      "Create a consistent daily schedule with fixed blocks",
      "Use time-tracking to optimize your routines",
      "Schedule regular review and planning sessions",
      "Set specific start and end times for all tasks"
    ],
    "Hybrid Harmonizer": [
      "Alternate between structured days and flexible days",
      "Use theme days to batch similar activities",
      "Create morning and afternoon rituals for transitions",
      "Adjust your schedule weekly based on priorities"
    ]
  };

  const toolRecommendations = {
    "Deep Work Beast": ["Freedom", "Brain.fm", "RescueTime", "Notion", "Evernote"],
    "Sprint Strategist": ["Toggl", "Forest", "Taskade", "TickTick", "Sorted"],
    "Flow Surfer": ["Muse", "Brain.fm", "Notion", "MindNode", "Trello"],
    "Structure Seeker": ["Sunsama", "Motion", "Google Calendar", "Things 3", "Todoist"],
    "Hybrid Harmonizer": ["Notion", "Google Calendar", "TickTick", "Todoist", "Centered"]
  };

  const habitRecommendations = {
    "Deep Work Beast": [
      "Create a pre-deep work ritual to signal focus time",
      "Use noise-canceling headphones during focus sessions",
      "Turn off all notifications during deep work",
      "Take a short walk before starting deep work"
    ],
    "Sprint Strategist": [
      "Start each day by identifying your top 3 priorities",
      "Take short breaks between tasks to reset your focus",
      "Use a timer for focused work sessions",
      "Change your environment for different types of tasks"
    ],
    "Flow Surfer": [
      "Track your energy levels to identify natural patterns",
      "Create an inspiring workspace that shifts with your projects",
      "Use music or ambient sounds that match your current task",
      "Take advantage of high-creativity moments when they occur"
    ],
    "Structure Seeker": [
      "Begin and end your workday at consistent times",
      "Use checklists for recurring processes",
      "Schedule buffer time between meetings",
      "Do a weekly review every Friday afternoon"
    ],
    "Hybrid Harmonizer": [
      "Check in with yourself throughout the day to assess energy",
      "Move between different workspaces based on task type",
      "Use different productivity techniques for different projects",
      "Balance planned work with spontaneous creative time"
    ]
  };

  return {
    type,
    chronotype,
    description: typeDescriptions[type],
    timeBlocking: timeBlockingStrategies[type],
    tools: toolRecommendations[type],
    habits: habitRecommendations[type]
  };
};

export default Index;
