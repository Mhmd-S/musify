import { useState, useEffect, useRef } from 'react';

import Spinner from '@components/Spinner';
import { Button } from '@components/ui/button';
import { Slider } from '@components/ui/slider';

import { Play, Pause, RefreshCw, Clock, Volume2, Download } from 'lucide-react';

type GeneratedVideoProps = {
  newVideo: string | null;
  loading?: boolean;
};

const GeneratedVideo: React.FC<GeneratedVideoProps> = ({
  newVideo,
  loading,
}) => {
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([50]);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const funLoadingMessages = [
    'Composing a symphony just for you...',
    'Tuning our AI instruments...',
    'Channeling the spirit of Mozart...',
    'Mixing beats and pixels...',
    'Teaching robots to sing...',
    'Harmonizing ones and zeros...',
    'Conducting a digital orchestra...',
    'Syncing rhythms with your video...',
    'Crafting melodies from thin air...',
    'Turning your video into a music video...',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingMessage(
        funLoadingMessages[
          Math.floor(Math.random() * funLoadingMessages.length)
        ]
      );
      interval = setInterval(() => {
        setLoadingMessage(
          funLoadingMessages[
            Math.floor(Math.random() * funLoadingMessages.length)
          ]
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100;
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      className={`h-60 w-full rounded-lg ${
        newVideo ? 'bg-primary/5' : 'bg-muted border-2 border-dashed'
      }`}
    >
      {newVideo ? (
        <div className="relative w-full h-full group">
          {/* Video */}
          <div className="w-full h-full bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              src={newVideo}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            />
          </div>

          {/* Controls Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 -translate-y-full px-4">
              <Slider
                className="h-1 cursor-pointer"
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={handleSeek}
              />
            </div>

            {/* Controls Container */}
            <div className="flex items-center gap-4 text-white">
              {/* Left Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/20"
                  onClick={handleRestart}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                
                {/* Time Display */}
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3 ml-auto">
                <Volume2 className="h-4 w-4" />
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <Spinner />
          <p className="text-center text-primary animate-pulse">
            {loadingMessage}
          </p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
          <span className="text-sm">
            Your <strong>new video</strong> will appear here
          </span>
        </div>
      )}
    </div>
  );
};

export default GeneratedVideo;