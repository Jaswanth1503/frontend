"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let isVisible = true;
    let animationFrameId: number;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for perf
    mountRef.current.appendChild(renderer.domElement);

    // AI Core (Icosahedron + Sphere)
    const coreGroup = new THREE.Group();
    
    // Inner Sphere (Emissive)
    const sphereGeometry = new THREE.SphereGeometry(1.8, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x114c5a, // Nocturnal
      emissive: 0x114c5a,
      emissiveIntensity: 0.5,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const innerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    coreGroup.add(innerSphere);

    // Outer Wireframe
    const icosahedronGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff9932, // Saffron
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const outerWireframe = new THREE.Mesh(icosahedronGeometry, wireframeMaterial);
    coreGroup.add(outerWireframe);
    
    scene.add(coreGroup);

    // Particles
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 150 : 400;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 20; // Spread across 20 units
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffc801, // Forsythia
      size: 0.05,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x114c5a, 2); // Cool blue
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff9932, 3, 20); // Warm yellow
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const rimLight = new THREE.DirectionalLight(0xf1f6f4, 1); // Arctic
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Intersection Observer for pausing off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    if (mountRef.current) observer.observe(mountRef.current);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause rendering if off-screen

      const time = clock.getElapsedTime();

      // Core breathing and rotation
      const scale = 1 + Math.sin(time * 1.5) * 0.02;
      coreGroup.scale.set(scale, scale, scale);
      
      coreGroup.rotation.y += 0.002;
      coreGroup.rotation.x += 0.001;

      // Mouse parallax
      coreGroup.position.x += (mouseX * 0.5 - coreGroup.position.x) * 0.05;
      coreGroup.position.y += (mouseY * 0.5 - coreGroup.position.y) * 0.05;
      
      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Particles gentle movement
      particleSystem.rotation.y = time * 0.05;
      particleSystem.rotation.x = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        observer.unobserve(mountRef.current);
        if (renderer.domElement && mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
        }
      }
      
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      icosahedronGeometry.dispose();
      wireframeMaterial.dispose();
      particlesGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0" />;
}
