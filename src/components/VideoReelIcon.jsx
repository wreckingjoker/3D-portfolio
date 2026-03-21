"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CRIMSON = "#dc1e50";
const CRIMSON_COLOR = new THREE.Color(CRIMSON);

// 8 rectangular boxes orbiting the torus circumference
function ReelBoxes({ pulseIntensity }) {
  const groupRef = useRef();
  const matRefs = useRef([]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.4;
    }
    const pulse = 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 2.8);
    matRefs.current.forEach((mat) => {
      if (mat) mat.emissiveIntensity = 0.5 + 0.9 * pulse;
    });
  });

  const boxes = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const r = 0.92;
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        rotation: angle,
      };
    }), []
  );

  return (
    <group ref={groupRef}>
      {boxes.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, 0]} rotation={[0, 0, b.rotation]}>
          <boxGeometry args={[0.13, 0.26, 0.08]} />
          <meshStandardMaterial
            ref={(el) => (matRefs.current[i] = el)}
            color={CRIMSON}
            emissive={CRIMSON_COLOR}
            emissiveIntensity={0.7}
            metalness={0.5}
            roughness={0.3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Pulsing icosahedron core
function IcoCore() {
  const meshRef = useRef();
  const matRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Heartbeat: two quick pulses then pause
    const beat = Math.pow(Math.abs(Math.sin(t * 2.1)), 0.3);
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.6 + 1.8 * beat;
    }
    if (meshRef.current) {
      const s = 1 + 0.08 * beat;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.32, 0]} />
      <meshStandardMaterial
        ref={matRef}
        color={CRIMSON}
        emissive={CRIMSON_COLOR}
        emissiveIntensity={1.2}
        wireframe={false}
        metalness={0.3}
        roughness={0.4}
        toneMapped={false}
      />
    </mesh>
  );
}

// Floating spark particles
function Sparks() {
  const count = 24;
  const meshRefs = useRef([]);

  const initial = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 1.6,
      y: (Math.random() - 0.5) * 1.6,
      z: (Math.random() - 0.5) * 0.4,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      size: 0.015 + Math.random() * 0.025,
    })), []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = initial[i];
      // Float upward, reset when too high
      const elapsed = ((t * p.speed + p.offset) % 2.0);
      mesh.position.y = p.y + elapsed * 0.8 - 0.8;
      mesh.position.x = p.x + Math.sin(t * 0.8 + p.offset) * 0.08;
      mesh.material.opacity = elapsed < 1.6
        ? Math.min(1, elapsed * 1.5) * (1 - elapsed / 2.0)
        : 0;
    });
  });

  return (
    <>
      {initial.map((p, i) => (
        <mesh key={i} ref={(el) => (meshRefs.current[i] = el)} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 4, 4]} />
          <meshBasicMaterial
            color={CRIMSON}
            transparent
            opacity={0.8}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

function ReelScene() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bloom-style crimson point lights */}
      <pointLight color={CRIMSON} intensity={7} distance={5} decay={2} />
      <pointLight color={CRIMSON} intensity={3} distance={8} decay={1} position={[0, 0, 2]} />

      {/* Torus ring */}
      <mesh>
        <torusGeometry args={[0.92, 0.055, 14, 80]} />
        <meshStandardMaterial
          color={CRIMSON}
          emissive={CRIMSON_COLOR}
          emissiveIntensity={0.9}
          metalness={0.5}
          roughness={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* 8 reel boxes orbiting the ring */}
      <ReelBoxes />

      {/* Pulsing icosahedron center */}
      <IcoCore />

      {/* Floating sparks */}
      <Sparks />
    </group>
  );
}

export default function VideoReelIcon() {
  return (
    <div style={{ width: 160, height: 160, flexShrink: 0 }}>
      <Canvas
        style={{ width: "100%", height: "100%", background: "transparent" }}
        camera={{ position: [0, 0, 3.2], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.1} />
        <ReelScene />
      </Canvas>
    </div>
  );
}
