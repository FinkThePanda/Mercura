/*
This is used for creating a 3D model of the speaker to show on the website



import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Model: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Opret scene
    const scene = new THREE.Scene();

    // Opret kamera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Opret renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Opret en simpel boks (produkt)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Opret OrbitControls til brugerinteraktion
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Tilføjer inerti til interaktionerne
    controls.dampingFactor = 0.05; // Hvor hurtigt rotation stopper
    controls.enableZoom = true; // Tillad zoom med scroll
    controls.rotateSpeed = 0.5; // Justerer rotationshastigheden

    // Juster størrelse på vinduet ved ændring af skærmstørrelse
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // OrbitControls opdateres hver frame for at følge brugerens interaktion
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup ved afmontering af komponent
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Model;
*/
