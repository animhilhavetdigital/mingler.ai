"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MinglerScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 9.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.rotation.x = -0.18;
    scene.add(world);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff4b0b,
      emissive: 0xff2600,
      emissiveIntensity: 1.6,
      roughness: 0.24,
      metalness: 0.22,
      clearcoat: 1,
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, 4), coreMaterial);
    world.add(core);

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.26, 2),
      new THREE.MeshBasicMaterial({ color: 0xffb18c, wireframe: true, transparent: true, opacity: 0.22 }),
    );
    world.add(coreWire);

    const rings: THREE.Mesh[] = [];
    [1.75, 2.55, 3.38].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === 0 ? 0.016 : 0.009, 8, 160),
        new THREE.MeshBasicMaterial({
          color: index === 1 ? 0x090909 : 0xff4b0b,
          transparent: true,
          opacity: index === 1 ? 0.2 : 0.34 - index * 0.06,
        }),
      );
      ring.rotation.x = Math.PI * (0.42 + index * 0.07);
      ring.rotation.y = index * 0.5;
      rings.push(ring);
      world.add(ring);
    });

    const nodeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfffdfa,
      emissive: 0xff4b0b,
      emissiveIntensity: 0.45,
      roughness: 0.18,
      metalness: 0.08,
    });
    const nodePositions = [
      new THREE.Vector3(-3.1, 1.2, 0.1),
      new THREE.Vector3(2.75, 1.65, -0.15),
      new THREE.Vector3(-2.25, -2.1, 0.2),
      new THREE.Vector3(3.15, -1.35, -0.1),
    ];
    const nodes = nodePositions.map((position, index) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.24 + index * 0.025, 32, 32), nodeMaterial.clone());
      node.position.copy(position);
      world.add(node);

      const points = [new THREE.Vector3(0, 0, 0), position.clone().multiplyScalar(0.92)];
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0xff4b0b, transparent: true, opacity: 0.38 }),
      );
      world.add(line);
      return node;
    });

    const particleCount = 330;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 4.6;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.8;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius * 0.45;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xff4b0b, size: 0.026, transparent: true, opacity: 0.56, sizeAttenuation: true }),
    );
    world.add(particles);

    const warmLight = new THREE.PointLight(0xff4b0b, 42, 20);
    warmLight.position.set(2.5, 2, 5);
    scene.add(warmLight);
    scene.add(new THREE.AmbientLight(0xffe0ce, 2.4));

    const pointer = new THREE.Vector2(0, 0);
    let scrollProgress = 0;
    let frame = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      if (!hero) return;
      scrollProgress = THREE.MathUtils.clamp(window.scrollY / Math.max(hero.offsetHeight * 1.15, 1), 0, 1);
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      world.rotation.y += (pointer.x * 0.13 + scrollProgress * 1.15 - world.rotation.y) * 0.035;
      world.rotation.x += (-pointer.y * 0.08 - 0.18 + scrollProgress * 0.32 - world.rotation.x) * 0.03;
      world.scale.setScalar(1 + scrollProgress * 0.46);
      core.rotation.x = elapsed * 0.18;
      core.rotation.y = elapsed * 0.24;
      core.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.035);
      coreWire.rotation.x = -elapsed * 0.08;
      coreWire.rotation.y = elapsed * 0.13;
      particles.rotation.y = elapsed * 0.025 + scrollProgress * 0.35;
      rings.forEach((ring, index) => {
        ring.rotation.z = elapsed * (index % 2 === 0 ? 0.045 : -0.035) + scrollProgress * (index + 1) * 0.23;
      });
      nodes.forEach((node, index) => {
        node.scale.setScalar(1 + Math.sin(elapsed * 2.5 + index) * 0.12);
      });
      camera.position.z = 9.5 - scrollProgress * 1.8;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      particleGeometry.dispose();
      core.geometry.dispose();
      coreMaterial.dispose();
      coreWire.geometry.dispose();
      (coreWire.material as THREE.Material).dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      nodes.forEach((node) => {
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      renderer.domElement.remove();
    };
  }, []);

  return <div className="webgl-scene" ref={mountRef} aria-hidden="true" />;
}
