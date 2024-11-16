'use client'

import { useRef } from 'react';
import VideoPlayer from '@components/VideoPlayer';
import { motion, useInView } from 'framer-motion';

const Samples = () => {

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      aria-label="Sample Videos Section"
      itemScope 
      itemType="https://schema.org/VideoObject"
    >
      <meta itemProp="name" content="AI Music Video Samples" />
      <meta itemProp="description" content="Sample videos showing AI-generated music capabilities" />
      <meta itemProp="uploadDate" content="2024-01-01" />
      <meta itemProp="thumbnailUrl" content="/video-thumbnail.jpg" />
      
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="w-full px-20 py-40"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 px-14 place-items-center md:items-center md:grid-cols-2">
            <motion.div 
              variants={itemVariants} 
              className="flex gap-4 flex-col"
            >
              <h2 
                className="text-5xl md:text-7xl tracking-tighter text-center md:text-left font-regular"
                itemProp="headline"
              >
                Our AI can <strong>accommodate</strong> any <strong>style!</strong>
              </h2>
              <p 
                className="text-xl leading-relaxed tracking-tight text-foreground max-w-md text-center md:text-left"
                itemProp="description"
              >
                From pop to rock, from classical to hip-hop, our AI can accommodate any style of video
                you can imagine. Create your own music video free of charge in just a few clicks!
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div itemScope itemType="https://schema.org/VideoObject">
                <meta itemProp="name" content="Ambient Vlog Music Sample" />
                <meta itemProp="description" content="Sample video showing AI-generated ambient music for vlogs" />
                <VideoPlayer
                  src={'/ambient-sample.mp4'}
                  badgeText="Ambient for Vlogs"
                  background={false}
                />
              </div>
              
              <div itemScope itemType="https://schema.org/VideoObject">
                <meta itemProp="name" content="Indie Pop Promo Music Sample" />
                <meta itemProp="description" content="Sample video showing AI-generated indie pop music for promos" />
                <VideoPlayer
                  src={'/promo-sample.mp4'}
                  badgeText="Indie Pop for Promos"
                  background={false}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Samples;
