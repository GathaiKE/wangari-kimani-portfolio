"use client"

import { RefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container!.clientWidth / container!.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container!.clientWidth, container!.clientHeight);
    container!.appendChild(renderer.domElement);
    
    // Create globe
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
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(2.05, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x0ff,
      transparent: true,
      opacity: 0.2
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x0ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Add stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
    });
    
    const starVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      globe.rotation.y += 0.002;
      glow.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = container!.clientWidth / container!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container!.clientWidth, container!.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      container!.removeChild(renderer.domElement);
    };
  }, []);
  
  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default Globe;