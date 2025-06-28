
import React, { useState, useEffect } from 'react';
import { RefreshCw, ExternalLink, Calendar, ArrowLeft, Play } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FullscreenVideoPlayer from './FullscreenVideoPlayer';

interface Video {
  id: string;
  title: string;
  url: string;
  arxivLink: string;
  arxivTitle: string;
  createdAt: string;
}

const VideoGallery = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  // Mock data without author, duration, thumbnail
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Revolutionary AI Breakthrough in Quantum Computing',
      url: '/path/to/video1.mp4',
      arxivLink: 'https://arxiv.org/abs/2301.12345',
      arxivTitle: 'Quantum Advantage in Machine Learning Algorithms',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Latest Advances in Neural Network Architecture',
      url: '/path/to/video2.mp4',
      arxivLink: 'https://arxiv.org/abs/2301.67890',
      arxivTitle: 'Transformer Models for Scientific Discovery',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Breakthrough in Sustainable Energy Research',
      url: '/path/to/video3.mp4',
      arxivLink: 'https://arxiv.org/abs/2301.11111',
      arxivTitle: 'Novel Photovoltaic Materials for Enhanced Efficiency',
      createdAt: '2024-01-13'
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

  const handleVideoClick = (video: Video, index: number) => {
    setSelectedVideo(video);
    setFullscreenIndex(index);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleVideoChange = (index: number) => {
    setFullscreenIndex(index);
    setSelectedVideo(videos[index]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Generated Videos
              </h1>
            </div>
            <button
              onClick={fetchVideos}
              disabled={isLoading}
              className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 disabled:cursor-not-allowed"
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              {selectedVideo && (
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center relative group cursor-pointer"
                       onClick={() => handleVideoClick(selectedVideo, videos.indexOf(selectedVideo))}>
                    {/* Video placeholder with play button */}
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <p className="text-gray-400">Click to play in fullscreen</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {selectedVideo.title}
                    </h2>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
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
                        className="text-cyan-400 hover:text-cyan-300 text-sm underline"
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
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`bg-slate-900/50 backdrop-blur-sm border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
                    selectedVideo?.id === video.id
                      ? 'border-cyan-400 shadow-cyan-400/20'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="aspect-video bg-slate-800 overflow-hidden flex items-center justify-center relative">
                    {/* Video thumbnail placeholder */}
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoClick(video, index);
                      }}
                      className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-medium text-sm mb-2 line-clamp-2">
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Video Player */}
      {isFullscreen && (
        <FullscreenVideoPlayer
          videos={videos}
          currentIndex={fullscreenIndex}
          onClose={handleCloseFullscreen}
          onVideoChange={handleVideoChange}
        />
      )}
    </div>
  );
};

export default VideoGallery;
