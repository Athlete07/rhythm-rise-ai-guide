
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Clock, 
  LineChart, 
  Zap, 
  Share2, 
  Sparkles
} from "lucide-react";

interface ResultsSectionProps {
  results: {
    type: string;
    chronotype: string;
    description: string;
    timeBlocking: string[];
    tools: string[];
    habits: string[];
  };
  onRestart: () => void;
}

const ResultsSection = ({ results, onRestart }: ResultsSectionProps) => {
  // Typography color mapping based on productivity type
  const getTypeColors = (type: string) => {
    switch (type) {
      case "Deep Work Beast":
        return {
          primary: "text-blue-900",
          secondary: "text-blue-700",
          accent: "bg-blue-600",
          light: "bg-blue-50",
          border: "border-blue-100",
        };
      case "Sprint Strategist":
        return {
          primary: "text-emerald-900",
          secondary: "text-emerald-700",
          accent: "bg-emerald-600",
          light: "bg-emerald-50",
          border: "border-emerald-100",
        };
      case "Flow Surfer":
        return {
          primary: "text-purple-900",
          secondary: "text-purple-700",
          accent: "bg-purple-600",
          light: "bg-purple-50",
          border: "border-purple-100",
        };
      case "Structure Seeker":
        return {
          primary: "text-amber-900",
          secondary: "text-amber-700",
          accent: "bg-amber-600",
          light: "bg-amber-50",
          border: "border-amber-100",
        };
      case "Hybrid Harmonizer":
      default:
        return {
          primary: "text-indigo-900",
          secondary: "text-indigo-700",
          accent: "bg-indigo-600",
          light: "bg-indigo-50",
          border: "border-indigo-100",
        };
    }
  };

  const colors = getTypeColors(results.type);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="text-center space-y-2">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm mb-2">
          <Sparkles size={16} className="text-indigo-600 mr-2" />
          <span className="text-indigo-800 font-medium">Your Results</span>
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${colors.primary}`}>
          You are a {results.type}
        </h1>
        <p className={`text-xl ${colors.secondary} max-w-2xl mx-auto`}>
          with a <span className="font-medium">{results.chronotype}</span> chronotype
        </p>
      </header>

      <Card className={`${colors.light} backdrop-blur-sm ${colors.border} shadow-lg`}>
        <CardContent className="p-6 md:p-8">
          <p className={`text-xl ${colors.primary} leading-relaxed`}>
            {results.description}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="strategy" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="strategy" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Clock size={18} className="mr-2" /> Time Strategy
          </TabsTrigger>
          <TabsTrigger value="tools" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <LineChart size={18} className="mr-2" /> Recommended Tools
          </TabsTrigger>
          <TabsTrigger value="habits" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Brain size={18} className="mr-2" /> Habit Hacks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="strategy" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Your Ideal Time-Blocking Strategy</h3>
              <div className="space-y-3">
                {results.timeBlocking.map((strategy, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${colors.light} flex-shrink-0`}>
                      <Clock size={18} className={colors.secondary} />
                    </div>
                    <p className="text-gray-700">{strategy}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Tools That Match Your Style</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.tools.map((tool, index) => (
                  <div key={index} className="flex items-center p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                    <div className={`p-2 rounded-full ${colors.light} mr-3`}>
                      <Zap size={18} className={colors.secondary} />
                    </div>
                    <p className="font-medium">{tool}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="habits" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Mini Habit Hacks</h3>
              <div className="space-y-4">
                {results.habits.map((habit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${colors.light} flex-shrink-0`}>
                      <Sparkles size={18} className={colors.secondary} />
                    </div>
                    <p className="text-gray-700">{habit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
        <Button
          variant="outline"
          onClick={onRestart}
          className="w-full sm:w-auto border-indigo-300 text-indigo-700"
        >
          Retake Quiz
        </Button>
        
        <Button 
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href).then(() => {
              alert("Quiz link copied to clipboard!");
            });
          }}
        >
          <Share2 size={16} className="mr-2" />
          Share Quiz
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;
