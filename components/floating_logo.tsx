'use client';

import type React from 'react';
import {
  useRef,
  useState,
  Suspense,
  useEffect,
  useLayoutEffect,
  memo,
} from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Float, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface LogoProps {
  onReady?: () => void;
  start?: boolean;
  modelPath?: string;
}

const Logo: React.FC<LogoProps> = ({
  onReady,
  start = false,
  modelPath = '/models/logo.gltf',
}) => {
  const logoGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const gltf = useGLTF(modelPath);
  const color = '#cedc00';

  let scene: THREE.Group | undefined;
  if (gltf) {
    scene = gltf.scene.clone();
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.color = new THREE.Color(color);
              mat.roughness = 0.3;
              mat.metalness = 0.1;
            }
          });
        } else {
          const mat = mesh.material;
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.color = new THREE.Color(color);
            mat.roughness = 0.3;
            mat.metalness = 0.1;
          }
        }
      }
    });
  } else {
    console.warn('Model not found, using fallback geometry');
  }

  useLayoutEffect(() => {
    if (logoGroupRef.current) {
      if (onReady) onReady();

      const finalCameraZ = 130;
      const finalGroupRot = { x: Math.PI / 1, y: Math.PI * 0.95, z: 3.2 };

      gsap.set(camera.position, { z: finalCameraZ });
      gsap.set(logoGroupRef.current.rotation, finalGroupRot);
      gsap.set(logoGroupRef.current.position, { x: 0, y: 0, z: 0 });
      gsap.set(logoGroupRef.current.scale, { x: 0, y: 0, z: 0 });
      logoGroupRef.current.visible = false;
    }
  }, [camera, onReady]);

  useEffect(() => {
    if (!start || !logoGroupRef.current) return;
    const g = logoGroupRef.current;
    g.visible = true;
    const tl = gsap.timeline();

    tl.to(g.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      ease: 'elastic.out(1, 0.5)',
    });
    tl.from(
      g.rotation,
      { y: g.rotation.y + Math.PI * 2, duration: 2.5, ease: 'expo.out' },
      0
    );

    return () => {
      tl.kill();
    };
  }, [start, camera]);

  return (
    <Float speed={0.8} rotationIntensity={1} floatIntensity={0.4}>
      <group ref={logoGroupRef} renderOrder={2} position={[0, 0, 0]}>
        {scene ? (
          <primitive object={scene} scale={0.1} position={[0, 0.1, 0]} />
        ) : (
          <mesh scale={20}>
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <meshStandardMaterial
              color='#7b2a41'
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

const Scene: React.FC<{
  onReady?: () => void;
  logoStart?: boolean;
  modelPath?: string;
  envPreset?: string;
}> = ({ onReady, logoStart = false, modelPath, envPreset = 'city' }) => {
  return (
    <>
      <Environment files='/field.hdr' />
      <ambientLight intensity={0.2} />
      <Logo onReady={onReady} start={logoStart} modelPath={modelPath} />
    </>
  );
};

interface FloatingLogoProps {
  className?: string;
  modelPath?: string;
  envPreset?: string;
}

const FloatingLogo: React.FC<FloatingLogoProps> = memo(
  ({ className, modelPath, envPreset }) => {
    const [sceneReady, setSceneReady] = useState(false);
    const [logoStart, setLogoStart] = useState(false);
    const hasStartedRef = useRef(false);

    useEffect(() => {
      if (!sceneReady || hasStartedRef.current) return;

      const timer = setTimeout(() => {
        setLogoStart(true);
        hasStartedRef.current = true;
      }, 100);

      return () => clearTimeout(timer);
    }, [sceneReady]);

    return (
      <div
        className={cn(
          'pointer-events-none absolute top-0 left-0 z-0 h-full w-full transition-opacity duration-700 ease-out',
          sceneReady ? 'opacity-100' : 'opacity-0',
          className
        )}
        key='floating-logo-canvas'
      >
        <Canvas
          style={{ width: '100%', height: '100%', display: 'block' }}
          camera={{ fov: 0.4, position: [0, 0, 0] }}
          // PERFORMANCE OPTIMIZATION 1: Cap Pixel Ratio to 1.5
          // 1.5 is a sweet spot: looks sharp on retina, but saves 40% pixels vs 2.0
          dpr={[1, 1.2]}
          gl={{
            // VISUAL FIX: Enable Antialias to remove "stairs" (jagged edges)
            antialias: true,
            alpha: true,
            // PERFORMANCE OPTIMIZATION 3: Don't keep buffer unless needed
            preserveDrawingBuffer: false,
            powerPreference: 'default',
            // PERFORMANCE OPTIMIZATION 4: Disable stencil buffer
            stencil: false,
            depth: true,
          }}
        >
          <Suspense fallback={null}>
            <Scene
              onReady={() => setSceneReady(true)}
              logoStart={logoStart}
              modelPath={modelPath}
              envPreset={envPreset}
            />
          </Suspense>
        </Canvas>
      </div>
    );
  }
);

FloatingLogo.displayName = 'FloatingLogo';

export default FloatingLogo;
