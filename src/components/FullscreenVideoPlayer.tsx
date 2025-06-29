import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowUp, ArrowDown, ExternalLink, Calendar } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  url: string;
  arxivLink: string;
  arxivTitle: string;
  createdAt: string;
}

interface FullscreenVideoPlayerProps {
  videos: Video[];
  currentIndex: number;
  onClose: () => void;
  onVideoChange: (index: number) => void;
}

const FullscreenVideoPlayer: React.FC<FullscreenVideoPlayerProps> = ({
  videos,
  currentIndex,
  onClose,
  onVideoChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Pause all videos except the current one
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === currentIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        onVideoChange(currentIndex - 1);
      }
      if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        onVideoChange(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length, onClose, onVideoChange]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: currentIndex * window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      const scrollTop = containerRef.current!.scrollTop;
      const newIndex = Math.round(scrollTop / window.innerHeight);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < videos.length) {
        onVideoChange(newIndex);
      }
    }, 100);
  };

  const navigateVideo = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex > 0) {
      onVideoChange(currentIndex - 1);
    } else if (direction === 'down' && currentIndex < videos.length - 1) {
      onVideoChange(currentIndex + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <button
          onClick={() => navigateVideo('up')}
          className="absolute top-1/2 left-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors transform -translate-y-1/2"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {currentIndex < videos.length - 1 && (
        <button
          onClick={() => navigateVideo('down')}
          className="absolute top-1/2 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors transform -translate-y-1/2"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      )}

      {/* Video container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
        onScroll={handleScroll}
        style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="h-screen w-full flex items-center justify-center snap-start relative"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.url}
              controls
              loop
              className="max-w-full max-h-full object-contain"
            />

            {/* Video info overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-lg">
              <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">
                {video.title}
              </h3>

              <div className="flex items-center text-sm text-gray-300 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-600">
                <h4 className="text-white font-semibold mb-1 flex items-center text-sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Source Research Paper
                </h4>
                <p className="text-gray-300 mb-2 text-sm">{video.arxivTitle}</p>
                <a
                  href={video.arxivLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                >
                  View on arXiv →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullscreenVideoPlayer;
