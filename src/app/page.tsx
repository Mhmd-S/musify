import { useState, useEffect } from 'react';
import { Wand2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@components/ui/button';

import Hero from '@components/Hero';
import Features from '@components/Features';
import Samples from '@components/Samples';
import SuspensePage from '@components/SuspensePage';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);

    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video');

    let totalElements = images.length + videos.length;
    let loadedElements = 0;

    const checkLoaded = () => {
      loadedElements += 1;
      if (loadedElements === totalElements) {
        handleLoad();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkLoaded();
      } else {
        img.addEventListener('load', checkLoaded);
      }
    });

    videos.forEach((video) => {
      if (video.readyState >= 3) {
        checkLoaded();
      } else {
        video.addEventListener('loadeddata', checkLoaded);
      }
    });

    return () => {
      images.forEach((img) => img.removeEventListener('load', checkLoaded));
      videos.forEach((video) => video.removeEventListener('loadeddata', checkLoaded));
    };
  }, []);

  if (!isLoaded) {
    return <SuspensePage />;
  }

  return (
    <div className="w-full">
      <Hero />
      <Samples />
      <Features />
      <div className="w-full pt-20 pb-40 md:py-40 flex flex-col items-center gap-12">
        <h3 className="text-2xl md:text-5xl text-center font-regular">
          What are you waiting for? <br /> Get started now!
        </h3>
        <Link href="/lab">
          <Button size="lg" className="gap-4" variant="default">
            Get Started!
            <Wand2 className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
