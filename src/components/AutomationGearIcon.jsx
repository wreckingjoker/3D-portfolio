"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TEAL = "#00ffc8";
const TEAL_COLOR = new THREE.Color(TEAL);

// 6 node positions arranged in a circle inside the gear
const NODE_POSITIONS = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2;
  const r = 0.52;
  return new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0);
});

// Fully connected edges between all 6 nodes
const EDGES = [];
for (let i = 0; i < 6; i++) {
  for (let j = i + 1; j < 6; j++) {
    EDGES.push([i, j]);
  }
}

function NeuralNet() {
  const lineGeo = useMemo(() => {
    const pts = [];
    EDGES.forEach(([a, b]) => {
      pts.push(NODE_POSITIONS[a], NODE_POSITIONS[b]);
    });
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    return geo;
  }, []);

  const lineMat = useRef();
  const sphereMats = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.2);
    if (lineMat.current) {
      lineMat.current.opacity = 0.18 + 0.22 * pulse;
    }
    sphereMats.current.forEach((mat, i) => {
      if (!mat) return;
      const p = 0.5 + 0.5 * Math.sin(t * 2.2 + i * 1.05);
      mat.emissiveIntensity = 0.6 + 1.4 * p;
    });
  });

  return (
    <group>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          ref={lineMat}
          color={TEAL}
          transparent
          opacity={0.3}
        />
      </lineSegments>

      {NODE_POSITIONS.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial
            ref={(el) => (sphereMats.current[i] = el)}
            color={TEAL}
            emissive={TEAL_COLOR}
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function GearScene() {
  const gearGroup = useRef();
  const ringMat = useRef();
  const toothMats = useRef([]);

  const TEETH = 12;
  const toothAngles = useMemo(
    () => Array.from({ length: TEETH }, (_, i) => (i / TEETH) * Math.PI * 2),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Slow Y rotation
    if (gearGroup.current) {
      gearGroup.current.rotation.y = t * 0.35;
    }

    // Pulsing emissive on ring
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.8);
    if (ringMat.current) {
      ringMat.current.emissiveIntensity = 0.4 + 0.8 * pulse;
    }
    toothMats.current.forEach((mat) => {
      if (mat) mat.emissiveIntensity = 0.4 + 0.8 * pulse;
    });
  });

  return (
    <group ref={gearGroup}>
      {/* Point light — bloom-style teal */}
      <pointLight color={TEAL} intensity={6} distance={5} decay={2} />
      <pointLight color={TEAL} intensity={2} distance={8} decay={1} position={[0, 0, 2]} />

      {/* Gear ring */}
      <mesh>
        <torusGeometry args={[0.9, 0.12, 16, 80]} />
        <meshStandardMaterial
          ref={ringMat}
          color={TEAL}
          emissive={TEAL_COLOR}
          emissiveIntensity={0.8}
          metalness={0.6}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Inner hub ring */}
      <mesh>
        <torusGeometry args={[0.28, 0.05, 12, 48]} />
        <meshStandardMaterial
          color={TEAL}
          emissive={TEAL_COLOR}
          emissiveIntensity={0.5}
          metalness={0.4}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Gear teeth */}
      {toothAngles.map((angle, i) => {
        const x = Math.cos(angle) * 1.01;
        const y = Math.sin(angle) * 1.01;
        return (
          <mesh
            key={i}
            position={[x, y, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <boxGeometry args={[0.14, 0.22, 0.12]} />
            <meshStandardMaterial
              ref={(el) => (toothMats.current[i] = el)}
              color={TEAL}
              emissive={TEAL_COLOR}
              emissiveIntensity={0.6}
              metalness={0.6}
              roughness={0.2}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      {/* Neural net inside the gear */}
      <NeuralNet />
    </group>
  );
}

export default function AutomationGearIcon() {
  return (
    <div style={{ width: 170, height: 170, flexShrink: 0 }}>
      <Canvas
        style={{ width: "100%", height: "100%", background: "transparent" }}
        camera={{ position: [0, 0, 3.2], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.15} />
        <GearScene />
      </Canvas>
    </div>
  );
}
