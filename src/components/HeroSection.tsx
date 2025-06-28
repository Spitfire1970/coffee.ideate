
import React from 'react';
import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      
      {/* Floating icons */}
      <div className="absolute top-32 right-1/4 animate-pulse">
        <Sparkles className="w-8 h-8 text-purple-400/50" />
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-pulse delay-1000">
        <Zap className="w-6 h-6 text-blue-400/50" />
      </div>
      <div className="absolute top-1/2 right-12 animate-pulse delay-2000">
        <Brain className="w-10 h-10 text-indigo-400/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            ideate.creator
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            see your ideas come to life... before you even have ideas
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Automate Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Creative </span>
            Process
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Transform cutting-edge research papers into engaging video content automatically. 
            Test your ideas, discover what resonates, and scale your content creation with AI-powered insights.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center space-y-8">
          <button
            onClick={() => navigate('/preferences')}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
          >
            Get Started
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="animate-bounce mt-8">
            <ArrowRight className="w-8 h-8 text-purple-400 rotate-90" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
