import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// Sun component with glow
function Sun() {
  const sunRef = useRef<THREE.Mesh>(null!)
  
  return (
    <group position={[0, 0, 0]}>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
      {/* Sun glow */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial color="#FFA500" transparent opacity={0.3} />
      </mesh>
      {/* Point light */}
      <pointLight intensity={2} color="#FFF5E0" />
    </group>
  )
}

// Earth component with atmosphere
function Earth() {
  const earthRef = useRef<THREE.Group>(null!)
  const cloudRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Earth orbits around sun
    earthRef.current.position.x = Math.cos(t * 0.2) * 12
    earthRef.current.position.z = Math.sin(t * 0.2) * 12
    // Earth self rotation
    earthRef.current.rotation.y += 0.005
    // Clouds rotate slightly faster
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.006
    }
  })
  
  return (
    <group ref={earthRef}>
      {/* Earth core */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#1E90FF"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Continents (simplified as green patches) */}
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshStandardMaterial 
          color="#228B22"
          roughness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Clouds layer */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.02, 64, 64]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          transparent
          opacity={0.4}
          roughness={1}
        />
      </mesh>
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshBasicMaterial 
          color="#87CEEB"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

// Moon orbiting Earth
function Moon() {
  const moonRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Moon orbits around Earth
    moonRef.current.position.x = Math.cos(t * 0.8) * 2.5
    moonRef.current.position.z = Math.sin(t * 0.8) * 2.5
    // Moon self rotation
    moonRef.current.rotation.y += 0.003
  })
  
  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}

// Stars background
function Stars() {
  const starsRef = useRef<THREE.Points>(null!)
  
  const starPositions = new Float32Array(3000 * 3)
  for (let i = 0; i < 3000; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 50 + Math.random() * 50
    
    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    starPositions[i * 3 + 2] = r * Math.cos(phi)
  }
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001
    }
  })
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[starPositions, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial color="#FFFFFF" size={0.5} transparent opacity={0.8} />
    </points>
  )
}

// Orbit paths visualization
function OrbitPath({ radius }: { radius: number }) {
  const points = []
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
  }
  
  // Create circular geometry
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  
  // Use primitive with Line object
  return (
    <primitive object={new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: '#333333', transparent: true, opacity: 0.3 })
    )} />
  )
}

// Main scene content
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Stars />
      <Sun />
      <Earth />
      <Moon />
      <OrbitPath radius={12} />
    </>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-white text-sm">Loading...</span>
      </div>
    </Html>
  )
}

export default function EarthScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 8, 25], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
