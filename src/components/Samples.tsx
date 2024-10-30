import { useRef } from 'react';
import VideoPlayer from '@components/VideoPlayer';

import { motion, useInView } from 'framer-motion';

const Samples = () => {
  const carSample = new URL('@assets/car-sample.mp4', import.meta.url).href;
  const promoSample = new URL('@assets/promo-sample.mp4', import.meta.url).href;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="w-full px-20 py-14"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 place-items-center md:items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl tracking-tighter text-center md:text-left font-regular">
              Our AI can accommodate any style!
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-center md:text-left">
              From pop to rock, from classical to hip-hop, our AI can accommodate any style of video
              you can imagine. In just a few clicks create your own music video free of charge!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VideoPlayer
              src={carSample}
              badgeText="Ambient for Vlogs"
              background={false}
            />
            <VideoPlayer
              src={promoSample}
              badgeText="Indie Pop for Promos"
              background={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Samples;
