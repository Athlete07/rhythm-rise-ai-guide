
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Brain, Clock, LineChart, Zap, Users, Trophy } from "lucide-react";

interface IntroSectionProps {
  onStart: () => void;
}

const IntroSection = ({ onStart }: IntroSectionProps) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 tracking-tight">
          Discover Your Productivity Style
        </h1>
        <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
          Optimize your workday based on your unique cognitive and behavioral patterns
        </p>
      </header>

      <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            <p className="text-gray-700 text-lg">
              This science-backed assessment will help you understand:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">Your Cognitive Rhythm</h3>
                  <p className="text-gray-600">When your brain is naturally at its best</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">Ideal Time Blocking</h3>
                  <p className="text-gray-600">Customized schedule aligned with your energy</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                  <LineChart size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">Productivity Type</h3>
                  <p className="text-gray-600">Your unique approach to tasks and focus</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">Custom Recommendations</h3>
                  <p className="text-gray-600">Tools and habits that match your style</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">Strengths & Challenges</h3>
                  <p className="text-gray-600">Maximize strengths and overcome challenges</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">Team Compatibility</h3>
                  <p className="text-gray-600">How you work best with different types</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-center space-x-3">
              <BadgeCheck className="text-indigo-600 flex-shrink-0" />
              <p className="text-indigo-800">
                <span className="font-medium">20 questions • 5 minutes</span> to discover your unique productivity style
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Button 
          size="lg" 
          onClick={onStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Start Your Assessment
        </Button>
      </div>
    </div>
  );
};

export default IntroSection;
