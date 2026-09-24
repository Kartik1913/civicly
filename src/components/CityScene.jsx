import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, AlertTriangle, Droplets, Trash2 } from 'lucide-react';

// Camera Scroll Animation Controller
function ScrollCameraController() {
  const targetCamPos = useRef(new THREE.Vector3(22, 22, 22));
  const targetLookAt = useRef(new THREE.Vector3(0, 1, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0));

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 1200;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      if (progress < 0.25) {
        // Phase 1: High Isometric View
        const t = progress / 0.25;
        targetCamPos.current.set(
          THREE.MathUtils.lerp(24, 18, t),
          THREE.MathUtils.lerp(24, 16, t),
          THREE.MathUtils.lerp(24, 18, t)
        );
        targetLookAt.current.set(0, 1, 0);
      } else if (progress < 0.55) {
        // Phase 2: Approach Street & Focus Broken Streetlight
        const t = (progress - 0.25) / 0.3;
        targetCamPos.current.set(
          THREE.MathUtils.lerp(18, 9, t),
          THREE.MathUtils.lerp(16, 7, t),
          THREE.MathUtils.lerp(18, 9, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(0, 3, t),
          THREE.MathUtils.lerp(1, 2.5, t),
          THREE.MathUtils.lerp(0, -1, t)
        );
      } else if (progress < 0.8) {
        // Phase 3: Highlight Issue Marker Close-up
        const t = (progress - 0.55) / 0.25;
        targetCamPos.current.set(
          THREE.MathUtils.lerp(9, 12, t),
          THREE.MathUtils.lerp(7, 10, t),
          THREE.MathUtils.lerp(9, 14, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(3, 1, t),
          THREE.MathUtils.lerp(2.5, 1.5, t),
          THREE.MathUtils.lerp(-1, 0, t)
        );
      } else {
        // Phase 4: Smooth Pullback to Full City Overview
        const t = (progress - 0.8) / 0.2;
        targetCamPos.current.set(
          THREE.MathUtils.lerp(12, 26, t),
          THREE.MathUtils.lerp(10, 26, t),
          THREE.MathUtils.lerp(14, 26, t)
        );
        targetLookAt.current.set(0, 1, 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    state.camera.position.lerp(targetCamPos.current, delta * 3);
    currentLookAt.current.lerp(targetLookAt.current, delta * 3);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

// Low-poly Car component moving along road
function AnimatedCar({ startPos, axis, speed, color }) {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    if (axis === 'x') {
      ref.current.position.x += speed * delta;
      if (ref.current.position.x > 18) ref.current.position.x = -18;
    } else {
      ref.current.position.z += speed * delta;
      if (ref.current.position.z > 18) ref.current.position.z = -18;
    }
  });

  return (
    <mesh ref={ref} position={startPos}>
      <boxGeometry args={[axis === 'x' ? 0.9 : 0.45, 0.3, axis === 'x' ? 0.45 : 0.9]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
}

// Procedural City Geometry Group
function CityModel() {
  const buildings = useMemo(() => {
    const list = [];
    const gridSize = 6;
    const spacing = 3.5;

    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        if (Math.abs(x) === 0 || Math.abs(z) === 0 || Math.abs(x) === 3 || Math.abs(z) === 3) continue;

        const seed = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
        const height = 1.2 + (Math.abs(seed) % 6);
        const colorVariation = Math.floor(Math.abs(seed) % 3);
        const baseColor = colorVariation === 0 ? '#121218' : colorVariation === 1 ? '#181822' : '#1d1d28';

        list.push({
          key: `${x}-${z}`,
          pos: [x * spacing, height / 2, z * spacing],
          args: [2.2, height, 2.2],
          color: baseColor
        });
      }
    }
    return list;
  }, []);

  const trees = useMemo(() => {
    const list = [];
    const coords = [
      [-5.5, 5.5], [-5.5, -5.5], [5.5, 5.5], [5.5, -5.5],
      [-12, 2], [12, -2], [-2, 12], [2, -12]
    ];
    coords.forEach(([x, z], i) => {
      list.push({ key: `tree-${i}`, pos: [x, 0.4, z] });
    });
    return list;
  }, []);

  return (
    <group>
      {/* Ground Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[44, 0.2, 44]} />
        <meshStandardMaterial color="#09090d" roughness={0.9} />
      </mesh>

      {/* Main Emissive Road Lines */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[44, 1.2]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[44, 1.2]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
      </mesh>

      {/* Secondary Grid Roads */}
      <mesh position={[10.5, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8, 44]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-10.5, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8, 44]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
      </mesh>

      {/* Buildings */}
      {buildings.map((b) => (
        <mesh key={b.key} position={b.pos}>
          <boxGeometry args={b.args} />
          <meshStandardMaterial color={b.color} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* Trees */}
      {trees.map((t) => (
        <group key={t.key} position={t.pos}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.6, 6]} />
            <meshStandardMaterial color="#332211" />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.45, 0.9, 6]} />
            <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Streetlights */}
      {[
        [2, 0, -1], [-2, 0, 1], [10.5, 0, 3], [-10.5, 0, -3]
      ].map(([x, y, z], i) => (
        <group key={`light-${i}`} position={[x, y, z]}>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.5, 6]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
          </mesh>
        </group>
      ))}

      {/* Animated Cars */}
      <AnimatedCar startPos={[-12, 0.25, 0.3]} axis="x" speed={4} color="#38bdf8" />
      <AnimatedCar startPos={[8, 0.25, -0.3]} axis="x" speed={-3.5} color="#f59e0b" />
      <AnimatedCar startPos={[0.3, 0.25, -14]} axis="z" speed={4.5} color="#ef4444" />
      <AnimatedCar startPos={[-0.3, 0.25, 10]} axis="z" speed={-3} color="#10b981" />
    </group>
  );
}

// Floating Holographic Issue Markers
function IssueMarker({ position, color, label, icon: Icon, isPrimary }) {
  return (
    <group position={position}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={1.2} 
            transparent
            opacity={0.9}
          />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
        </mesh>

        <Html
          position={[0, 0.8, 0]}
          center
          distanceFactor={18}
        >
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-110 pointer-events-auto ${
            isPrimary ? 'bg-black/90 ring-2 ring-cyan-400/50' : 'bg-black/80'
          }`} style={{ borderColor: color }}>
            <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }} />
            <Icon className="w-3.5 h-3.5" style={{ color: color }} />
            <span className="text-[11px] font-bold text-white tracking-wide whitespace-nowrap">
              {label}
            </span>
          </div>
        </Html>
      </Float>

      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.6, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function CityScene() {
  return (
    <div className="relative w-full h-[480px] md:h-[580px] rounded-3xl overflow-hidden border border-white/10 bg-[#07070a] shadow-[0_30px_100px_rgba(0,0,0,0.8)] select-none">
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-xs font-mono text-neutral-400">
          Loading 3D Miniature City...
        </div>
      }>
        <Canvas
          camera={{ position: [24, 24, 24], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[20, 30, 15]} intensity={1.2} color="#f8fafc" />
          <pointLight position={[0, 10, 0]} intensity={1.5} color="#38bdf8" distance={25} />
          <pointLight position={[10, 5, 10]} intensity={1.0} color="#f59e0b" distance={15} />

          <ScrollCameraController />
          <CityModel />

          <IssueMarker position={[3, 2.5, -1]} color="#38bdf8" label="Broken Streetlight" icon={Zap} isPrimary={true} />
          <IssueMarker position={[-7, 2.2, 4]} color="#f59e0b" label="Pothole Hazard" icon={AlertTriangle} isPrimary={false} />
          <IssueMarker position={[6, 2.4, 7]} color="#a855f7" label="Water Leakage" icon={Droplets} isPrimary={false} />
          <IssueMarker position={[-6, 2.2, -7]} color="#10b981" label="Garbage Overflow" icon={Trash2} isPrimary={false} />
        </Canvas>
      </Suspense>

      <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[11px] text-neutral-300 font-mono">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        3D MINIATURE CITY VISUALIZATION (R3F)
      </div>
    </div>
  );
}
