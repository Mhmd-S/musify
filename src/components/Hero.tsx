'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import useResponsive from '@hooks/useResponsive';
import { Button } from '@components/ui/button';
import VideoPlayer from '@components/VideoPlayer';

const Hero = () => {

  const { screenSize, isMobile } = useResponsive();
  console.log(screenSize, isMobile);
  const homeVideo = new URL('@assets/home.mp4', import.meta.url).href;
  const home2Video = new URL('@assets/home2.mp4', import.meta.url).href;

  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(() => ['electrical', 'wonderful', 'beautiful', 'melodious'], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 gap-24 md:gap-8 px-10 py-36 items-center lg:py-30 lg:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex gap-32 md:gap-6 flex-col items-center md:items-start"
        variants={itemVariants}
      >
        <motion.div className="flex gap-16 md:gap-8 flex-col" variants={itemVariants}>
          <motion.h1
            className="text-5xl md:text-6xl max-w-2xl tracking-tighter font-regular text-center md:text-left md:mr-20"
            variants={itemVariants}
          >
            <motion.span className="text-spektr-cyan-50" variants={itemVariants}>
              Create music for your video that is
            </motion.span>
            <motion.span
              className="relative flex w-full overflow-hidden justify-center md:justify-start md:pb-4 md:pt-1"
              variants={itemVariants}
            >
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold"
                  initial={{ opacity: 0, y: '-100' }}
                  transition={{
                    type: 'spring',
                    stiffness: 50,
                  }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg text-center md:text-left leading-relaxed tracking-tight text-muted-foreground max-w-md"
            variants={itemVariants}
          >
            Transform your content by adding specially curated AI music that perfectly complements
            your video. Experience a unique audio backdrop that enhances the mood and captivates
            your audience.
          </motion.p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/lab">
            <Button size="lg" className="gap-4" variant="default">
              Musify your video!
              <Wand2 className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <VideoPlayer
          src={!isMobile ? homeVideo : home2Video}
          badgeText="Have a listen and see the magic!"  
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
