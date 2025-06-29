import React, { useState, useEffect, useRef } from 'react';
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
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({}); // 🌟 NEW


  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Mastering Da Vinci Code',
      url: '/videos/podcast_1751124438.mp4',
      arxivLink: 'https://arxiv.org/abs/2506.12801',
      arxivTitle: 'Mastering Da Vinci Code: A Comparative Study of Transformer, LLM, and PPO-based Agents',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: "LLM Driven Swarm Agents",
      url: 'videos/AI_Gadget_kit.mp4',
      arxivLink: 'https://arxiv.org/abs/2407.17086',
      arxivTitle: 'AI-Gadget Kit: Integrating Swarm User Interfaces with LLM-driven Agents for Rich Tabletop Game Applications',
      createdAt: '2024-01-13'
    },
    {
      id: '3',
      title: "LLM's behavior toward Mystery Games",
      url: 'videos/c6eb783d897842efa7adb1acae8edd8e.mp4',
      arxivLink: 'https://arxiv.org/html/2312.00746v2',
      arxivTitle: 'Deciphering Digital Detectives: Understanding LLM Behaviors and Capabilities in Multi-Agent Mystery Games',
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      title: 'AI Agent and Game Theory',
      url: '/videos/podcast_1751126336.mp4',
      arxivLink: 'https://arxiv.org/pdf/2504.14325',
      arxivTitle: 'FAIRGAME: a Framework for AI Agents Bias Recognition using Game Theory',
      createdAt: '2024-01-14'
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

    useEffect(() => {
    const generateThumbnails = async () => {
      for (const video of mockVideos) {
        if (!thumbnails[video.id]) {
          const thumbnail = await extractFirstFrame(video.url);
          setThumbnails(prev => ({ ...prev, [video.id]: thumbnail }));
        }
      }
    };
    generateThumbnails();
  }, [videos]);

    const extractFirstFrame = (videoUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = 'anonymous'; // May be needed for cross-origin videos
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0;

      const canvas = document.createElement('canvas');

      video.addEventListener('loadeddata', () => {
        video.currentTime = 0.1; // Slight offset ensures frame is available
      });

      video.addEventListener('seeked', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } else {
          resolve('');
        }
      });
    });
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
            {/* Player Section */}
            <div className="lg:col-span-2">
              {selectedVideo && (
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                  <div
                    className="aspect-video bg-slate-800 flex items-center justify-center relative group cursor-pointer"
                    onClick={() => handleVideoClick(selectedVideo, videos.indexOf(selectedVideo))}
                  >
                    {/* Thumbnail display in main view */}
                    {thumbnails[selectedVideo.id] ? (
                      <img
                        src={thumbnails[selectedVideo.id]}
                        alt="Video thumbnail"
                        className="absolute inset-0 object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <p className="text-gray-400">Click to play in fullscreen</p>
                      </div>
                    )}
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
                    {thumbnails[video.id] ? (
                      <img
                        src={thumbnails[video.id]}
                        alt="Thumbnail"
                        className="absolute inset-0 object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </div>
                    )}
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

      {/* Fullscreen player component */}
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
