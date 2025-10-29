/* * ==========================================================================
 * This is your new Logo component.
 * For your *actual* Next.js project, you MUST use your local
 * NPM package imports (e.g., import { useGLTF } from "@react-three/drei";)
 * ==========================================================================
 */

import React, { useRef } from 'react';
// @ts-ignore: Ignore type error for external module
import { useThree } from "@react-three/fiber";
// @ts-ignore: Ignore type error for external module
import { gsap } from "gsap"; // Main GSAP library
// @ts-ignore: Ignore type error for external module
import { useGSAP } from "@gsap/react";
// @ts-ignore: Ignore type error for external module
import { useGLTF,Float } from "@react-three/drei";
import * as THREE from 'three';

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
      const finalGroupPos = { x: 1, y: 3, z: 1 }; // Your final group position
      const finalGroupRot = { x: Math.PI / 1, y: Math.PI * 1, z: -0.5}; // Your final group rotation
      
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
    // PIVOT FIX: Group holds the animation state (position, rotation)
    // @ts-ignore: Ignore type error for external module
    <Float
      speed={1} // TWEAK 7: How fast it floats (Default: 1)
      rotationIntensity={0.5} // TWEAK 8: How much it rotates (Default: 1)
      floatIntensity={1} // TWEAK 9: How much it moves up/down (Default: 1)
    >
      {/* @ts-ignore: Ignore type error for external module */}
      <group ref={logoGroupRef}>
        {/* @ts-ignore: Ignore type error for external module */}
        <primitive 
          object={clonedScene}
          scale={0.3} // TWEAK 1: Your scale
          position={[0, 0, 0]} // TWEAK 0: PIVOT FIX
        />
      </group>
    </Float>
  );
};

export default Logo;
