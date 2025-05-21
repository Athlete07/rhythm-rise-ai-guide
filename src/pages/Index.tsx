
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
    strengths: string[];
    challenges: string[];
    compatibility: {
      works_well_with: string[];
      challenges_with: string[];
    };
    score: {
      cognitive: number;
      workStyle: number;
      energy: number;
      focus: number;
      toolUsage: number;
    };
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
  cognitiveRhythm += answers["q14"] || 0;
  cognitiveRhythm += answers["q18"] || 0;

  // Work Style questions (5-8)
  workStyle += answers["q3"] || 0;
  workStyle += answers["q4"] || 0;
  workStyle += answers["q11"] || 0;
  workStyle += answers["q17"] || 0;

  // Energy Pattern questions (9-12)
  energyPattern += answers["q5"] || 0;
  energyPattern += answers["q6"] || 0;
  energyPattern += answers["q12"] || 0;
  energyPattern += answers["q20"] || 0;

  // Focus Drivers questions (13-16)
  focusDrivers += answers["q7"] || 0;
  focusDrivers += answers["q8"] || 0;
  focusDrivers += answers["q15"] || 0;
  focusDrivers += answers["q16"] || 0;

  // Tool Usage questions (17-20)
  toolUsage += answers["q9"] || 0;
  toolUsage += answers["q10"] || 0;
  toolUsage += answers["q13"] || 0;
  toolUsage += answers["q19"] || 0;

  // Normalize scores to 0-100 scale
  const normalizeScore = (score: number) => Math.round((score / 20) * 100);
  
  const scores = {
    cognitive: normalizeScore(cognitiveRhythm),
    workStyle: normalizeScore(workStyle),
    energy: normalizeScore(energyPattern),
    focus: normalizeScore(focusDrivers),
    tools: normalizeScore(toolUsage)
  };

  // Determine primary type based on highest score
  const typeScores = {
    "Deep Work Beast": (cognitiveRhythm * 1.5 + focusDrivers) / 2.5,
    "Sprint Strategist": (workStyle * 1.2 + toolUsage) / 2.2,
    "Flow Surfer": (energyPattern * 1.3 + focusDrivers) / 2.3,
    "Structure Seeker": (workStyle * 1.1 + toolUsage * 1.1) / 2.2,
    "Hybrid Harmonizer": (cognitiveRhythm + energyPattern + workStyle + focusDrivers + toolUsage) / 5
  };

  const type = Object.keys(typeScores).reduce((a, b) => typeScores[a] > typeScores[b] ? a : b);

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
    "Deep Work Beast": "You thrive in long, uninterrupted sessions of focused work. You need significant time to enter your flow state, but once there, you can achieve remarkable depth and quality of work. You prioritize complex, challenging tasks that require deep thinking.",
    "Sprint Strategist": "You excel in short, high-intensity work bursts. You prefer variety and can quickly shift between different tasks, making you highly adaptable and efficient. Your energy comes in waves, and you instinctively know how to ride them.",
    "Flow Surfer": "You work best when you can ride your natural creative waves. You need autonomy and the right environment to produce your best work, with strong sensitivity to your surroundings. Your productivity is closely tied to your inspiration and physical state.",
    "Structure Seeker": "You thrive with clear routines and organized systems. You prefer predictability and benefit from detailed planning and regular checkpoints. For you, productivity is about consistency and methodical progress.",
    "Hybrid Harmonizer": "You naturally balance structure and flexibility. You adapt your work style intuitively based on the task at hand and your current energy levels. This versatility allows you to excel across different types of projects and environments."
  };

  // Generate recommendations based on type
  const timeBlockingStrategies = {
    "Deep Work Beast": [
      "Schedule 2-3 hour blocks of uninterrupted deep work",
      "Hold meetings only during your lower energy periods",
      "Plan for 15-30 minutes of warmup before deep work",
      "End your day with planning for tomorrow",
      "Create a ritual to signal the start of deep work sessions",
      "Use 90-minute cycles aligned with your ultradian rhythm"
    ],
    "Sprint Strategist": [
      "Use 25-minute Pomodoro sprints with 5-minute breaks",
      "Group similar tasks together in blocks",
      "Schedule high-energy tasks during your peak hours",
      "Build in transition time between different types of work",
      "Plan your day in 30-minute increments",
      "Allow for spontaneous productivity bursts"
    ],
    "Flow Surfer": [
      "Create flexible time blocks that can shift based on energy",
      "Schedule creative work when you feel most inspired",
      "Build in buffer time between commitments",
      "Reserve one day per week for your most creative work",
      "Track your energy patterns to identify optimal creative windows",
      "Allow for 'creativity incubation' time with no specific output goals"
    ],
    "Structure Seeker": [
      "Create a consistent daily schedule with fixed blocks",
      "Use time-tracking to optimize your routines",
      "Schedule regular review and planning sessions",
      "Set specific start and end times for all tasks",
      "Plan your week in advance with detailed time allocation",
      "Create templates for recurring activities and workflows"
    ],
    "Hybrid Harmonizer": [
      "Alternate between structured days and flexible days",
      "Use theme days to batch similar activities",
      "Create morning and afternoon rituals for transitions",
      "Adjust your schedule weekly based on priorities",
      "Balance deep work with collaborative sessions",
      "Reserve both structured and unstructured thinking time"
    ]
  };

  const toolRecommendations = {
    "Deep Work Beast": ["Freedom", "Brain.fm", "RescueTime", "Notion", "Evernote", "Forest app", "Noise-canceling headphones"],
    "Sprint Strategist": ["Toggl", "Forest", "Taskade", "TickTick", "Sorted", "TimeBloc", "Focus@Will", "Any.do"],
    "Flow Surfer": ["Muse", "Brain.fm", "Notion", "MindNode", "Trello", "Day.io", "Inspiration cards", "Environment switcher"],
    "Structure Seeker": ["Sunsama", "Motion", "Google Calendar", "Things 3", "Todoist", "Roam Research", "Airtable", "OmniFocus"],
    "Hybrid Harmonizer": ["Notion", "Google Calendar", "TickTick", "Todoist", "Centered", "Tiago Forte's PARA method", "Obsidian", "Coda"]
  };

  const habitRecommendations = {
    "Deep Work Beast": [
      "Create a pre-deep work ritual to signal focus time",
      "Use noise-canceling headphones during focus sessions",
      "Turn off all notifications during deep work",
      "Take a short walk before starting deep work",
      "Keep a 'distraction log' during focus sessions",
      "Practice meditation to improve concentration"
    ],
    "Sprint Strategist": [
      "Start each day by identifying your top 3 priorities",
      "Take short breaks between tasks to reset your focus",
      "Use a timer for focused work sessions",
      "Change your environment for different types of tasks",
      "Practice the '2-minute rule' for quick tasks",
      "Use visual cues to track daily progress"
    ],
    "Flow Surfer": [
      "Track your energy levels to identify natural patterns",
      "Create an inspiring workspace that shifts with your projects",
      "Use music or ambient sounds that match your current task",
      "Take advantage of high-creativity moments when they occur",
      "Keep an inspiration journal or idea capture system",
      "Design your environment to minimize unnecessary decisions"
    ],
    "Structure Seeker": [
      "Begin and end your workday at consistent times",
      "Use checklists for recurring processes",
      "Schedule buffer time between meetings",
      "Do a weekly review every Friday afternoon",
      "Create templates for common tasks and communications",
      "Batch process emails and messages at specific times"
    ],
    "Hybrid Harmonizer": [
      "Check in with yourself throughout the day to assess energy",
      "Move between different workspaces based on task type",
      "Use different productivity techniques for different projects",
      "Balance planned work with spontaneous creative time",
      "Practice context switching with transitional rituals",
      "Regularly experiment with new productivity methods"
    ]
  };

  const strengthsByType = {
    "Deep Work Beast": [
      "Exceptional ability to concentrate for extended periods",
      "High output quality on complex knowledge work",
      "Strong analytical thinking and problem-solving",
      "Excellent at completing challenging, long-term projects",
      "Natural fit for roles requiring depth over breadth"
    ],
    "Sprint Strategist": [
      "Outstanding adaptability to changing priorities",
      "Efficient handling of varied workloads",
      "Quick decision-making under pressure",
      "Natural multitasker who can juggle different responsibilities",
      "High energy output in short, focused bursts"
    ],
    "Flow Surfer": [
      "Exceptional creative thinking and innovation",
      "Strong intuitive understanding of complex systems",
      "Ability to make unconventional connections between ideas",
      "Natural at work requiring artistic or lateral thinking",
      "High-quality output when working in optimal conditions"
    ],
    "Structure Seeker": [
      "Excellent at creating and maintaining systems",
      "Consistent, reliable output and follow-through",
      "Strong organizational skills and attention to detail",
      "Natural talent for logistics and operations",
      "Ability to create order from chaos"
    ],
    "Hybrid Harmonizer": [
      "Versatility across different work contexts",
      "Natural ability to balance structure with creativity",
      "Strong adaptability to different team dynamics",
      "Excellent at translating between different working styles",
      "Ability to optimize approach based on the specific challenge"
    ]
  };

  const challengesByType = {
    "Deep Work Beast": [
      "May struggle with frequent interruptions",
      "Can find it difficult to shift between tasks quickly",
      "Might overlook smaller details when focused on the big picture",
      "Can be resistant to collaboration during flow states",
      "May need longer recovery after intense focus periods"
    ],
    "Sprint Strategist": [
      "Might find it challenging to sustain focus on a single task",
      "Can sometimes start more than they finish",
      "May underestimate time needed for complex tasks",
      "Risk of burnout from constant task-switching",
      "Can struggle with projects requiring extended deep thinking"
    ],
    "Flow Surfer": [
      "May find structured environments limiting",
      "Output can be inconsistent based on inspiration and environment",
      "Might struggle with administrative or routine tasks",
      "Can find it difficult to articulate creative process to others",
      "May resist planning and scheduling"
    ],
    "Structure Seeker": [
      "Can be thrown off by unexpected changes",
      "Might over-plan at the expense of execution",
      "Can struggle with ambiguous directions or goals",
      "May find it difficult to adapt when plans don't work out",
      "Risk of getting caught in perfectionism"
    ],
    "Hybrid Harmonizer": [
      "May sometimes lack the depth of specialists",
      "Can find it hard to commit to a single approach",
      "Might struggle to explain their adaptive methodology to others",
      "Can be pulled in too many directions without boundaries",
      "May need to actively protect focus time"
    ]
  };

  const compatibilityByType = {
    "Deep Work Beast": {
      works_well_with: ["Structure Seeker", "Hybrid Harmonizer"],
      challenges_with: ["Sprint Strategist", "Flow Surfer"]
    },
    "Sprint Strategist": {
      works_well_with: ["Flow Surfer", "Hybrid Harmonizer"],
      challenges_with: ["Deep Work Beast", "Structure Seeker"]
    },
    "Flow Surfer": {
      works_well_with: ["Sprint Strategist", "Hybrid Harmonizer"],
      challenges_with: ["Deep Work Beast", "Structure Seeker"]
    },
    "Structure Seeker": {
      works_well_with: ["Deep Work Beast", "Hybrid Harmonizer"],
      challenges_with: ["Sprint Strategist", "Flow Surfer"]
    },
    "Hybrid Harmonizer": {
      works_well_with: ["Deep Work Beast", "Sprint Strategist", "Flow Surfer", "Structure Seeker"],
      challenges_with: []
    }
  };

  return {
    type,
    chronotype,
    description: typeDescriptions[type],
    timeBlocking: timeBlockingStrategies[type],
    tools: toolRecommendations[type],
    habits: habitRecommendations[type],
    strengths: strengthsByType[type],
    challenges: challengesByType[type],
    compatibility: compatibilityByType[type],
    score: {
      cognitive: scores.cognitive, 
      workStyle: scores.workStyle,
      energy: scores.energy,
      focus: scores.focus,
      toolUsage: scores.tools
    }
  };
};

export default Index;
