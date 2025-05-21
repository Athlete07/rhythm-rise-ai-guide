
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Clock, 
  LineChart, 
  Zap, 
  Share2, 
  Sparkles,
  Award,
  Trophy,
  AlertTriangle,
  Users,
  BarChart,
  Star,
  Download,
  Bookmark,
  Calendar,
  CheckCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultsSectionProps {
  results: {
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
          muted: "text-blue-600/70",
          progress: "bg-gradient-to-r from-blue-600 to-blue-500",
          gradientText: "bg-gradient-to-r from-blue-700 to-blue-500",
          gradientBg: "bg-gradient-to-r from-blue-600 to-blue-500",
        };
      case "Sprint Strategist":
        return {
          primary: "text-emerald-900",
          secondary: "text-emerald-700",
          accent: "bg-emerald-600",
          light: "bg-emerald-50",
          border: "border-emerald-100",
          muted: "text-emerald-600/70",
          progress: "bg-gradient-to-r from-emerald-600 to-emerald-500",
          gradientText: "bg-gradient-to-r from-emerald-700 to-emerald-500",
          gradientBg: "bg-gradient-to-r from-emerald-600 to-emerald-500",
        };
      case "Flow Surfer":
        return {
          primary: "text-purple-900",
          secondary: "text-purple-700",
          accent: "bg-purple-600",
          light: "bg-purple-50",
          border: "border-purple-100",
          muted: "text-purple-600/70",
          progress: "bg-gradient-to-r from-purple-600 to-purple-500",
          gradientText: "bg-gradient-to-r from-purple-700 to-purple-500",
          gradientBg: "bg-gradient-to-r from-purple-600 to-purple-500",
        };
      case "Structure Seeker":
        return {
          primary: "text-amber-900",
          secondary: "text-amber-700",
          accent: "bg-amber-600",
          light: "bg-amber-50",
          border: "border-amber-100",
          muted: "text-amber-600/70",
          progress: "bg-gradient-to-r from-amber-600 to-amber-500",
          gradientText: "bg-gradient-to-r from-amber-700 to-amber-500",
          gradientBg: "bg-gradient-to-r from-amber-600 to-amber-500",
        };
      case "Hybrid Harmonizer":
      default:
        return {
          primary: "text-indigo-900",
          secondary: "text-indigo-700",
          accent: "bg-indigo-600",
          light: "bg-indigo-50",
          border: "border-indigo-100",
          muted: "text-indigo-600/70",
          progress: "bg-gradient-to-r from-indigo-600 to-purple-600",
          gradientText: "bg-gradient-to-r from-indigo-700 to-purple-700",
          gradientBg: "bg-gradient-to-r from-indigo-600 to-purple-600",
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
        <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${colors.gradientText} bg-clip-text text-transparent`}>
          You are a {results.type}
        </h1>
        <p className={`text-xl ${colors.secondary} max-w-2xl mx-auto`}>
          with a <span className="font-medium">{results.chronotype}</span> chronotype
        </p>
      </header>

      <Card className={`${colors.light} backdrop-blur-sm ${colors.border} shadow-lg hover:shadow-xl transition-all`}>
        <CardContent className="p-6 md:p-8">
          <p className={`text-xl ${colors.primary} leading-relaxed`}>
            {results.description}
          </p>
        </CardContent>
      </Card>

      {/* Productivity Score Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-gray-100 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <BarChart size={22} className={`mr-2 ${colors.secondary}`} />
            Your Productivity Profile
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Cognitive Rhythm</span>
                <span className="text-sm font-semibold">{results.score.cognitive}%</span>
              </div>
              <Progress value={results.score.cognitive} className="h-2.5" indicatorClassName={colors.progress} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Work Style</span>
                <span className="text-sm font-semibold">{results.score.workStyle}%</span>
              </div>
              <Progress value={results.score.workStyle} className="h-2.5" indicatorClassName={colors.progress} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Energy Management</span>
                <span className="text-sm font-semibold">{results.score.energy}%</span>
              </div>
              <Progress value={results.score.energy} className="h-2.5" indicatorClassName={colors.progress} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Focus Drivers</span>
                <span className="text-sm font-semibold">{results.score.focus}%</span>
              </div>
              <Progress value={results.score.focus} className="h-2.5" indicatorClassName={colors.progress} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Tool Usage</span>
                <span className="text-sm font-semibold">{results.score.toolUsage}%</span>
              </div>
              <Progress value={results.score.toolUsage} className="h-2.5" indicatorClassName={colors.progress} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="strategy" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="strategy" className={`data-[state=active]:${colors.accent} data-[state=active]:text-white`}>
            <Clock size={18} className="mr-2" /> Time Strategy
          </TabsTrigger>
          <TabsTrigger value="tools" className={`data-[state=active]:${colors.accent} data-[state=active]:text-white`}>
            <LineChart size={18} className="mr-2" /> Tools
          </TabsTrigger>
          <TabsTrigger value="habits" className={`data-[state=active]:${colors.accent} data-[state=active]:text-white`}>
            <Brain size={18} className="mr-2" /> Habits
          </TabsTrigger>
          <TabsTrigger value="strengths" className={`data-[state=active]:${colors.accent} data-[state=active]:text-white`}>
            <Trophy size={18} className="mr-2" /> Strengths
          </TabsTrigger>
          <TabsTrigger value="compatibility" className={`data-[state=active]:${colors.accent} data-[state=active]:text-white`}>
            <Users size={18} className="mr-2" /> Compatibility
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="strategy" className="mt-6">
          <Card className="overflow-hidden">
            <div className={`${colors.gradientBg} py-4 px-6`}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Calendar size={20} className="mr-2" />
                Your Ideal Time-Blocking Strategy
              </h3>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4 mt-2">
                {results.timeBlocking.map((strategy, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className={`p-2 rounded-full ${colors.light} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Clock size={18} className={colors.secondary} />
                    </div>
                    <div>
                      <p className="text-gray-700">{strategy}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <CheckCircle size={16} className="mr-2 text-green-600" />
                  Pro Tip
                </h4>
                <p className="text-gray-600 text-sm">
                  Try implementing just one of these strategies this week. Start small with a 2-hour block that follows your natural energy pattern.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6">
          <Card className="overflow-hidden">
            <div className={`${colors.gradientBg} py-4 px-6`}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Zap size={20} className="mr-2" />
                Tools That Match Your Style
              </h3>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {results.tools.map((tool, index) => (
                  <div key={index} className="flex items-center p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 transform">
                    <div className={`p-2 rounded-full ${colors.light} mr-3`}>
                      <Star size={18} className={colors.secondary} />
                    </div>
                    <p className="font-medium">{tool}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <Bookmark size={16} className="mr-2 text-indigo-600" />
                  Why These Tools Work For You
                </h4>
                <p className="text-gray-600 text-sm">
                  These tools align with your natural workflow preferences, helping you maximize your productivity without fighting against your instincts.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="habits" className="mt-6">
          <Card className="overflow-hidden">
            <div className={`${colors.gradientBg} py-4 px-6`}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Brain size={20} className="mr-2" />
                Mini Habit Hacks
              </h3>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4 mt-2">
                {results.habits.map((habit, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className={`p-2 rounded-full ${colors.light} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Sparkles size={18} className={colors.secondary} />
                    </div>
                    <div>
                      <p className="text-gray-700">{habit}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <Clock size={16} className="mr-2 text-indigo-600" />
                  Habit Formation Tip
                </h4>
                <p className="text-gray-600 text-sm">
                  Research shows it takes about 66 days to form a new habit. Start with just one of these habits and practice it consistently for the next two months.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strengths" className="mt-6">
          <Card className="overflow-hidden">
            <div className={`${colors.gradientBg} py-4 px-6`}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Award size={20} className="mr-2" /> 
                Your Productivity Profile
              </h3>
            </div>
            <CardContent className="p-6">
              <h4 className="font-medium text-lg mb-4 flex items-center">
                <Trophy size={18} className={`mr-2 ${colors.secondary}`} /> 
                Your Strengths
              </h4>
              <div className="space-y-4 mb-8">
                {results.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className={`p-2 rounded-full ${colors.light} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Award size={18} className={colors.secondary} />
                    </div>
                    <div>
                      <p className="text-gray-700">{strength}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h4 className="font-medium text-lg mb-4 flex items-center mt-8">
                <AlertTriangle size={18} className="mr-2 text-amber-600" />
                Potential Challenges
              </h4>
              <div className="space-y-4">
                {results.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="p-2 rounded-full bg-amber-50 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <AlertTriangle size={18} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <Zap size={16} className="mr-2 text-indigo-600" />
                  Leveraging Your Profile
                </h4>
                <p className="text-gray-600 text-sm">
                  The key to peak productivity is to design your work around your strengths while creating systems to mitigate your challenges.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compatibility" className="mt-6">
          <Card className="overflow-hidden">
            <div className={`${colors.gradientBg} py-4 px-6`}>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Users size={20} className="mr-2" />
                Team Compatibility
              </h3>
            </div>
            <CardContent className="p-6">
              <div className="mb-8">
                <h4 className="font-medium text-lg mb-3 flex items-center">
                  <Users size={16} className="mr-2 text-green-600" />
                  Works well with:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.compatibility.works_well_with.map((type, index) => (
                    <div key={index} className="flex items-center p-4 rounded-lg bg-green-50 border border-green-100 hover:shadow-md transition-all hover:-translate-y-0.5 transform">
                      <div className="p-2 rounded-full bg-green-100 mr-3">
                        <Users size={18} className="text-green-600" />
                      </div>
                      <p className="font-medium text-green-800">{type}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-green-50/50 rounded-lg border border-green-100">
                  <p className="text-green-800 text-sm">
                    These productivity types complement your work style, creating synergistic partnerships where strengths are amplified.
                  </p>
                </div>
              </div>
              
              {results.compatibility.challenges_with.length > 0 && (
                <div>
                  <h4 className="font-medium text-lg mb-3 flex items-center">
                    <AlertTriangle size={16} className="mr-2 text-amber-600" />
                    May have challenges with:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.compatibility.challenges_with.map((type, index) => (
                      <div key={index} className="flex items-center p-4 rounded-lg bg-amber-50 border border-amber-100 hover:shadow-md transition-all hover:-translate-y-0.5 transform">
                        <div className="p-2 rounded-full bg-amber-100 mr-3">
                          <AlertTriangle size={18} className="text-amber-600" />
                        </div>
                        <p className="font-medium text-amber-800">{type}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                    <p className="text-amber-800 text-sm">
                      These relationships may require more intentional communication and workflow adjustments to collaborate effectively.
                    </p>
                  </div>
                </div>
              )}
              
              {results.compatibility.challenges_with.length === 0 && (
                <div className="flex items-center p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="p-2 rounded-full bg-blue-100 mr-3">
                    <Trophy size={18} className="text-blue-600" />
                  </div>
                  <p className="font-medium text-blue-800">
                    As a {results.type}, you work well with all productivity types!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
        <Button
          variant="outline"
          onClick={onRestart}
          className="w-full sm:w-auto border-indigo-300 text-indigo-700 hover:bg-indigo-50"
        >
          Retake Quiz
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button 
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all transform hover:-translate-y-0.5"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).then(() => {
                alert("Quiz link copied to clipboard!");
              });
            }}
          >
            <Share2 size={16} className="mr-2" />
            Share Quiz
          </Button>
          
          <Button 
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white transition-all transform hover:-translate-y-0.5"
            onClick={() => {
              alert("Your productivity profile has been saved! You can access it anytime in your account.");
            }}
          >
            <Download size={16} className="mr-2" />
            Save Results
          </Button>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-6">
        Your results are based on the latest research in chronobiology and productivity science
      </div>
    </div>
  );
};

export default ResultsSection;
