import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';

interface VideoPlayerProps {
  src: string;
  badgeText: string;
  background?: boolean;
}

const VideoPlayer = ({ src, badgeText, background = true }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div 
      className={`min-h-40 md:min-h-64 relative ${background && "bg-muted"} rounded-md overflow-hidden`}
    >
      <div className="absolute top-0 md:top-6 md:left-6 z-20">
        <Badge className="text-white text-center p-2 rounded-md">
          {badgeText}
        </Badge>
      </div>
      <video
        ref={videoRef}
        className="object-center w-full h-full z-10"
        src={src}
        muted={isMuted}
        loop
        autoPlay
      />
      <div>
        <Button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 bg-black text-white p-4 rounded-full"
        >
          {isMuted ? (
            <VolumeX className="size-6" />
          ) : (
            <Volume2 className="size-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;