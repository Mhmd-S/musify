import { useState, useEffect } from 'react';
import Spinner from './Spinner';

type GeneratedVideoProps = {
  newVideo: string | null;
  loading: boolean;
};

const GeneratedVideo: React.FC<GeneratedVideoProps> = ({ newVideo, loading }) => {
  const [loadingMessage, setLoadingMessage] = useState<string>('');

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
        <>
          <video
            className="w-48 aspect-square object-center object-fit rounded-3xl"
            controls
            src={newVideo}
          />
        </>
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
