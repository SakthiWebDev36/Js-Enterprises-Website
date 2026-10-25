import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows, Text, useCursor } from '@react-three/drei';
import * as THREE from 'three';

// Procedural realistic 3D Fire Extinguisher
function ExtinguisherModel({ isInteractive = true, hoverGlow = false }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // Materials
  const materials = useMemo(() => {
    // Red cylinder paint with realistic clearcoat
    const redPaint = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C62828"),
      roughness: 0.22,
      metalness: 0.15,
      clearcoat: 0.85,
      clearcoatRoughness: 0.18,
      reflectivity: 0.7,
    });

    // Cast brass for valve block
    const brass = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D4AF37"),
      roughness: 0.32,
      metalness: 0.85,
    });

    // Chrome/stainless steel for pin, rings, and lever
    const chrome = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E0E0E0"),
      roughness: 0.18,
      metalness: 0.95,
    });

    // Black reinforced rubber for hose & nozzle
    const rubber = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#141416"),
      roughness: 0.75,
      metalness: 0.08,
    });

    // Dark steel for base skirt & handle
    const darkSteel = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#212529"),
      roughness: 0.45,
      metalness: 0.7,
    });

    // Yellow safety tamper seal
    const safetyYellow = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFD600"),
      roughness: 0.4,
      metalness: 0.1,
    });

    // Gauge face
    const gaugeGlass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FFFFFF"),
      transparent: true,
      opacity: 0.6,
      roughness: 0.05,
      transmission: 0.9,
    });

    return { redPaint, brass, chrome, rubber, darkSteel, safetyYellow, gaugeGlass };
  }, []);

  // Hose curve path
  const hoseCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.38, 1.35, 0),     // Exit valve
      new THREE.Vector3(0.65, 1.15, 0.2),   // Arch outwards
      new THREE.Vector3(0.72, 0.5, 0.45),   // Down side
      new THREE.Vector3(0.68, -0.4, 0.5),   // Lower side
      new THREE.Vector3(0.55, -0.9, 0.4),   // Into nozzle clip
    ]);
  }, []);

  // Frame animation: subtle oscillation and mouse tilt
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle idle floating rotation
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.4 + (state.mouse.x * 0.6);
    groupRef.current.rotation.x = (state.mouse.y * 0.2) + Math.cos(t * 0.3) * 0.03;
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, -0.2, 0]} 
      scale={hovered ? 1.03 : 1.0}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 1. MAIN PRESSURE CYLINDER */}
      {/* Cylinder body */}
      <mesh material={materials.redPaint} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.62, 2.0, 48]} />
      </mesh>

      {/* Top hemispherical dome */}
      <mesh material={materials.redPaint} position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.62, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      </mesh>

      {/* Bottom hemispherical cap */}
      <mesh material={materials.redPaint} position={[0, -1.0, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <sphereGeometry args={[0.62, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
      </mesh>

      {/* Protective base boot ring */}
      <mesh material={materials.darkSteel} position={[0, -1.08, 0]} castShadow>
        <cylinderGeometry args={[0.65, 0.65, 0.25, 48]} />
      </mesh>
      <mesh material={materials.darkSteel} position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.67, 0.67, 0.05, 48]} />
      </mesh>

      {/* 2. NECK COLLAR & DISCHARGE VALVE BLOCK */}
      {/* Threaded neck ring */}
      <mesh material={materials.chrome} position={[0, 1.58, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.12, 32]} />
      </mesh>

      {/* Main brass valve body */}
      <mesh material={materials.brass} position={[0, 1.72, 0]} castShadow>
        <boxGeometry args={[0.3, 0.22, 0.3]} />
      </mesh>
      <mesh material={materials.brass} position={[0.2, 1.68, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.25, 24]} />
      </mesh>

      {/* 3. OPERATING HANDLES & SAFETY PIN */}
      {/* Lower carrying handle (Fixed) */}
      <group position={[-0.15, 1.75, 0]}>
        <mesh material={materials.darkSteel} position={[-0.32, -0.05, 0]} rotation={[0, 0, 0.25]} castShadow>
          <boxGeometry args={[0.55, 0.06, 0.12]} />
        </mesh>
        <mesh material={materials.darkSteel} position={[-0.58, -0.18, 0]}>
          <boxGeometry args={[0.06, 0.24, 0.12]} />
        </mesh>
      </group>

      {/* Upper squeeze lever (Active) */}
      <group position={[-0.05, 1.86, 0]}>
        <mesh material={materials.redPaint} position={[-0.38, 0.1, 0]} rotation={[0, 0, -0.15]} castShadow>
          <boxGeometry args={[0.65, 0.05, 0.14]} />
        </mesh>
        {/* Lever grip curve */}
        <mesh material={materials.darkSteel} position={[-0.7, 0.08, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.14, 16]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      </group>

      {/* Metal pull ring & pin */}
      <group position={[0, 1.82, 0.16]}>
        {/* Pin stem through valve */}
        <mesh material={materials.chrome} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 16]} />
        </mesh>
        {/* Ring */}
        <mesh material={materials.chrome} position={[0, 0, 0.12]}>
          <torusGeometry args={[0.1, 0.02, 16, 32]} />
        </mesh>
        {/* Yellow tamper seal */}
        <mesh material={materials.safetyYellow} position={[0, -0.08, 0.06]}>
          <boxGeometry args={[0.04, 0.12, 0.04]} />
        </mesh>
      </group>

      {/* 4. PRESSURE GAUGE */}
      <group position={[0, 1.74, -0.2]} rotation={[0, Math.PI, 0]}>
        {/* Brass stem */}
        <mesh material={materials.brass} position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.12, 16]} />
        </mesh>
        {/* Gauge circular case */}
        <mesh material={materials.brass}>
          <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
        {/* White dial face */}
        <mesh position={[0, 0, 0.035]}>
          <circleGeometry args={[0.11, 32]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        {/* Green zone pie arc */}
        <mesh position={[0, 0.02, 0.036]}>
          <planeGeometry args={[0.04, 0.04]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        {/* Red warning needle */}
        <mesh position={[0, 0.02, 0.038]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.01, 0.07, 0.005]} />
          <meshBasicMaterial color="#E6392F" />
        </mesh>
        {/* Glass lens */}
        <mesh material={materials.gaugeGlass} position={[0, 0, 0.04]}>
          <circleGeometry args={[0.12, 32]} />
        </mesh>
      </group>

      {/* 5. DISCHARGE HOSE & CONICAL NOZZLE */}
      {/* Hose line */}
      <mesh castShadow>
        <tubeGeometry args={[hoseCurve, 40, 0.045, 16, false]} />
        <primitive object={materials.rubber} />
      </mesh>

      {/* Brass nozzle coupling */}
      <mesh material={materials.brass} position={[0.55, -0.9, 0.4]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
      </mesh>

      {/* Discharge Horn / Nozzle */}
      <mesh material={materials.darkSteel} position={[0.53, -1.05, 0.38]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.045, 0.09, 0.25, 24]} />
      </mesh>

      {/* Hose retention clip on cylinder */}
      <mesh material={materials.darkSteel} position={[0.58, 0, 0.25]}>
        <boxGeometry args={[0.08, 0.18, 0.06]} />
      </mesh>

      {/* 6. TECHNICAL GRAPHICS & IDENTIFICATION LABEL */}
      {/* Label white/black panel */}
      <group position={[0, 0.05, 0.628]} rotation={[0, 0, 0]}>
        <mesh>
          <planeGeometry args={[0.7, 1.25]} />
          <meshStandardMaterial 
            color="#0D1117" 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Header bar on label */}
        <mesh position={[0, 0.52, 0.002]}>
          <planeGeometry args={[0.66, 0.14]} />
          <meshBasicMaterial color="#E6392F" />
        </mesh>

        <Text
          position={[0, 0.52, 0.004]}
          fontSize={0.06}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          JS ENTERPRISES
        </Text>

        <Text
          position={[0, 0.38, 0.004]}
          fontSize={0.052}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          FIRE EXTINGUISHER
        </Text>

        <Text
          position={[0, 0.27, 0.004]}
          fontSize={0.038}
          color="#38BDF8"
          anchorX="center"
          anchorY="middle"
        >
          ABC DRY POWDER • 6KG
        </Text>

        {/* Operating Instructions */}
        <mesh position={[0, 0.06, 0.002]}>
          <planeGeometry args={[0.64, 0.28]} />
          <meshBasicMaterial color="#161B22" />
        </mesh>

        <Text
          position={[-0.28, 0.14, 0.004]}
          fontSize={0.032}
          color="#F3F4F6"
          anchorX="left"
          anchorY="middle"
        >
          1. PULL OUT SAFETY PIN
        </Text>
        <Text
          position={[-0.28, 0.06, 0.004]}
          fontSize={0.032}
          color="#F3F4F6"
          anchorX="left"
          anchorY="middle"
        >
          2. AIM NOZZLE AT BASE
        </Text>
        <Text
          position={[-0.28, -0.02, 0.004]}
          fontSize={0.032}
          color="#F3F4F6"
          anchorX="left"
          anchorY="middle"
        >
          3. SQUEEZE LEVER
        </Text>

        {/* Class badges */}
        <group position={[0, -0.22, 0.004]}>
          <Text position={[-0.2, 0, 0]} fontSize={0.045} color="#10B981" fontWeight="bold">
            [A]
          </Text>
          <Text position={[0, 0, 0]} fontSize={0.045} color="#3B82F6" fontWeight="bold">
            [B]
          </Text>
          <Text position={[0.2, 0, 0]} fontSize={0.045} color="#E6392F" fontWeight="bold">
            [C]
          </Text>
        </group>

        {/* Standards & location tag */}
        <Text
          position={[0, -0.42, 0.004]}
          fontSize={0.028}
          color="#94A3B8"
          anchorX="center"
          anchorY="middle"
        >
          IS:15683 • PADI, CHENNAI
        </Text>
        <Text
          position={[0, -0.49, 0.004]}
          fontSize={0.024}
          color="#64748B"
          anchorX="center"
          anchorY="middle"
        >
          HYDRO TESTED: 30 BAR
        </Text>
      </group>
    </group>
  );
}

// Full 3D Viewport with studio lighting & camera controls
export default function FireExtinguisher3D({ onLoaded }) {
  const [orbitActive, setOrbitActive] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  return (
    <div className="relative w-full h-[450px] lg:h-[540px] flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-[#0F1422] to-[#080B11] border border-surfaceBorder shadow-2xl group">
      {/* Background ambient lighting spotlight */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-80"></div>
      
      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none"></div>

      {/* Top HUD Telemetry */}
      <div className="absolute top-4 right-4 flex items-center z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#0B0F19]/90 border border-surfaceBorder text-[11px] font-mono text-emerald-400">
          <span>IS:15683 CERTIFIED</span>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0.3, 4.0], fov: 42 }}
          shadows
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onError={() => setHasWebGL(false)}
        >
          {/* Studio Lights */}
          <ambientLight intensity={0.7} />
          
          {/* Key White Studio Light */}
          <directionalLight 
            position={[4, 5, 4]} 
            intensity={1.8} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
          
          {/* Dramatic Fire Red Rim Light */}
          <spotLight 
            position={[-4, 3, -3]} 
            intensity={4.5} 
            color="#FF3823" 
            angle={0.6} 
            penumbra={0.8} 
          />

          {/* Cool Cyan Accent Rim Light */}
          <spotLight 
            position={[3, -2, -3]} 
            intensity={2.0} 
            color="#38BDF8" 
            angle={0.7} 
            penumbra={0.9} 
          />

          <Suspense fallback={null}>
            <Float
              speed={1.8}
              rotationIntensity={0.2}
              floatIntensity={0.35}
              floatingRange={[-0.08, 0.08]}
            >
              <ExtinguisherModel />
            </Float>

            {/* Soft contact shadow on metallic floor */}
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.75}
              scale={6}
              blur={2.4}
              far={4}
              color="#000000"
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.8}
            onStart={() => setOrbitActive(true)}
            onEnd={() => setOrbitActive(false)}
          />
        </Canvas>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg bg-[#0E131F]/90 backdrop-blur-md border border-surfaceBorder text-xs font-mono text-gray-300">
          <span className="text-gray-500 mr-2">SPEC:</span>
          <span>ABC Dry Powder • 6kg • 15 Bar</span>
        </div>

        <div className="text-[11px] font-mono text-gray-400 bg-[#0E131F]/80 px-2.5 py-1 rounded border border-surfaceBorder flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>Drag to inspect 360°</span>
        </div>
      </div>
    </div>
  );
}
