
import React from 'react';
import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/3 to-teal-500/3 rounded-full blur-3xl"></div>
      
      {/* Floating icons */}
      <div className="absolute top-32 right-1/4 animate-pulse">
        <Sparkles className="w-8 h-8 text-cyan-400/30" />
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-pulse delay-1000">
        <Zap className="w-6 h-6 text-teal-400/30" />
      </div>
      <div className="absolute top-1/2 right-12 animate-pulse delay-2000">
        <Brain className="w-10 h-10 text-cyan-400/30" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-300 bg-clip-text text-transparent mb-4">
            coffee.ideate
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
            See your ideas come to life... before you even have ideas.
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Transform
            <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent"> research </span>
            into engaging content
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Automated system that curates the latest academic papers and transforms them into 
            engaging, short-form video scripts. Daily research reels delivered to your feed.
          </p>
          <div className="text-6xl mb-8">📄&nbsp;➡️&nbsp;🎥</div>
          <p className="text-md text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Turn dense academic writing into snackable, high-quality video content. 
            Stay ahead of trends, discover fresh research ideas, and create science content faster than ever.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center space-y-8">
          <button
            onClick={() => navigate('/preferences')}
            className="group bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-cyan-500/20"
          >
            Get Started
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
