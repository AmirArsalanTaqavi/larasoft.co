'use client';

import { Shader, ChromaFlow, Swirl } from 'shaders/react';
import { useRef, useEffect, useState } from 'react';

export default function background() {
  const [isLoaded, setIsLoaded] = useState(false);
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector('canvas');
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true);
          return true;
        }
      }
      return false;
    };

    if (checkShaderReady()) return;

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId);
      }
    }, 100);

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={shaderContainerRef}
      className={`fixed inset-0 z-0 transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ contain: 'strict' }}
    >
      <Shader className='h-dvh w-dvw'>
        <Swirl
          colorA='#00665e'
          colorB='#002924'
          speed={1}
          detail={1.5}
          blend={20}
          coarseX={40}
          coarseY={40}
          mediumX={40}
          mediumY={40}
          fineX={100}
          fineY={50}
          dithering={10}
        />
        <ChromaFlow
          baseColor='#7b2a41'
          upColor='#d5859c'
          downColor='#1f1f1f'
          leftColor='#cedc00'
          rightColor='#d6fffa'
          intensity={0.8}
          radius={1.6}
          momentum={25}
          maskType='alpha'
          opacity={0.9}
        />
      </Shader>
      <div className='bg-background/20 absolute inset-0' />
    </div>
  );
}
