"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { NavIcon } from "@/components/nav/NavIcon";

type Card = {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
};

const cardsData: Card[] = [
  { id: "1", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=85", alt: "MOS Marketing", title: "MOS Marketing" },
  { id: "2", imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=85", alt: "HD Data +20M", title: "HD Data +20M" },
  { id: "3", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=85", alt: "iACRM 360°", title: "iACRM 360°" },
  { id: "4", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=85", alt: "HD Affiliation", title: "HD Affiliation" },
  { id: "5", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=85", alt: "Agent Market Data", title: "Agent Market Data" },
  { id: "6", imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=85", alt: "Agent Strategy SCP", title: "Agent Strategy SCP" },
  { id: "7", imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=85", alt: "Orchestrateur AI", title: "Orchestrateur AI" },
  { id: "8", imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=85", alt: "Ads Manager AI", title: "Ads Manager AI" },
  { id: "9", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=85", alt: "Content Creator", title: "Content Creator" },
  { id: "10", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=85", alt: "Email Marketing", title: "Email Marketing" },
  { id: "11", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=85", alt: "Community Manager", title: "Community Manager" },
  { id: "12", imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=85", alt: "Publishing AI", title: "Publishing AI" },
  { id: "13", imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=85", alt: "Performance Analytics", title: "Performance Analytics" },
  { id: "14", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=85", alt: "Ciblage B2B", title: "Ciblage B2B" },
  { id: "15", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=85", alt: "Attribution ROI", title: "Attribution ROI" },
  { id: "16", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=85", alt: "Scoring Intelligent", title: "Scoring Intelligent" },
  { id: "17", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=85", alt: "Mémoire Unifiée", title: "Mémoire Unifiée" },
  { id: "18", imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=85", alt: "ReelSend Integration", title: "ReelSend Integration" },
  { id: "19", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=85", alt: "Signals to Action", title: "Signals to Action" },
  { id: "20", imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=85", alt: "Mingler Platform", title: "Mingler Platform" },
];

export default function StellarCardGallerySingle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // Typewriter & Scroll Animation States
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // MAJUSCULE Title
  const fullBrand = "MINGLER.AI";

  // Slower, deliberate typewriter animation (180ms per character)
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullBrand.length) {
        setTypedText(fullBrand.slice(0, index));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Track progress inside sticky hero container (0 to 1)
  useEffect(() => {
    const onScroll = () => {
      const heroElem = document.getElementById("top");
      if (!heroElem) return;
      const rect = heroElem.getBoundingClientRect();
      const totalHeight = heroElem.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.012);

    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x040406, 1);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 1.0;
    controls.minDistance = 6;
    controls.maxDistance = 45;

    // 2. High Clarity Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 12, 15);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xff4b0b, 2.5, 120);
    pointLight.position.set(12, 12, 12);
    scene.add(pointLight);

    // Dynamic Hover Light Shadow Effect
    const hoverLight = new THREE.PointLight(0xff4b0b, 0, 25);
    scene.add(hoverLight);

    // 3. Crisp Fine White Starfield Background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3500;
    const starPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 320;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 320;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 320;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.28,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });

    const starfield = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starfield);

    // 4. Galaxy Core Spheres
    const sphereGeo1 = new THREE.SphereGeometry(2.5, 24, 24);
    const sphereMat1 = new THREE.MeshBasicMaterial({ color: 0x2a2a4e, wireframe: true, transparent: true, opacity: 0.04 });
    const coreMesh = new THREE.Mesh(sphereGeo1, sphereMat1);
    scene.add(coreMesh);

    const sphereGeo2 = new THREE.SphereGeometry(12, 32, 32);
    const sphereMat2 = new THREE.MeshBasicMaterial({ color: 0xff4b0b, wireframe: true, transparent: true, opacity: 0.025 });
    scene.add(new THREE.Mesh(sphereGeo2, sphereMat2));

    // 5. 3D Card Meshes (Enhanced Size & Brightness)
    const textureLoader = new THREE.TextureLoader();
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const cardMeshes: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; card: Card }[] = [];
    const numCards = cardsData.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    cardsData.forEach((card, i) => {
      const y = 1 - (i / (numCards - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const layerRadius = 12.5 + (i % 3) * 4.2;

      const px = Math.cos(theta) * radiusAtY * layerRadius;
      const py = y * layerRadius;
      const pz = Math.sin(theta) * radiusAtY * layerRadius;

      // Larger, crystal-clear 3D plane (3.6 x 4.8)
      const geometry = new THREE.PlaneGeometry(3.6, 4.8);
      const texture = textureLoader.load(card.imageUrl);
      texture.colorSpace = THREE.SRGBColorSpace;

      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.15,
        metalness: 0.05,
        emissive: new THREE.Color(0x000000),
      });

      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(px, py, pz);
      mesh.lookAt(0, 0, 0);

      mesh.userData = { card, originalScale: 1 };
      cardGroup.add(mesh);
      cardMeshes.push({ mesh, mat, card });
    });

    // 6. Hover Light Shadow Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMeshInfo: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial } | null = null;

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardGroup.children);

      if (intersects.length > 0) {
        const topMesh = intersects[0].object as THREE.Mesh;
        const found = cardMeshes.find((c) => c.mesh === topMesh);

        if (found && hoveredMeshInfo?.mesh !== topMesh) {
          // Reset previous hovered mesh
          if (hoveredMeshInfo) {
            hoveredMeshInfo.mesh.scale.set(1, 1, 1);
            hoveredMeshInfo.mat.emissive.setHex(0x000000);
          }

          // Hover new mesh with glowing light shadow
          hoveredMeshInfo = found;
          hoveredMeshInfo.mesh.scale.set(1.24, 1.24, 1.24);
          hoveredMeshInfo.mat.emissive.setHex(0x331000);

          // Position dynamic point light right behind the card for shadow glow
          hoverLight.position.copy(topMesh.position);
          hoverLight.intensity = 4.5;

          document.body.style.cursor = "pointer";
        }
      } else {
        if (hoveredMeshInfo) {
          hoveredMeshInfo.mesh.scale.set(1, 1, 1);
          hoveredMeshInfo.mat.emissive.setHex(0x000000);
          hoveredMeshInfo = null;
          hoverLight.intensity = 0;
        }
        document.body.style.cursor = "auto";
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cardGroup.children);

      if (intersects.length > 0) {
        const topIntersect = intersects[0].object as THREE.Mesh;
        if (topIntersect.userData?.card) {
          setSelectedCard(topIntersect.userData.card);
        }
      }
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onClick);

    // 7. Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      starfield.rotation.y += 0.00025;
      starfield.rotation.x += 0.0001;
      cardGroup.rotation.y += 0.00075;
      coreMesh.rotation.y -= 0.002;

      // Keep cards facing camera for clear view
      cardMeshes.forEach(({ mesh }) => {
        mesh.quaternion.copy(camera.quaternion);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onClick);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      sphereGeo1.dispose();
      sphereMat1.dispose();
      sphereGeo2.dispose();
      sphereMat2.dispose();
      document.body.style.cursor = "auto";
    };
  }, []);

  // Compute text opacities and scales based on scrollProgress (0 to 1)
  // Phase 1: progress 0.0 to 0.38 (MINGLER.AI)
  // Phase 2: progress 0.38 to 0.85 (TOUT EST RELIÉ with Zoom Out)
  const phase1Opacity = Math.max(1 - scrollProgress * 3.2, 0);
  const phase1Scale = 1 + scrollProgress * 0.4;
  const phase1Blur = scrollProgress * 25;

  const phase2Active = scrollProgress > 0.25;
  const phase2Raw = Math.max((scrollProgress - 0.28) / 0.55, 0); // 0 to 1
  
  // Phase 2 enters (0 to 0.5) then zooms up & fades out (0.5 to 1)
  let phase2Opacity = 0;
  let phase2Scale = 1;
  let phase2Blur = 0;

  if (scrollProgress >= 0.28 && scrollProgress <= 0.85) {
    if (scrollProgress < 0.52) {
      phase2Opacity = Math.min((scrollProgress - 0.28) / 0.18, 1);
      phase2Scale = 0.88 + (scrollProgress - 0.28) * 0.5;
      phase2Blur = 0;
    } else {
      phase2Opacity = Math.max(1 - (scrollProgress - 0.52) / 0.28, 0);
      phase2Scale = 1.0 + (scrollProgress - 0.52) * 1.5; // Smooth Zoom Out Disappearance
      phase2Blur = (scrollProgress - 0.52) * 35;
    }
  }

  return (
    <div className="relative w-full h-screen bg-[#040406] overflow-hidden select-none">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* CENTERED HERO ANIMATED TEXT OVERLAY */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none w-full max-w-6xl px-4 flex flex-col items-center justify-center min-h-[260px]">
        {/* PHASE 1: "MINGLER.AI" Typewriter Animation (Majuscule) */}
        <div
          className="transition-all duration-300 ease-out flex flex-col items-center justify-center"
          style={{
            opacity: phase1Opacity,
            transform: `scale(${phase1Scale})`,
            filter: `blur(${phase1Blur}px)`,
            display: phase1Opacity <= 0.01 ? "none" : "flex",
          }}
        >
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-3 uppercase whitespace-nowrap drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
            {typedText.slice(0, 7)}
            <span className="text-[#ff4b0b]">{typedText.slice(7)}</span>
            <span className="animate-pulse text-[#ff4b0b] ml-1">|</span>
          </h1>
          <p
            className={`text-base sm:text-2xl font-semibold text-neutral-200 transition-opacity duration-700 ${
              isTypingDone ? "opacity-95" : "opacity-0"
            }`}
          >
            Chaque signal devient une <em className="not-italic text-white underline decoration-[#ff4b0b] decoration-3 underline-offset-6">action.</em>
          </p>
        </div>

        {/* PHASE 2: On Scroll -> "UNE MÉMOIRE. TOUT EST RELIÉ" (Zoom Out Disappearance) */}
        {phase2Active && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-200 ease-out"
            style={{
              opacity: phase2Opacity,
              transform: `scale(${phase2Scale})`,
              filter: `blur(${phase2Blur}px)`,
              display: phase2Opacity <= 0.01 ? "none" : "flex",
            }}
          >
            <small className="text-[12px] sm:text-[14px] font-black font-mono tracking-[0.3em] text-[#ff4b0b] uppercase mb-2 drop-shadow-md">
              UNE MÉMOIRE.
            </small>
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase whitespace-nowrap drop-shadow-[0_0_50px_rgba(255,75,11,0.75)]">
              TOUT EST RELIÉ
            </h2>
            <p className="text-xs sm:text-base text-neutral-300 font-semibold max-w-lg mt-4 tracking-wide">
              Neuf agents, +20M profils et une mémoire unifiée pour orchestrer votre croissance.
            </p>
          </div>
        )}
      </div>

      {/* Selected Card Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in-0 duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCard(null);
          }}
        >
          <div className="relative w-full max-w-sm rounded-2xl bg-[#121214] border border-neutral-800 p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <NavIcon name="X" className="h-6 w-6" />
            </button>

            <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 shadow-inner">
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.alt}
                className="h-full w-full object-cover"
              />
            </div>

            <h3 className="text-xl font-bold text-white text-center mb-4">{selectedCard.title}</h3>

            <div className="flex gap-2">
              <a
                href={selectedCard.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ff4b0b] text-white font-bold text-sm hover:bg-[#a62800] transition-colors"
              >
                <NavIcon name="ArrowRight" className="h-4 w-4" />
                <span>Découvrir</span>
              </a>
              <button
                type="button"
                onClick={() => setIsFavorited((v) => !v)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-800 transition-colors ${
                  isFavorited ? "bg-[#ff4b0b] text-white" : "bg-neutral-900 text-neutral-300 hover:text-white"
                }`}
              >
                <NavIcon name="Sparkles" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white text-center pointer-events-none">
        <a
          href="#diagnostic"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-neutral-200 backdrop-blur-md transition-all hover:border-[#ff4b0b] hover:text-white hover:bg-[#ff4b0b]/25"
        >
          <span>Entrer dans Mingler</span>
          <NavIcon name="ArrowRight" className="h-3.5 w-3.5 text-[#ff4b0b] rotate-90" />
        </a>
      </div>
    </div>
  );
}
