import React from 'react';
// @ts-ignore: Ignore type error for external module
import { Environment } from "@react-three/drei";
import Logo from './Logo';

/**
 * This component contains the 3D scene.
 */
const Scene: React.FC = () => {
  return (
    <>
      {/* --- LIGHTING --- */}
      {/* @ts-ignore: Ignore type error for external module */}
      <hemisphereLight groundColor="black" intensity={1} />
      {/* @ts-ignore: Ignore type error for external module */}
      <directionalLight position={[10, 10, 5]} intensity={2} />
      {/* @ts-ignore: Ignore type error for external module */}
      <Environment preset="city" /> 
        
      {/* --- 3D OBJECTS --- */}
      {/* @ts-ignore: Ignore type error for external module */}
      <Logo />
      {/* --- REMOVED AnimatedLines --- */}
    </>
  );
};

export default Scene;
