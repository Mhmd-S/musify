import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Play, Pause, RefreshCw, Clock, Volume2 } from "lucide-react";

type GeneratedVideoProps = {
  newVideo: string | null;
  loading: boolean;
};

const GeneratedVideo: React.FC<GeneratedVideoProps> = ({ newVideo, loading }) => {
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div
      className={`relative min-h-60 w-full md:w-full px-4 grid grid-col-1 place-items-center border rounded-md border-gray-900/25 ${
        newVideo ? 'border-solid bg-primary' : 'border-dashed bg-muted'
      }`}
    >
      {newVideo ? (
        <div className="space-y-4 w-full max-w-md">
          <video
            className="w-48 aspect-square object-center object-fit rounded-3xl"
            controls
            src={newVideo}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>00:00 / 03:30</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                defaultValue={[50]}
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
