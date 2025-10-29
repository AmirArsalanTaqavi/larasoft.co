"use client";

import React, { useRef, useState, Suspense, useEffect, useMemo, useLayoutEffect } from 'react';
import { Canvas, useThree, useFrame, RootState } from "@react-three/fiber";
import { gsap } from "gsap"; // Main GSAP library
import { useGSAP } from "@gsap/react"; // GSAP React hook
import { useGLTF, Float, Environment, useAnimations, Instances,Instance, SpotLight} from '@react-three/drei';
import * as THREE from 'three';
// import Scene from './Scene'; // REMOVED: Merged files for preview

// Register the useGSAP hook plugin
// @ts-ignore: Ignore type error for external module
gsap.registerPlugin(useGSAP);

// --- Type Definitions ---
interface LarasoftIntroProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  children: React.ReactNode; // Accept children
}

// ==========================================================================
// MERGED FILE 1: Logo.tsx
// ==========================================================================
/**
 * This component loads and animates the Larasoft logo.
 */
const Logo: React.FC = () => {
  const logoGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  // @ts-ignore: Ignore type error for external module
  const { scene } = useGLTF('/models/larasoft-logo.gltf');
  const clonedScene = scene.clone();
  
  // Use the useGSAP hook for animations
  useGSAP(() => {
    if (logoGroupRef.current) {
      
      // --- 1. SET THE FINAL STATE ---
      const finalCameraZ = 150; // Your final camera Z
      // --- YOUR TWEAK ---
      const finalGroupPos = { x: 1, y: 2, z: 100 }; // Your final group position
      // --- YOUR TWEAK ---
      const finalGroupRot = { x: Math.PI / 1, y: Math.PI * 1, z: 3.2}; // Your final group rotation
      
      gsap.set(camera.position, { z: finalCameraZ });
      gsap.set(logoGroupRef.current.position, finalGroupPos);
      gsap.set(logoGroupRef.current.rotation, finalGroupRot);

      // --- 2. ANIMATE *FROM* THE STARTING STATE ---
      gsap.from(camera.position, {
        z: 3, // TWEAK 2: Camera Start Z position
        duration: 3,
        ease: 'expo.out',
      });
      
      gsap.from(logoGroupRef.current.position, {
        y: 0, // Start lower
        duration: 3,
        ease: 'expo.out',
      });
    }
  }, { scope: logoGroupRef }); // Scope the animation to this component
  

  return (
    // --- RE-ADDED <Float> ---
    // @ts-ignore: Ignore type error for external module
    <Float
      speed={1} // TWEAK 7: How fast it floats (Default: 1)
      // --- YOUR TWEAK ---
      rotationIntensity={0.3} // TWEAK 8: How much it rotates (Default: 1)
      floatIntensity={1} // TWEAK 9: How much it moves up/down (Default: 1)
    >
      {/* @ts-ignore: Ignore type error for external module */}
      <group ref={logoGroupRef}>
        {/* @ts-ignore: Ignore type error for external module */}
        <primitive 
          object={clonedScene}
          // --- YOUR TWEAK ---
          scale={0.1} // TWEAK 1: Your scale
          position={[0, 0, 0]} // TWEAK 0: PIVOT FIX
        />
      </group>
    </Float>
  );
};

// ==========================================================================
// NEW 3D BACKGROUND: 10 Instanced Sheets
// ==========================================================================

/**
 * This component creates 10 static, instanced glass sheets.
 */
const InstancedGlassSheets: React.FC = () => {
  // --- Create our "glassy" material in React ---
  const glassyMaterial = useMemo(() => {
    // --- YOUR TWEAKS ---
    return new THREE.MeshPhysicalMaterial({
      color: "#002924",     // Base color
      emissive: "#000000",  // --- FIXED: No glow ---
      emissiveIntensity: 0, // --- FIXED: No glow ---
      transmission: 0.9,
      roughness: 0.1,      // --- FIXED: Sharper reflection ---
      thickness: 5,       
      ior: 1.49,             
      transparent: true,
      opacity: 0.3,   
      envMapIntensity: 0, // --- YOUR TWEAK ---
    });
  }, []);

  // --- Create the "10 rows" data ---
  const instances = useMemo(() => {
    const data = [];
    const numRows = 1;
    const numCols =6; // --- YOUR TWEAK: 6 sheets ---
    const scale: [number, number, number] = [79, 600, 1]; // --- YOUR TWEAK: Scale ---
    const spacing = 99; // --- YOUR TWEAK ---
    const baseRotation: [number, number, number] = [0, 0, 2.5]; // --- YOUR TWEAK ---
    
    // --- FIXED: "Slight wave" ---
    const waveFrequency = 0.3;
    const waveAmplitude = 4;
    
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        
        // --- FIXED: Add Z-axis wave ---
        const xPos = (j - numCols / 2.2) * spacing;
        const zPos = Math.sin(j * waveFrequency) * waveAmplitude;
        
        data.push({
          position: [
            xPos,
            -10, // y: center them
            zPos  // z: all on the same plane
          ] as [number, number, number],
          
          rotation: baseRotation, // --- FIXED: No flutter ---
          
          scale: scale
        });
      }
    }
    return data;
  }, []);


  return (
    // --- YOUR TWEAK: Push group behind logo ---
    // @ts-ignore: Ignore type error for external module
    <group position={[0, 0, 1]}>
      {/* @ts-ignore: Ignore type error for external module */}
      <Instances material={glassyMaterial}>
        {/* @ts-ignore: Ignore type error for external module */}
        <planeGeometry args={[1, 1]} /> {/* Base shape is 1x1 */}
        
        {/* Map over the data to create the instances */}
        {instances.map((data, i) => (
          // @ts-ignore: Ignore type error for external module
          <Instance
            key={i}
            position={data.position}
            rotation={data.rotation}
            scale={data.scale}
          />
        ))}
      </Instances>
    </group>
  );
};

// ==========================================================================
// NEW COMPONENT: AnimatedSpotLight
// ==========================================================================
/**
 * This component is one of the "two lights" and animates itself.
 */
interface AnimatedSpotLightProps {
  position: [number, number, number];
  target: THREE.Object3D;
  color: string;
  intensity: number;
  distance: number;
  angle: number;
  penumbra: number;
}

const AnimatedSpotLight: React.FC<AnimatedSpotLightProps> = ({ 
  position, target, color, intensity, distance, angle, penumbra 
}) => {
  const lightRef = useRef<THREE.SpotLight>(null);
  // Store the base position so the animation is an offset
  const [basePosition] = useState(() => new THREE.Vector3(...position));

  // Animate the light's position
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime() * 1; // Adjustable speed
      
      // --- FIXED: Add X, Y, and Z animation ---
      // These numbers are "adjustable"
      const x_amp = 10; // How far it moves side-to-side
      const y_amp = 5; // How far it moves up-down
      const z_amp = 5;  // "very little z movement"
      
      const x_freq = 0.8; // How fast it moves on X
      const y_freq = 0.6; // How fast it moves on Y
      const z_freq = 1; // How fast it moves on Z
      
      lightRef.current.position.x = basePosition.x + Math.sin(t * x_freq) * x_amp;
      lightRef.current.position.y = basePosition.y + Math.cos(t * y_freq) * y_amp;
      lightRef.current.position.z = basePosition.z + Math.sin(t * z_freq) * z_amp;
    }
  });

  return (
    // @ts-ignore: Ignore type error for external module
    <SpotLight 
      ref={lightRef}
      target={target} // Point at the target object
      color={color}
      intensity={intensity}
      distance={distance}
      angle={angle}
      penumbra={penumbra}
      position={position} // Set initial position
    />
  );
};


// ==========================================================================
// MERGED FILE 2: Scene.tsx
// ==========================================================================
/**
 * This component contains the 3D scene.
 */
const Scene: React.FC = () => {
  // --- FIXED: Create a target for the lights ---
  const targetObject = useRef(new THREE.Object3D());

  return (
    <>
      {/* --- Render the target --- */}
      {/* @ts-ignore: Ignore type error for external module */}
      <primitive object={targetObject.current} position={[0, 0, 1]} />
    
      {/* --- LIGHTING (SHADING) --- */}
      {/* @ts-ignore: Ignore type error for external module */}
      <hemisphereLight groundColor="teal" intensity={1} />
      {/* @ts-ignore: Ignore type error for external module */}
      <directionalLight position={[10, 10, 1]} intensity={2} />
      
      {/* --- FIXED: RE-ADDED Environment --- */}
      {/* @ts-ignore: Ignore type error for external module */}
      <Environment preset="city" /> 
      
      {/* --- FIXED: Two new ANIMATED lights --- */}
      <AnimatedSpotLight
        position={[140, 160, 13]} // Top Right
        target={targetObject.current} // Aim at glass
        color="#00665e" // Original Teal
        intensity={2000000000}
        distance={200}  
        angle={Math.PI / 1} 
        penumbra={1} 
      />
      <AnimatedSpotLight
        position={[-250, -50, 10]} // Bottom Left
        target={targetObject.current} // Aim at glass
        color="#00665e" // Original Teal
        intensity={3000000000}
        distance={200}  
        angle={Math.PI / 2.5} 
        penumbra={1} 
      />
        
      {/* --- 3D OBJECTS --- */}
      <InstancedGlassSheets />
      <Logo />
    </>
  );
};


/**
 * Main component to export.
 */
const LarasoftIntro: React.FC<LarasoftIntroProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  children
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // This prevents hydration errors by only rendering Canvas on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animate the text fade-in using GSAP
  useGSAP(() => {
    if (textRef.current) {
      gsap.to(textRef.current, { 
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 2.5, // TWEAK 10: Delay text fade-in
        ease: 'power3.out',
      });
    }
  }, { dependencies: [isMounted] }); // Run once mounted

  return (
    <>
      {/* --- BACKGROUND STYLE --- */}
      <style>{`
        /* --- REMOVED all complex ::before, ::after, and @keyframe animations --- */
        
        .hero-background {
          position: relative; /* For stacking context */
          overflow: hidden; /* Contain patterns */
          
          /* --- BASE: Your darkest static color --- */
          background-color: #001a16;
        }
        
        /* * ======================================================
         * --- BACKGROUND FOR THE REST OF YOUR SITE ---
         * ======================================================
         */
        .content-background-pattern {
          position: relative;
          overflow: hidden;
          background-color: #001a16; /* Your darkest color */
          z-index: 1; /* Ensure it's part of the stacking context */
        }
        
        .content-background-pattern::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1; /* Place BEHIND the content */
          
          /* --- FIXED: Corrected path for preview --- */
          background-image: url('/images/abstract_lines_bg.svg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          
          opacity: 0.1; /* Static, low opacity */
          background-blend-mode: soft-light;
        }
      `}</style>
      
      {/* --- HERO SECTION (with 3D) --- */}
      <div 
        className="hero-background relative z-10 h-screen min-h-[700px] text-white overflow-hidden"
      >
        {/* --- DOT GRID REMOVED --- */}
        
        {isMounted && ( // Only render Canvas on client
          // @ts-ignore: Ignore type error for external module
          <Canvas
            className="absolute inset-0 z-10" // Sits on top of the background color
            camera={{ fov: 75 }} // Camera Field of View
          >
            {/* @ts-ignore: Ignore type error for external module */}
            <Suspense fallback={null}> 
              <Scene />
            </Suspense>
          </Canvas>
        )}

        <div
          ref={textRef}
          style={{ opacity: 0, transform: 'translateY(20px)' }} // Initial state for GSAP text fade-in
          className="relative z-20 flex flex-col items-center justify-center pointer-events-none p-4 text-center h-full"
        >
          <h1 className="text-5xl md:text-7xl leading-tight font-larasoft text-accent">
            {title}
          </h1>
          <p className="mt-4 text-xl text-text max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          {buttonText && buttonLink && (
            // PREVIEW-ONLY: Use <a> tag instead of <Link>
            <a
              href={buttonLink} 
              className="mt-8 inline-block bg-secondary text-background font-bold px-8 py-3 rounded-lg hover:bg-primary transition-colors shadow-lg pointer-events-auto"
            >
              {buttonText}
            </a> 
          )}
        </div>
      </div>
      
      {/* * Render the rest of your page.
       * FIXED: Removed the wrapper div.
       */
      }
      {children}
    </>
  );
}

export default LarasoftIntro;

