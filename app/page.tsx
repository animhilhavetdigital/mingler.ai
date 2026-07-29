"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Navbar } from "@/components/nav/Navbar";
import { DecisiveTest } from "@/components/sections/DecisiveTest";
import { HdDataTimeline } from "@/components/sections/HdDataTimeline";
import StellarCardGallerySingle from "@/components/ui/3d-image-gallery";
import WaterRippleImage from "@/components/ui/water-ripple-image";
import { SitePreloader } from "@/components/ui/SitePreloader";

const ecosystem = [
  {
    id: "mos",
    name: "MOS Marketing",
    short: "MOS",
    label: "Orchestrer l’acquisition",
    description:
      "Neuf agents spécialisés transforment chaque signal marché en stratégie, contenus, diffusion et décisions mesurables.",
    stat: "9 agents",
  },
  {
    id: "data",
    name: "HD Data",
    short: "DATA",
    label: "Trouver les bonnes personnes",
    description:
      "Une base de plus de 20 millions de profils à filtrer, acheter puis activer directement dans iACRM ou ReelSend.",
    stat: "+20M profils",
  },
  {
    id: "network",
    name: "HD Affiliation",
    short: "LINK",
    label: "Activer votre réseau",
    description:
      "Affiliés, commerciaux et clients recommandent. Mingler attribue chaque conversion et automatise les récompenses.",
    stat: "100% attribué",
  },
  {
    id: "iacrm",
    name: "iACRM",
    short: "CRM",
    label: "Ne jamais perdre le contexte",
    description:
      "La mémoire centrale de Mingler qualifie, score et active chaque relation, du premier signal jusqu’à la fidélisation.",
    stat: "360° client",
  },
];

const agents = [
  { id: "market", title: "Étude marché & Data" },
  { id: "strategy", title: "Stratégie & SCP" },
  { id: "orchestrator", title: "Concepteur opérationnel & orchestrateur éditorial" },
  { id: "ads", title: "Ads Manager", branch: true },
  { id: "content", title: "Création de contenu multimédia", branch: true },
  { id: "email", title: "Email Marketing", branch: true },
  { id: "community", title: "Community Manager", branch: true },
  { id: "publishing", title: "Diffusion & Publishing" },
  { id: "performance", title: "Performance & Décision" },
];



const metrics = [
  ["+10K", "entreprises accompagnées"],
  ["+25M", "leads qualifiés"],
  ["×3", "ROI moyen"],
  ["−70%", "temps de gestion"],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.92 });
    let frame = 0;
    const animateScroll = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animateScroll);
    };
    frame = requestAnimationFrame(animateScroll);

    const progressBar = document.querySelector<HTMLElement>(".scroll-progress i");
    const updateProgress = ({ progress }: { progress: number }) => {
      if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
      ScrollTrigger.update();
    };
    lenis.on("scroll", updateProgress);

    const context = gsap.context(() => {
      gsap.timeline({ delay: 1.05, defaults: { ease: "power4.out" } })
        .from(".site-header", { y: -90, opacity: 0, duration: 1 })
      const desktop = gsap.matchMedia();
      desktop.add("(min-width: 900px)", () => {

        const hdStage = document.querySelector<HTMLElement>(".hd-stage-current");
        const hdSteps = gsap.utils.toArray<HTMLElement>(".hd-step-progress i");
        const hdParticles = gsap.utils.toArray<HTMLElement>(".hd-particle");
        const setHdStage = (progress: number) => {
          const stage = Math.min(5, Math.floor(progress * 5) + 1);
          if (hdStage) hdStage.textContent = String(stage).padStart(2, "0");
          hdSteps.forEach((step, index) => step.classList.toggle("is-active", index < stage));
        };
        const setHdFullscreen = (active: boolean) => rootRef.current?.classList.toggle("hd-stage-active", active);

        gsap.set(hdParticles, {
          x: (index) => ((((index * 73) % 101) / 100) - 0.5) * window.innerWidth * 1.06,
          y: (index) => ((((index * 47) % 97) / 96) - 0.5) * window.innerHeight * 0.82,
          scale: (index) => 0.55 + (index % 5) * 0.18,
        });
        gsap.set(".hd-copy", { autoAlpha: 0, y: 42 });
        gsap.set(".hd-copy-1", { autoAlpha: 1, y: 0 });
        gsap.set(".hd-filter-panel, .hd-result-count, .hd-profile-card, .hd-data-pack, .hd-route-segment, .hd-route-junction, .hd-route-pulse, .hd-destination, .hd-final-cta", { autoAlpha: 0 });
        gsap.set(".hd-result-value", { autoAlpha: 0, y: 24 });
        gsap.set(".hd-result-value-1", { autoAlpha: 1, y: 0 });
        gsap.set(".hd-route-x", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".hd-route-y", { scaleY: 0, transformOrigin: "center top" });

        const hdDataStory = gsap.timeline({
          scrollTrigger: {
            trigger: ".hd-data-sticky",
            start: "top top",
            end: "+=650%",
            pin: ".hd-data-sticky",
            scrub: 1.05,
            anticipatePin: 1,
            onEnter: () => setHdFullscreen(true),
            onEnterBack: () => setHdFullscreen(true),
            onLeave: () => setHdFullscreen(false),
            onLeaveBack: () => setHdFullscreen(false),
            onUpdate: (self) => setHdStage(self.progress),
          },
        });

        hdDataStory
          .from(".hd-data-number", { autoAlpha: 0, scale: 0.48, filter: "blur(20px)", duration: 0.5, ease: "power3.out" }, 0)
          .from(hdParticles, { autoAlpha: 0, scale: 0, stagger: { amount: 0.62, from: "random" }, duration: 0.48 }, 0.02)
          .from(".hd-lens", { scale: 0.2, autoAlpha: 0, rotate: -80, duration: 0.5 }, 0.18)
          .to(".hd-copy-1", { autoAlpha: 0, y: -36, duration: 0.26 }, 0.78)
          .to(".hd-copy-2", { autoAlpha: 1, y: 0, duration: 0.36 }, 0.94)
          .to(".hd-data-number", { scale: 0.54, autoAlpha: 0.12, duration: 0.45 }, 0.88)
          .to(".hd-filter-panel", { autoAlpha: 1, y: 0, duration: 0.34 }, 1)
          .from(".hd-filter-chip", { autoAlpha: 0, x: 38, stagger: 0.14, duration: 0.26 }, 1.06)
          .to(".hd-result-count", { autoAlpha: 1, scale: 1, duration: 0.28 }, 1.12)
          .to(".hd-result-value-1", { autoAlpha: 0, y: -22, duration: 0.16 }, 1.3)
          .to(".hd-result-value-2", { autoAlpha: 1, y: 0, duration: 0.2 }, 1.36)
          .to(".hd-result-value-2", { autoAlpha: 0, y: -22, duration: 0.16 }, 1.56)
          .to(".hd-result-value-3", { autoAlpha: 1, y: 0, duration: 0.2 }, 1.62)
          .to(".hd-result-value-3", { autoAlpha: 0, y: -22, duration: 0.16 }, 1.82)
          .to(".hd-result-value-4", { autoAlpha: 1, y: 0, duration: 0.22 }, 1.88)
          .to(".hd-particle:not(.is-selected)", { autoAlpha: 0.055, scale: 0.35, duration: 0.7 }, 1.14)
          .to(".hd-particle.is-selected", { backgroundColor: "#ff5a16", boxShadow: "0 0 18px rgba(255,75,11,.95)", scale: 1.75, duration: 0.65 }, 1.18)
          .to(".hd-lens", { rotate: 34, scale: 1.08, duration: 1.05, ease: "none" }, 1.04)
          .to(".hd-copy-2", { autoAlpha: 0, y: -36, duration: 0.25 }, 2.18)
          .to(".hd-copy-3", { autoAlpha: 1, y: 0, duration: 0.34 }, 2.34)
          .to(".hd-filter-panel", { autoAlpha: 0.28, x: 34, duration: 0.32 }, 2.24)
          .to(".hd-profile-card", { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.11, duration: 0.34, ease: "back.out(1.2)" }, 2.42)
          .to(".hd-particle.is-selected", { x: 0, y: 0, autoAlpha: 0.18, scale: 0.45, stagger: { amount: 0.45, from: "random" }, duration: 0.58 }, 2.36)
          .to(".hd-copy-3", { autoAlpha: 0, y: -36, duration: 0.25 }, 3.16)
          .to(".hd-copy-4", { autoAlpha: 1, y: 0, duration: 0.34 }, 3.32)
          .to(".hd-profile-card", { autoAlpha: 0, y: 36, scale: 0.18, stagger: 0.06, duration: 0.28 }, 3.24)
          .to(".hd-filter-panel, .hd-result-count", { autoAlpha: 0, duration: 0.24 }, 3.18)
          .to(".hd-data-pack", { autoAlpha: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 0.48, ease: "back.out(1.4)" }, 3.42)
          .from(".hd-pack-row", { scaleX: 0, transformOrigin: "left center", stagger: 0.06, duration: 0.24 }, 3.55)
          .to(".hd-copy-4", { autoAlpha: 0, y: -36, duration: 0.25 }, 4.12)
          .to(".hd-copy-5", { autoAlpha: 1, y: 0, duration: 0.34 }, 4.28)
          .to(".hd-data-pack-shell", { xPercent: -32, duration: 0.52, ease: "power3.inOut" }, 4.18)
          .to(".hd-data-pack", { scale: 0.72, rotateY: -10, duration: 0.52, ease: "power3.inOut" }, 4.18)
          .to(".hd-route-trunk", { autoAlpha: 1, scaleX: 1, duration: 0.3 }, 4.44)
          .to(".hd-route-spine", { autoAlpha: 1, scaleY: 1, duration: 0.28 }, 4.62)
          .to(".hd-route-arm", { autoAlpha: 1, scaleX: 1, stagger: 0.08, duration: 0.26 }, 4.76)
          .to(".hd-route-junction", { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, 4.66)
          .to(".hd-destination", { autoAlpha: 1, x: 0, stagger: 0.14, duration: 0.38, ease: "back.out(1.3)" }, 4.86)
          .to(".hd-route-pulse", { autoAlpha: 1, duration: 0.22 }, 5.04)
          .to(".hd-final-cta", { autoAlpha: 1, y: 0, duration: 0.3 }, 5.08)
          .to({}, { duration: 0.62 });

        const mosStage = document.querySelector<HTMLElement>(".mos-stage-current");
        const mosDots = gsap.utils.toArray<HTMLElement>(".mos-step-dots i");
        const setMosStage = (progress: number) => {
          const stage = Math.min(6, Math.floor(progress * 6) + 1);
          if (mosStage) mosStage.textContent = String(stage).padStart(2, "0");
          mosDots.forEach((dot, index) => dot.classList.toggle("is-active", index < stage));
        };
        const setMosFullscreen = (active: boolean) => rootRef.current?.classList.toggle("mos-stage-active", active);

        gsap.set(".flow-agent, .flow-trigger, .flow-wire, .flow-feedback, .flow-legend", { autoAlpha: 0 });
        gsap.set(".flow-agent", { y: 28, scale: 0.84 });
        gsap.set(".flow-wire-x", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".flow-wire-y", { scaleY: 0, transformOrigin: "top center" });

        const mosStory = gsap.timeline({
          scrollTrigger: {
            trigger: ".mos-flow-sticky",
            start: "top top",
            end: "+=600%",
            pin: ".mos-flow-sticky",
            scrub: 1,
            anticipatePin: 1,
            onEnter: () => setMosFullscreen(true),
            onEnterBack: () => setMosFullscreen(true),
            onLeave: () => setMosFullscreen(false),
            onLeaveBack: () => setMosFullscreen(false),
            onUpdate: (self) => setMosStage(self.progress),
          },
        });
        mosStory
          .to(".flow-trigger", { autoAlpha: 1, y: 0, duration: 0.22 }, 0)
          .to(".agent-market", { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.35)" }, 0.18)
          .to(".wire-entry-a", { autoAlpha: 1, scaleX: 1, duration: 0.28 }, 0.74)
          .to(".agent-strategy", { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.35)" }, 0.9)
          .to(".wire-entry-b", { autoAlpha: 1, scaleX: 1, duration: 0.28 }, 1.46)
          .to(".agent-orchestrator", { autoAlpha: 1, y: 0, scale: 1, duration: 0.46, ease: "back.out(1.35)" }, 1.62)
          .to(".wire-entry-c", { autoAlpha: 1, scaleX: 1, duration: 0.28 }, 2.16)
          .to(".wire-branch-spine", { autoAlpha: 1, scaleY: 1, duration: 0.42 }, 2.34)
          .to(".wire-branch", { autoAlpha: 1, scaleX: 1, stagger: 0.1, duration: 0.25 }, 2.48)
          .to(".flow-agent-branch", { autoAlpha: 1, y: 0, scale: 1, stagger: 0.18, duration: 0.36, ease: "back.out(1.25)" }, 2.62)
          .to(".wire-merge-spine", { autoAlpha: 1, scaleY: 1, duration: 0.4 }, 3.54)
          .to(".wire-merge", { autoAlpha: 1, scaleX: 1, stagger: 0.07, duration: 0.22 }, 3.68)
          .to(".agent-publishing", { autoAlpha: 1, y: 0, scale: 1, duration: 0.44, ease: "back.out(1.35)" }, 4.04)
          .to(".wire-output", { autoAlpha: 1, scaleX: 1, duration: 0.3 }, 4.6)
          .to(".agent-performance", { autoAlpha: 1, y: 0, scale: 1, duration: 0.44, ease: "back.out(1.35)" }, 4.78)
          .to(".flow-feedback", { autoAlpha: 1, scaleX: 1, transformOrigin: "right center", stagger: 0.12, duration: 0.38 }, 5.18)
          .to(".flow-legend", { autoAlpha: 1, y: 0, duration: 0.24 }, 5.34)
          .to(".agent-orchestrator", { boxShadow: "0 0 80px rgba(255,75,11,.48)", duration: 0.34 }, 5.36);

        // MOS Section Scroll Entry & Animated Text Reveal
        gsap.from(".mos-kicker", {
          scrollTrigger: {
            trigger: ".mos-intro",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
        });

        gsap.from(".mos-title", {
          scrollTrigger: {
            trigger: ".mos-intro",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
        });

        gsap.from(".mos-desc", {
          scrollTrigger: {
            trigger: ".mos-intro",
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
        });

        gsap.from(".mos-cta", {
          scrollTrigger: {
            trigger: ".mos-intro",
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
          autoAlpha: 0,
          x: -25,
          duration: 0.7,
          delay: 0.3,
          ease: "power3.out",
        });

        gsap.from(".mos-intro-right", {
          scrollTrigger: {
            trigger: ".mos-intro",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          autoAlpha: 0,
          scale: 0.92,
          y: 45,
          duration: 1.1,
          ease: "power3.out",
        });

        const iacrmStory = gsap.timeline({
          scrollTrigger: {
            trigger: ".iacrm-section",
            start: "top top",
            end: "+=360%",
            pin: ".iacrm-sticky",
            scrub: 1.05,
            anticipatePin: 1,
          },
        });
        iacrmStory
          .from(".iacrm-copy", { xPercent: -16, opacity: 0.08, duration: 0.16 }, 0)
          .fromTo(".cube", { rotationX: -18, rotationY: 28, scale: 1 }, { rotationX: 335, rotationY: 405, scale: 1, duration: 1.04, ease: "none" }, 0)
          .from(".score-orbit", { opacity: 0, rotate: -90, duration: 0.14 }, 0)
          .fromTo(".level-suspect", { y: 110, opacity: 0, scaleX: 0.72 }, { y: 0, opacity: 1, scaleX: 1, duration: 0.1, ease: "power2.out" }, 0.05)
          .to(".level-suspect", { borderColor: "rgba(255,75,11,.8)", duration: 0.06 }, 0.13)
          .fromTo(".level-cold", { y: 110, opacity: 0, scaleX: 0.72 }, { y: 0, opacity: 1, scaleX: 1, duration: 0.1, ease: "power2.out" }, 0.22)
          .to(".level-cold", { borderColor: "rgba(255,75,11,.8)", duration: 0.06 }, 0.3)
          .fromTo(".level-warm", { y: 110, opacity: 0, scaleX: 0.72 }, { y: 0, opacity: 1, scaleX: 1, duration: 0.1, ease: "power2.out" }, 0.39)
          .to(".level-warm", { borderColor: "rgba(255,75,11,.8)", duration: 0.06 }, 0.47)
          .fromTo(".level-hot", { y: 110, opacity: 0, scaleX: 0.72 }, { y: 0, opacity: 1, scaleX: 1, duration: 0.1, ease: "power2.out" }, 0.56)
          .to(".level-hot", { borderColor: "rgba(255,75,11,.8)", duration: 0.06 }, 0.64)
          .fromTo(".level-client", { y: 110, opacity: 0, scaleX: 0.72 }, { y: 0, opacity: 1, scaleX: 1, duration: 0.1, ease: "power2.out" }, 0.73)
          .to(".level-client", { borderColor: "rgba(255,75,11,.95)", duration: 0.06 }, 0.81)
          .from(".score-readout > div", { x: -50, opacity: 0, duration: 0.12, stagger: 0.045 }, 0.82)
          .fromTo(".score-value-primary", { textContent: 0 }, { textContent: 89, snap: { textContent: 1 }, duration: 0.16 }, 0.84)
          .fromTo(".score-meter i", { scaleX: 0 }, { scaleX: 0.89, transformOrigin: "left center", duration: 0.16 }, 0.84)
          .from(".client-signal", { y: 60, opacity: 0, scale: 0.7, duration: 0.12 }, 0.99)
          .to(".pyramid-layer:not(.level-client)", { opacity: 0.3, duration: 0.1, stagger: 0.018 }, 1.03)
          .to(".level-client", { backgroundColor: "#ff4b0b", color: "#fff", scale: 1.06, duration: 0.1 }, 1.04)
          .to(".cube", { rotationX: 380, rotationY: 520, scale: 1.08, duration: 0.12 }, 1.04);

        gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, index) => {
          gsap.from(card, {
            y: 180,
            rotate: index % 2 ? 4 : -4,
            scale: 0.9,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", end: "top 48%", scrub: 0.7 },
          });
        });

        return () => {
          setHdFullscreen(false);
          setMosFullscreen(false);
        };
      });

      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
        gsap.from(element, {
          y: 80,
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      gsap.to(".marquee-track", {
        xPercent: -45,
        ease: "none",
        scrollTrigger: { trigger: ".motion-marquee", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(".contact-rings", { scale: 0.45, rotate: -24 }, {
        scale: 1.28,
        rotate: 18,
        ease: "none",
        scrollTrigger: { trigger: ".contact-section", start: "top bottom", end: "center center", scrub: 1 },
      });

      return () => desktop.revert();
    }, rootRef);

    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
      lenis.off("scroll", updateProgress);
      lenis.destroy();
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef}>
      <SitePreloader />
      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <Navbar />

      <section id="top" className="relative w-full h-[250vh]">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <StellarCardGallerySingle />
        </div>
      </section>

      <DecisiveTest />

      <HdDataTimeline />

      <div className="motion-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>ACQUÉRIR</span><i>✦</i><span>COMPRENDRE</span><i>✦</i><span>ACTIVER</span><i>✦</i><span>MESURER</span><i>✦</i>
          <span>ACQUÉRIR</span><i>✦</i><span>COMPRENDRE</span><i>✦</i><span>ACTIVER</span><i>✦</i><span>MESURER</span><i>✦</i>
          <span>ACQUÉRIR</span><i>✦</i><span>COMPRENDRE</span><i>✦</i><span>ACTIVER</span><i>✦</i><span>MESURER</span><i>✦</i>
          <span>ACQUÉRIR</span><i>✦</i><span>COMPRENDRE</span><i>✦</i><span>ACTIVER</span><i>✦</i><span>MESURER</span><i>✦</i>
        </div>
      </div>

      <section className="mos-section" id="mos">
        <div className="mos-intro grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 lg:gap-16 items-center py-20 px-6 sm:px-12 lg:px-20 w-full max-w-[1800px] mx-auto">
          <div className="flex flex-col justify-center max-w-2xl">
            <div className="section-kicker mos-kicker">MOS Marketing</div>
            <div className="mos-heading mt-4">
              <h2 className="mos-title">Votre marketing<br /><span className="text-[#ff4b0b]">prend vie.</span></h2>
              <div className="mt-4">
                <p className="mos-desc text-base sm:text-lg text-neutral-600 max-w-lg leading-relaxed">
                  Neuf agents spécialisés transforment<br />
                  chaque signal marché en stratégie, contenus,<br />
                  diffusion et décisions mesurables.
                </p>
                <a href="#contact" className="mos-cta mt-6 inline-flex items-center gap-3 text-[#ff4b0b] font-extrabold border-b-2 border-[#ff4b0b] pb-1 hover:opacity-80 transition-opacity">Découvrir le MOS <Arrow /></a>
              </div>
            </div>
          </div>

          <div className="mos-intro-right w-full h-[600px] lg:h-[780px]">
            <WaterRippleImage
              blueish={0.35}
              scale={6.5}
              illumination={0.16}
              surfaceDistortion={0.04}
              waterDistortion={0.025}
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1400"
            />
          </div>
        </div>

        <div className="mos-flow-sticky">
          <div className="mos-flow-shell">
            <div className="console-top">
              <span><i /> MOS / WORKFLOW ACTIF</span>
              <span className="mos-stage-label">ÉTAPE <strong className="mos-stage-current">01</strong><b>/06</b></span>
            </div>
            <div className="mos-flow-viewport">
              <div className="mos-flow-canvas" aria-label="Workflow des neuf agents du Marketing Operating System">
                <div className="flow-trigger"><span>⚡</span><div><small>TRIGGER</small><strong>Nouveau signal marché</strong></div><b>LIVE</b></div>

                <div className="flow-wires" aria-hidden="true">
                  <i className="flow-wire flow-wire-x wire-entry wire-entry-a" />
                  <i className="flow-wire flow-wire-x wire-entry wire-entry-b" />
                  <i className="flow-wire flow-wire-x wire-entry wire-entry-c" />
                  <i className="flow-wire flow-wire-y wire-branch-spine" />
                  <i className="flow-wire flow-wire-x wire-branch wire-branch-a" />
                  <i className="flow-wire flow-wire-x wire-branch wire-branch-b" />
                  <i className="flow-wire flow-wire-x wire-branch wire-branch-c" />
                  <i className="flow-wire flow-wire-x wire-branch wire-branch-d" />
                  <i className="flow-wire flow-wire-y wire-merge-spine" />
                  <i className="flow-wire flow-wire-x wire-merge wire-merge-a" />
                  <i className="flow-wire flow-wire-x wire-merge wire-merge-b" />
                  <i className="flow-wire flow-wire-x wire-merge wire-merge-c" />
                  <i className="flow-wire flow-wire-x wire-merge wire-merge-d" />
                  <i className="flow-wire flow-wire-x wire-merge wire-merge-output" />
                  <i className="flow-wire flow-wire-x wire-output" />
                  <i className="flow-feedback feedback-outer" />
                  <i className="flow-feedback feedback-inner" />
                </div>

                {agents.map(({ id, title, branch }) => (
                  <article className={`flow-agent agent-${id}${branch ? " flow-agent-branch" : ""}${id === "orchestrator" ? " is-orchestrator" : ""}`} key={id}>
                    <h3>{title}</h3>
                  </article>
                ))}

                <div className="flow-legend"><span><i /> Signal transmis</span><span><i /> Boucle d’apprentissage</span></div>
              </div>
            </div>
            <div className="mos-step-dots" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => <i className={index === 0 ? "is-active" : ""} key={index} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="iacrm-section" id="iacrm">
        <div className="iacrm-grid" aria-hidden="true" />
        <div className="iacrm-sticky">
          <div className="iacrm-copy">
            <div className="section-kicker light"><span>04</span> iACRM / Scoring intelligent</div>
            <h2>Du premier signal<br />au <span>meilleur client.</span></h2>
            <p>iACRM rassemble chaque interaction, mesure le potentiel et fait progresser le contact vers la prochaine action utile.</p>
            <div className="score-readout">
              <div><small>SCORE GLOBAL</small><strong><span className="score-value-primary">89</span><sup>/100</sup></strong></div>
              <div><small>SEGMENT</small><strong>CLIENT A</strong></div>
              <div><small>PROCHAINE ACTION</small><strong>UPSELL</strong></div>
            </div>
            <div className="score-meter"><i /></div>
          </div>

          <div className="iacrm-visual" aria-label="Pyramide de qualification et cube 3D de scoring client">
            <div className="score-pyramid">
              <div className="pyramid-layer level-suspect"><span>01</span><b>SUSPECT</b><small>signal détecté</small></div>
              <div className="pyramid-layer level-cold"><span>02</span><b>PROSPECT FROID</b><small>profil reconnu</small></div>
              <div className="pyramid-layer level-warm"><span>03</span><b>PROSPECT TIÈDE</b><small>intérêt mesuré</small></div>
              <div className="pyramid-layer level-hot"><span>04</span><b>PROSPECT CHAUD</b><small>intention forte</small></div>
              <div className="pyramid-layer level-client"><span>05</span><b>CLIENT</b><small>valeur activée</small></div>
            </div>

            <div className="score-orbit"><i /><i /><i /></div>
            <div className="cube-wrap">
              <div className="cube">
                <div className="cube-face cube-front"><small>RÉCENCE</small><strong>92</strong></div>
                <div className="cube-face cube-back"><small>FRÉQUENCE</small><strong>78</strong></div>
                <div className="cube-face cube-right"><small>MONTANT</small><strong>86</strong></div>
                <div className="cube-face cube-left"><small>FIT</small><strong>94</strong></div>
                <div className="cube-face cube-top"><small>LEAD</small><strong>A</strong></div>
                <div className="cube-face cube-bottom"><small>CLV</small><strong>4.8K</strong></div>
              </div>
              <div className="cube-shadow" />
            </div>

            <div className="client-signal">
              <i>MK</i><span><small>CONTACT QUALIFIÉ</small><strong>Marie K. — Client A</strong></span><b>89</b>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section" id="produits">
        <div className="section-kicker"><span>05</span> Les produits</div>
        <div className="products-title gsap-reveal">
          <h2>Chaque brique est forte.<br />Ensemble, elles deviennent <span>inarrêtables.</span></h2>
        </div>
        <div className="product-grid">
          {ecosystem.map((item, index) => (
            <article className={`product-card card-${index + 1}`} key={item.id}>
              <div className="card-index">0{index + 1}</div>
              <div className="card-orbit"><i /><span>{item.short}</span></div>
              <div className="card-copy">
                <span>{item.stat}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <a href="#contact" aria-label={`Découvrir ${item.name}`}>Découvrir <Arrow diagonal /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-section" id="impact">
        <div className="impact-copy">
          <div className="section-kicker light"><span>06</span> L’impact</div>
          <h2>Moins de friction.<br /><span>Plus de mouvement.</span></h2>
          <p>Mingler donne à chaque équipe une vision commune et une prochaine action claire.</p>
        </div>
        <div className="metric-grid">
          {metrics.map(([value, label], index) => (
            <article key={label}>
              <span>0{index + 1}</span>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-rings" aria-hidden="true"><i /><i /><i /></div>
        <p className="eyebrow"><i /> Votre croissance est déjà là</p>
        <h2>Il suffit de<br /><span>tout relier.</span></h2>
        <p>Voyez comment Mingler transforme vos signaux dispersés en décisions coordonnées.</p>
        <a className="button button-dark" href="mailto:hello@mingler.ai">Demander une démo <Arrow diagonal /></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true" />
          <span>mingler</span><b>.ai</b>
        </a>
        <p>L’intelligence qui relie acquisition, relation et croissance.</p>
        <div><a href="#diagnostic">Diagnostic</a><a href="#hd-data">HD Data</a><a href="#mos">MOS</a><a href="#produits">Produits</a></div>
        <span>© 2026 Mingler.ai</span>
      </footer>
    </main>
  );
}
