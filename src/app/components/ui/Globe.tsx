"use client"

import Image from 'next/image';
import { JSX, RefObject, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const FallBackUI = (): JSX.Element => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const starsArray = [...Array(100)].map((_, i) => {
      const size = Math.random() * 3;
      return (
        <div
          key={i}
          className="star absolute bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: Math.random() * 0.8 + 0.2,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            transform: 'translateZ(0)'
          }}
        />
      );
    });
    setStars(starsArray);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        <Image
          src="/earth-static.jpg"
          alt="Earth"
          className="w-full h-full object-cover rounded-full animate-rotate-slow"
          width={256}
          height={256}
        />
      </div>

      <div className="stars absolute inset-0" style={{ transform: 'translateZ(0)' }}>
        {stars}
      </div>
    </div>
  )
}

const Globe = () => {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);
  const [fallbackMode, setFallbackMode] = useState(false);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) return

    const isMali400 = (): boolean => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
        if (!gl) return false;

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return false;

        const rendererInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
        return /Mali-400/i.test(rendererInfo);
      } catch (e) {
        console.error('GPU detection failed:', e);
        return false;
      }
    };

    if (isMali400()) {
      setFallbackMode(true);
      return;
    }

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 5;
      let renderer: THREE.WebGLRenderer | null = null

      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          powerPreference: 'low-power',
          precision: 'lowp',
          antialias: false
        });
      } catch (error: unknown) {
        console.error("renderer initialization error: ", error)
        return
      }

      if (renderer) {
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        renderer.setPixelRatio(1)
      } else {
        return;
      }

      const geometry = new THREE.SphereGeometry(2, 64, 64);
      const texture = new THREE.TextureLoader().load('/earth-texture.jpg');
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        specular: new THREE.Color(0x0ff),
        shininess: 5
      });
      const globe = new THREE.Mesh(geometry, material);
      scene.add(globe);

      const glowGeometry = new THREE.SphereGeometry(2.05, 64, 64);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x0ff,
        transparent: true,
        opacity: 0.2
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glow);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
      });

      const starVertices = [];
      for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starVertices.push(x, y, z);
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      const animate = () => {
        requestAnimationFrame(animate);

        globe.rotation.y += 0.002;
        glow.rotation.y += 0.002;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();
      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        if (renderer) {
          renderer.setSize(container.clientWidth, container.clientHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        if (container && renderer?.domElement) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        texture.dispose();
        glowGeometry.dispose();
        glowMaterial.dispose();
        starGeometry.dispose();
        starMaterial.dispose();
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
        }
      }

    } catch (error: unknown) {
      console.error("Scene creation failed:", error);
      const errorDisplay = document.createElement('div');
      errorDisplay.className = 'text-red-400 text-center p-4';
      errorDisplay.textContent = '3D content failed to load';
      container.appendChild(errorDisplay);
    }

  }, []);

  return fallbackMode
    ? <FallBackUI />
    : <div ref={mountRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default Globe;