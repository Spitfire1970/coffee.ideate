
import React, { useState } from 'react';
import { Plus, X, ArrowRight, Sparkles, Settings } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Preferences {
  prompt: string;
  tags: string[];
  videoCount: number;
  frequency: number;
}

const PreferencesForm = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Preferences>({
    prompt: '',
    tags: [],
    videoCount: 5,
    frequency: 7
  });
  
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addTag = () => {
    if (newTag.trim() && !preferences.tags.includes(newTag.trim())) {
      setPreferences(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPreferences(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Replace with your actual backend endpoint
      await axios.post('/api/preferences', preferences);
      console.log('Preferences saved:', preferences);
      // Could show a success message here
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Navigation arrow to videos */}
      <button
        onClick={() => navigate('/videos')}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110"
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </button>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Settings className="w-12 h-12 text-purple-400 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Preferences
              </h1>
            </div>
            <p className="text-lg text-gray-300">
              Customize your content generation settings
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
            {/* Content Prompt */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                Content Prompt
              </label>
              <textarea
                value={preferences.prompt}
                onChange={(e) => setPreferences(prev => ({ ...prev, prompt: e.target.value }))}
                placeholder="Describe the type of content you want to generate... (e.g., 'Latest breakthroughs in AI and machine learning research')"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all h-32 resize-none"
                required
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-3">
                Research Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {preferences.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add research tags (e.g., 'machine learning', 'quantum computing')"
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Count */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-3">
                Videos per Generation: {preferences.videoCount}
              </label>
              <input
                type="range"
                min="3"
                max="15"
                value={preferences.videoCount}
                onChange={(e) => setPreferences(prev => ({ ...prev, videoCount: parseInt(e.target.value) }))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>3 videos</span>
                <span>15 videos</span>
              </div>
            </div>

            {/* Frequency */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-3">
                Generation Frequency: Every {preferences.frequency} days
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={preferences.frequency}
                onChange={(e) => setPreferences(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>Daily</span>
                <span>Monthly</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;
