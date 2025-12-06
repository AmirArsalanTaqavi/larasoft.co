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
    <div className='bg-background fixed inset-0 z-0'>
      {/* --- MOBILE BACKGROUND (The "Fake Shader") --- 
          This is hidden on Desktop (md:hidden).
          It uses CSS animations to move two glowing blobs around.
          Looks 80% like the shader, costs 1% battery.
      */}
      <div className='absolute inset-0 overflow-hidden blur-sm'>
        <div className='animate-blob bg-primary absolute top-[-20%] left-[-20%] h-[80%] w-[80%] rounded-full opacity-40 blur-[80px]' />
        <div className='animate-blob animation-delay-2000 bg-secondary absolute top-[20%] right-[-20%] h-[80%] w-[80%] rounded-full opacity-50 blur-[80px]' />
        <div className='animate-blob animation-delay-4000 bg-accent absolute bottom-[-20%] left-[20%] h-[80%] w-[80%] rounded-full opacity-20 blur-[80px]' />
      </div>

      {/* --- DESKTOP SHADER --- 
          Hidden on Mobile (hidden md:block).
      */}
      <div
        ref={shaderContainerRef}
        className={`absolute inset-0 hidden transition-opacity duration-700 md:block ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ contain: 'strict' }}
      >
        <Shader className='h-dvh w-dvw'>
          <Swirl
            // [Safe] Colors: No performance impact.
            colorA='#00665e'
            colorB='#002924'
            // [Safe] Speed: How fast it swirls.
            // 0.5 = Slow/Classy, 2.0 = Stormy. No FPS cost.
            speed={0.8}
            // [High Cost] Detail: The sharpness of the noise.
            // 0.5 = Cloudy/Soft (Fastest), 2.0 = Crunchy/Sharp (Slowest).
            // Try 1.0 for a balance.
            detail={3.0}
            // [Safe] Blend: How much the swirl mixes with the background.
            blend={40}
            // [High Cost] Grid Sizes (X/Y): How many "cells" the screen is divided into.
            // Higher numbers = More complex movement, but MUCH heavier on CPU.
            // Keep between 20-50 for good performance.
            coarseX={30}
            coarseY={30}
            mediumX={30}
            mediumY={30}
            fineX={50}
            fineY={25}
            // [Medium Cost] Dithering: Removes color banding (stripes).
            // 0 = Banding visible, 20 = Smoother.
            dithering={10}
          />
          <ChromaFlow
            // [Safe] Colors
            baseColor='#7b2a41'
            upColor='#d5859c'
            downColor='#1f1f1f'
            leftColor='#cedc00'
            rightColor='#d6fffa'
            // [Safe] Intensity: How vivid the colors are.
            intensity={0.9}
            // [Medium Cost] Radius: The size of the fluid blobs.
            // Larger radius = slightly more calculation for overlap.
            radius={1.3}
            // [Safe] Momentum: How "heavy" the fluid feels.
            momentum={25}
            maskType='alpha'
            opacity={0.9}
          />
        </Shader>
      </div>

      {/* Texture Overlay (Kept from original) */}
      <div className='bg-background/5 pointer-events-none absolute inset-0' />
    </div>
  );
}
