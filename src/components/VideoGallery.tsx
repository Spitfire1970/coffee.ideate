
import React, { useState, useEffect } from 'react';
import { RefreshCw, ExternalLink, Calendar, User, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  arxivLink: string;
  arxivTitle: string;
  createdAt: string;
  author: string;
  duration: string;
}

const VideoGallery = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Mock data - replace with actual API call
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Revolutionary AI Breakthrough in Quantum Computing',
      url: '/path/to/video1.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop',
      arxivLink: 'https://arxiv.org/abs/2301.12345',
      arxivTitle: 'Quantum Advantage in Machine Learning Algorithms',
      createdAt: '2024-01-15',
      author: 'Dr. Sarah Chen',
      duration: '3:45'
    },
    {
      id: '2',
      title: 'Latest Advances in Neural Network Architecture',
      url: '/path/to/video2.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop',
      arxivLink: 'https://arxiv.org/abs/2301.67890',
      arxivTitle: 'Transformer Models for Scientific Discovery',
      createdAt: '2024-01-14',
      author: 'Prof. Michael Rodriguez',
      duration: '4:12'
    },
    {
      id: '3',
      title: 'Breakthrough in Sustainable Energy Research',
      url: '/path/to/video3.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop',
      arxivLink: 'https://arxiv.org/abs/2301.11111',
      arxivTitle: 'Novel Photovoltaic Materials for Enhanced Efficiency',
      createdAt: '2024-01-13',
      author: 'Dr. Emily Zhang',
      duration: '5:30'
    }
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      // const response = await axios.get('/api/videos');
      // setVideos(response.data);
      
      // Using mock data for now
      setTimeout(() => {
        setVideos(mockVideos);
        setSelectedVideo(mockVideos[0]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos(mockVideos);
      setSelectedVideo(mockVideos[0]);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/preferences')}
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Generated Videos
              </h1>
            </div>
            <button
              onClick={fetchVideos}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              {selectedVideo && (
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center">
                    {/* Placeholder for video player */}
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <div className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-white border-t-transparent border-b-transparent ml-1"></div>
                      </div>
                      <p className="text-gray-400">Video Player Placeholder</p>
                      <p className="text-sm text-gray-500 mt-1">Duration: {selectedVideo.duration}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {selectedVideo.title}
                    </h2>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{selectedVideo.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(selectedVideo.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                      <h3 className="text-white font-semibold mb-2 flex items-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Source Research Paper
                      </h3>
                      <p className="text-gray-300 mb-2">{selectedVideo.arxivTitle}</p>
                      <a
                        href={selectedVideo.arxivLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm underline"
                      >
                        View on arXiv →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video List */}
            <div className="space-y-4 max-h-screen overflow-y-auto">
              <h3 className="text-xl font-bold text-white mb-4">Recent Videos</h3>
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`bg-slate-900/50 backdrop-blur-sm border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedVideo?.id === video.id
                      ? 'border-purple-400 shadow-purple-400/20'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="aspect-video bg-slate-800 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-medium text-sm mb-2 line-clamp-2">
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{video.duration}</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGallery;
