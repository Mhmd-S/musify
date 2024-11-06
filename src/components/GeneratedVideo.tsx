import { useState, useEffect, useRef } from 'react';

import Spinner from '@components/Spinner';
import { Button } from "@components/ui/button";
import { Slider } from "@components/ui/slider";

import { Play, Pause, RefreshCw, Clock, Volume2, Download } from "lucide-react";

type GeneratedVideoProps = {
  newVideo: string | null;
  loading: boolean;
};

const GeneratedVideo: React.FC<GeneratedVideoProps> = ({ newVideo, loading }) => {
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([50]);
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
      setLoadingMessage(funLoadingMessages[Math.floor(Math.random() * funLoadingMessages.length)]);
      interval = setInterval(() => {
        setLoadingMessage(
          funLoadingMessages[Math.floor(Math.random() * funLoadingMessages.length)]
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`relative min-h-60 w-full px-4 grid grid-col-1 place-items-center border rounded-md border-gray-900/25 ${
        newVideo ? 'border-solid bg-primary' : 'border-dashed bg-muted'
      }`}
    >
      {newVideo ? (
        <div className="w-full max-w-md flex flex-col items-center">
          <video
            ref={videoRef}
            className="w-48 aspect-square object-center object-fit rounded-3xl"
            src={newVideo}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          <div className="w-full space-y-2 border-white border-2">
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleRestart}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={newVideo} download="generated-video">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner />
          {loading && <p className="text-center text-primary animate-pulse">{loadingMessage}</p>}
        </div>
      ) : (
        <div className="grid grid-rows-2 grid-cols-1 gap-2 place-items-center text-gray-600 text-center">
          <span className="text-sm">
            Your <strong>new video </strong>
            will appear here
          </span>
        </div>
      )}
    </div>
  );
};

export default GeneratedVideo;