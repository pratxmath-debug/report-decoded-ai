import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SparkLogo } from './SparkLogo';

interface SparkCore3DProps {
  className?: string;
  onExploreDemo?: () => void;
}

export const SparkCore3D: React.FC<SparkCore3DProps> = ({
  className = '',
  onExploreDemo
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const container = mountRef.current;
    if (!container) return;

    // Test WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0x0e3e3b, 2.5);
    scene.add(ambientLight);

    const tealPoint = new THREE.PointLight(0x287f78, 3.5, 20);
    tealPoint.position.set(3, 3, 4);
    scene.add(tealPoint);

    const sagePoint = new THREE.PointLight(0xa8c8ba, 3.0, 20);
    sagePoint.position.set(-3, -2, 3);
    scene.add(sagePoint);

    const topWhite = new THREE.DirectionalLight(0xffffff, 1.2);
    topWhite.position.set(0, 5, 5);
    scene.add(topWhite);

    // 3. Central Faceted Crystal Spark (Octahedron + Wireframe)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Faceted Crystal
    const outerGeo = new THREE.OctahedronGeometry(1.6, 0);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x287f78,
      emissive: 0x124e4a,
      roughness: 0.15,
      metalness: 0.2,
      transmission: 0.65,
      ior: 1.5,
      thickness: 1.2,
      transparent: true,
      opacity: 0.90,
      flatShading: true
    });
    const outerCrystal = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCrystal);

    // Inner Glowing Core (Spike / Icosahedron)
    const innerGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xa8c8ba,
      emissive: 0x287f78,
      emissiveIntensity: 1.2,
      wireframe: true
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 4. Orbital Ring 1 (Medical Teal)
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xa8c8ba,
      emissive: 0x287f78,
      emissiveIntensity: 0.8,
      roughness: 0.3
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    scene.add(ring1);

    // Orbital Ring 2 (Teal)
    const ring2Geo = new THREE.TorusGeometry(2.8, 0.025, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      emissive: 0x0f766e,
      emissiveIntensity: 0.6,
      roughness: 0.4
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 5;
    scene.add(ring2);

    // 5. Constellation Particle Cloud (240 Particles)
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Cyan-Teal gradient colors
      colors[i * 3] = 0.1 + Math.random() * 0.3; // R
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.85 + Math.random() * 0.15; // B
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // 6. Interactive Mouse Damped Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damped parallax
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      // Idle Rotation
      coreGroup.rotation.y = elapsed * 0.45 + currentRotY;
      coreGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.25 + currentRotX;
      coreGroup.position.y = Math.sin(elapsed * 1.2) * 0.12;

      innerCore.rotation.y = -elapsed * 0.6;
      innerCore.rotation.z = elapsed * 0.3;

      ring1.rotation.z = elapsed * 0.25;
      ring2.rotation.z = -elapsed * 0.2;

      particleCloud.rotation.y = elapsed * 0.06;

      renderer.render(scene, camera);
    };

    if (!motionQuery.matches) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-[460px] sm:h-[540px] flex items-center justify-center ${className}`}>
      
      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto"
      />

      {/* Fallback for WebGL Unavailable or Reduced Motion */}
      {(!hasWebGL || prefersReducedMotion) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-[#124E4A]/20 via-[#287F78]/30 to-transparent blur-xl animate-pulse" />
          <div className="relative w-44 h-44 rounded-3xl bg-gradient-to-br from-[#124E4A] to-[#287F78] shadow-2xl flex items-center justify-center text-white border border-[#A8C8BA]/40">
            <SparkLogo size="xl" />
          </div>
        </div>
      )}

      {/* Overlaid Layered Glass Clinical Report Cards (Spatial 3D Planes) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        
        {/* Floating Parameter Pill 1 (Top Left) */}
        <div className="absolute top-8 left-0 sm:left-4 p-3.5 rounded-2xl bg-[#0E3E3B]/90 border border-[#A8C8BA]/40 shadow-xl backdrop-blur-md pointer-events-auto animate-float-slow hidden sm:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">HbA1c</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Above Range
              </span>
            </div>
            <p className="text-[11px] text-[#D4E5DE] mt-0.5">
              Reported: <strong className="text-white">6.2%</strong> • Ref: &lt; 5.7%
            </p>
          </div>
        </div>

        {/* Floating Parameter Pill 2 (Top Right) */}
        <div className="absolute top-12 right-0 sm:right-4 p-3.5 rounded-2xl bg-[#0E3E3B]/90 border border-[#287F78]/50 shadow-xl backdrop-blur-md pointer-events-auto animate-float-delayed hidden sm:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#287F78]/30 border border-[#A8C8BA]/40 flex items-center justify-center text-[#A8C8BA]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">ALT / SGPT</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-[#287F78]/30 text-[#A8C8BA] border border-[#A8C8BA]/30">
                Within Range
              </span>
            </div>
            <p className="text-[11px] text-[#D4E5DE] mt-0.5">
              Reported: <strong className="text-white">28 U/L</strong> • Ref: 7–56 U/L
            </p>
          </div>
        </div>

        {/* Floating Mini Panel (Bottom Center/Right) */}
        <div className="absolute bottom-6 right-2 sm:right-8 p-4 rounded-2xl bg-gradient-to-br from-[#0E3E3B]/95 to-[#124E4A]/95 border border-[#A8C8BA]/30 shadow-2xl backdrop-blur-xl pointer-events-auto max-w-[280px]">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#A8C8BA]">
              <Activity className="w-3.5 h-3.5 text-[#A8C8BA]" />
              <span>Spark Intelligence Core</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0E3E3B] text-[#A8C8BA] border border-[#1B5B56]">
              Active
            </span>
          </div>
          <p className="text-[11px] text-[#E5F3ED]/90 leading-relaxed">
            Deterministic evaluation comparing report values directly against physical laboratory reference intervals.
          </p>
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#D4E5DE] font-medium">
            <span>Client-side OCR & PDF</span>
            <span className="text-[#A8C8BA] font-bold">100% Private</span>
          </div>
        </div>

        {/* Illustrative Demo Watermark Pill */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] text-slate-400 backdrop-blur-md hidden sm:block">
          Illustrative scientific visualization
        </div>

      </div>

    </div>
  );
};
