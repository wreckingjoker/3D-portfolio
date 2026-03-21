"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PURPLE = "#7c3aff";
const PURPLE_COLOR = new THREE.Color(PURPLE);

// Wireframe sphere
function WireSphere() {
  const meshRef = useRef();
  const matRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.22;
      meshRef.current.rotation.x = t * 0.09;
    }
    if (matRef.current) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.6);
      matRef.current.opacity = 0.45 + 0.3 * pulse;
    }
  });

  const wireGeo = useMemo(() => {
    const sphere = new THREE.SphereGeometry(0.72, 16, 16);
    return new THREE.WireframeGeometry(sphere);
  }, []);

  return (
    <lineSegments ref={meshRef} geometry={wireGeo}>
      <lineBasicMaterial
        ref={matRef}
        color={PURPLE}
        transparent
        opacity={0.55}
        toneMapped={false}
      />
    </lineSegments>
  );
}

// One gyroscope ring at a given tilt
function OrbitRing({ rotX, rotZ, speed, dotOffset }) {
  const groupRef = useRef();
  const dotRef = useRef();
  const ringMatRef = useRef();

  const RING_RADIUS = 0.88;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * speed;
    }
    if (ringMatRef.current) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.0 + dotOffset);
      ringMatRef.current.emissiveIntensity = 0.4 + 0.6 * pulse;
    }
    // Trace dot around the ring
    if (dotRef.current) {
      const angle = t * speed * 2.5 + dotOffset;
      dotRef.current.position.x = Math.cos(angle) * RING_RADIUS;
      dotRef.current.position.y = Math.sin(angle) * RING_RADIUS;
    }
  });

  return (
    <group ref={groupRef} rotation={[rotX, 0, rotZ]}>
      {/* Ring torus */}
      <mesh>
        <torusGeometry args={[RING_RADIUS, 0.018, 10, 80]} />
        <meshStandardMaterial
          ref={ringMatRef}
          color={PURPLE}
          emissive={PURPLE_COLOR}
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Tracing dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.042, 8, 8]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </group>
  );
}

function ThreeDScene() {
  const sceneRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sceneRef.current) {
      sceneRef.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Bloom-style purple point lights */}
      <pointLight color={PURPLE} intensity={8} distance={5} decay={2} />
      <pointLight color={PURPLE} intensity={3} distance={9} decay={1} position={[0, 0, 2]} />
      <pointLight color="#ffffff" intensity={1.5} distance={4} decay={2} position={[0.5, 0.5, 1]} />

      {/* Wireframe sphere */}
      <WireSphere />

      {/* Three gyroscope rings at different angles */}
      <OrbitRing rotX={0}              rotZ={0}              speed={0.28}  dotOffset={0} />
      <OrbitRing rotX={Math.PI / 2}    rotZ={0}              speed={0.38}  dotOffset={2.1} />
      <OrbitRing rotX={Math.PI / 4}    rotZ={Math.PI / 4}    speed={0.22}  dotOffset={4.2} />
    </group>
  );
}

export default function ThreeDWebIcon() {
  return (
    <div style={{ width: 160, height: 160, flexShrink: 0 }}>
      <Canvas
        style={{ width: "100%", height: "100%", background: "transparent" }}
        camera={{ position: [0, 0, 4.2], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.1} />
        <ThreeDScene />
      </Canvas>
    </div>
  );
}
