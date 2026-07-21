"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import dynamic from "next/dynamic";

const MinglerScene = dynamic(() => import("./MinglerScene"), { ssr: false });

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
      "Des données enrichies par persona deviennent des prospects prioritaires, prêts à entrer dans votre tunnel commercial.",
    stat: "1 profil unifié",
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

const diagnosticQuestions = [
  {
    number: "01",
    signal: "ORIGINE",
    question: "Savez-vous exactement d’où viennent vos meilleurs clients ?",
    insight: "Pas seulement le canal : la campagne, le message et le premier signal qui ont créé la relation.",
  },
  {
    number: "02",
    signal: "ACTION",
    question: "Chaque prospect reçoit-il automatiquement la bonne action au bon moment ?",
    insight: "Sans attendre qu’une personne rapproche manuellement les informations et décide de relancer.",
  },
  {
    number: "03",
    signal: "MÉMOIRE",
    question: "Avez-vous une seule histoire client, ou des informations dispersées dans plusieurs outils ?",
    insight: "Une histoire que marketing, vente et relation client peuvent reprendre sans la reconstruire.",
  },
  {
    number: "04",
    signal: "APPRENTISSAGE",
    question: "Pouvez-vous expliquer pourquoi un client achète… ou abandonne ?",
    insight: "Et transformer cette réponse en une prochaine décision plus précise pour toute l’équipe.",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animation = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0.67, y: 0.44 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointer = (event: PointerEvent) => {
      pointer.x += (event.clientX / window.innerWidth - pointer.x) * 0.25;
      pointer.y += (event.clientY / window.innerHeight - pointer.y) * 0.25;
    };

    const points = Array.from({ length: 58 }, (_, index) => ({
      angle: (Math.PI * 2 * index) / 58,
      radius: 130 + ((index * 47) % 290),
      speed: 0.000045 + (index % 7) * 0.000006,
      size: 0.7 + (index % 4) * 0.42,
      opacity: 0.12 + (index % 5) * 0.045,
    }));

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      const cx = width * pointer.x;
      const cy = height * pointer.y;

      const glow = context.createRadialGradient(cx, cy, 10, cx, cy, Math.min(width, height) * 0.56);
      glow.addColorStop(0, "rgba(255, 75, 11, 0.17)");
      glow.addColorStop(0.42, "rgba(255, 145, 91, 0.07)");
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      points.forEach((point, index) => {
        const a = point.angle + (reduced ? 0 : time * point.speed);
        const orbitX = cx + Math.cos(a) * point.radius * 1.45;
        const orbitY = cy + Math.sin(a) * point.radius * 0.58;
        context.beginPath();
        context.fillStyle = `rgba(255, 75, 11, ${point.opacity})`;
        context.arc(orbitX, orbitY, point.size, 0, Math.PI * 2);
        context.fill();

        if (index % 9 === 0) {
          context.beginPath();
          context.strokeStyle = "rgba(255, 75, 11, .055)";
          context.lineWidth = 1;
          context.ellipse(cx, cy, point.radius * 1.45, point.radius * 0.58, 0, 0, Math.PI * 2);
          context.stroke();
        }
      });

      animation = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);
    animation = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        .from(".hero .eyebrow", { y: 24, opacity: 0, duration: 0.7 }, "-=.55")
        .from(".hero-line > i", { yPercent: 118, duration: 1.15, stagger: 0.1 }, "-=.55")
        .from(".hero-lead, .hero-actions, .hero-proof", { y: 30, opacity: 0, duration: 0.85, stagger: 0.09 }, "-=.75")
        .from(".orbit-stage", { scale: 0.72, opacity: 0, rotate: -8, duration: 1.35 }, "-=1.1");

      const desktop = gsap.matchMedia();
      desktop.add("(min-width: 900px)", () => {
        const heroStory = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=185%",
            pin: true,
            scrub: 1.15,
            anticipatePin: 1,
          },
        });
        heroStory
          .to(".hero-copy", { xPercent: -24, yPercent: -8, opacity: 0.04, ease: "power2.in" }, 0)
          .to(".orbit-stage", { xPercent: -43, yPercent: 4, scale: 1.75, rotate: 9, ease: "power2.inOut" }, 0)
          .to(".satellite", { x: (index) => (index % 2 ? 180 : -180), y: (index) => (index < 2 ? -100 : 110), opacity: 0, scale: 0.55, stagger: 0.035 }, 0.08)
          .to(".orbit-detail, .hero-proof, .scroll-cue", { opacity: 0, y: 24 }, 0.05)
          .fromTo(".hero-transition-word", { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 0.42, ease: "power2.out" }, 0.42)
          .to(".hero-transition-word span", { letterSpacing: "0.02em", duration: 0.45 }, 0.5)
          .to(".orbit-stage", { opacity: 0.18, scale: 2.3, duration: 0.32 }, 0.68)
          .to(".hero-transition-word", { opacity: 0, scale: 1.18, duration: 0.2 }, 0.86);

        const questionCards = gsap.utils.toArray<HTMLElement>(".diagnostic-question");
        const diagnosticAnswer = document.querySelector<HTMLElement>(".diagnostic-answer");
        const diagnosticCount = document.querySelector<HTMLElement>(".diagnostic-count");
        const diagnosticDots = gsap.utils.toArray<HTMLElement>(".diagnostic-dots i");

        gsap.set(questionCards, { autoAlpha: 0, yPercent: 46, rotateX: -12, scale: 0.9 });
        gsap.set(questionCards[0], { autoAlpha: 1, yPercent: 0, rotateX: 0, scale: 1 });
        gsap.set(diagnosticAnswer, { autoAlpha: 0, yPercent: 34, scale: 0.92 });

        const setDiagnosticStep = (progress: number) => {
          const step = Math.min(4, Math.floor(progress * 4.75));
          if (diagnosticCount) diagnosticCount.textContent = String(Math.min(step + 1, 4)).padStart(2, "0");
          diagnosticDots.forEach((dot, index) => dot.classList.toggle("is-active", index <= Math.min(step, 3)));
        };

        const diagnosticStory = gsap.timeline({
          scrollTrigger: {
            trigger: ".diagnostic-section",
            start: "top top",
            end: "+=420%",
            pin: ".diagnostic-pin",
            scrub: 1.05,
            anticipatePin: 1,
            onUpdate: (self) => setDiagnosticStep(self.progress),
          },
        });

        questionCards.forEach((card, index) => {
          if (index === 0) return;
          const previous = questionCards[index - 1];
          const position = index * 0.82;
          diagnosticStory
            .to(previous, { autoAlpha: 0, yPercent: -38, rotateX: 10, scale: 0.91, duration: 0.24 }, position - 0.18)
            .to(card, { autoAlpha: 1, yPercent: 0, rotateX: 0, scale: 1, duration: 0.34, ease: "power3.out" }, position);
        });

        diagnosticStory
          .to(questionCards[questionCards.length - 1], { autoAlpha: 0, yPercent: -38, rotateX: 10, scale: 0.91, duration: 0.25 }, 3.12)
          .to(".diagnostic-head", { opacity: 0.32, yPercent: -8, duration: 0.28 }, 3.12)
          .to(diagnosticAnswer, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.42, ease: "power3.out" }, 3.3)
          .fromTo(".diagnostic-answer-line i", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.36 }, 3.38)
          .from(".diagnostic-answer p, .diagnostic-answer a", { y: 24, opacity: 0, stagger: 0.08, duration: 0.28 }, 3.46);

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

        return () => setMosFullscreen(false);
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
      <div className="intro-curtain" aria-hidden="true">
        <div><span className="brand-mark" /><strong>MINGLER</strong></div>
        <i />
        <small>RELIONS LES SIGNAUX</small>
      </div>
      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Mingler — accueil">
          <span className="brand-mark" aria-hidden="true" />
          <span>mingler</span><b>.ai</b>
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Navigation principale">
          <a href="#diagnostic" onClick={() => setMenuOpen(false)}>Diagnostic</a>
          <a href="#mos" onClick={() => setMenuOpen(false)}>MOS</a>
          <a href="#iacrm" onClick={() => setMenuOpen(false)}>iACRM</a>
          <a href="#produits" onClick={() => setMenuOpen(false)}>Produits</a>
          <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
        </nav>
        <a className="header-cta" href="#contact">Demander une démo <Arrow diagonal /></a>
        <button
          className="menu-button"
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </header>

      <section className="hero" id="top">
        <SignalCanvas />
        <div className="hero-copy">
          <p className="eyebrow"><i /> Le problème n’est pas le nombre d’outils</p>
          <h1>
            <span className="hero-line"><i>Vos outils savent.</i></span>
            <span className="hero-line"><i>Votre croissance</i></span>
            <span className="hero-line accent"><i>oublie.</i></span>
          </h1>
          <p className="hero-lead">
            Chaque équipe capte une partie de l’histoire client. Mais entre deux outils, deux équipes ou deux étapes, le contexte se perd — et la prochaine action devient moins précise.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#diagnostic">Faire le test <Arrow /></a>
            <a className="button button-secondary" href="#contact">Voir Mingler en action <Arrow diagonal /></a>
          </div>
          <div className="hero-proof">
            <span><b>01</b> Source perdue</span>
            <span><b>02</b> Relance manuelle</span>
            <span><b>03</b> Contexte dispersé</span>
          </div>
        </div>

        <div className="orbit-stage" aria-label="Écosystème interactif Mingler">
          <MinglerScene />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="core-halo" />
          <button className="core" type="button" onClick={() => setActiveNode(3)}>
            <span className="brand-mark" aria-hidden="true" />
            <strong>UNE HISTOIRE<br />CLIENT COMMUNE</strong>
            <small>iACRM</small>
          </button>
          {ecosystem.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`satellite satellite-${index + 1} ${activeNode === index ? "active" : ""}`}
              onClick={() => setActiveNode(index)}
              aria-pressed={activeNode === index}
            >
              <em>{item.short}</em>
              <span><strong>{item.name}</strong><small>{item.label}</small></span>
            </button>
          ))}
          <div className="orbit-detail" aria-live="polite">
            <span>{ecosystem[activeNode].stat}</span>
            <p>{ecosystem[activeNode].description}</p>
          </div>
        </div>
        <div className="hero-transition-word" aria-hidden="true"><small>UNE MÉMOIRE.</small><span>TOUT EST RELIÉ</span></div>
        <a className="scroll-cue" href="#diagnostic"><span /> Faire le test</a>
      </section>

      <section className="diagnostic-section" id="diagnostic" aria-labelledby="diagnostic-title">
        <div className="diagnostic-pin">
          <div className="diagnostic-grid" aria-hidden="true" />
          <div className="diagnostic-head">
            <div className="section-kicker light"><span>A</span> Le test décisif</div>
            <p className="diagnostic-index">QUESTION <strong className="diagnostic-count">01</strong><i>/04</i></p>
            <h2 id="diagnostic-title">Pouvez-vous répondre<br /><em>immédiatement ?</em></h2>
            <p>Répondez mentalement. Si la réponse demande plusieurs outils, plusieurs personnes ou plusieurs minutes, continuez à faire défiler.</p>
            <div className="diagnostic-dots" aria-hidden="true">
              {diagnosticQuestions.map(({ number }) => <i key={number} className={number === "01" ? "is-active" : ""} />)}
            </div>
          </div>

          <div className="diagnostic-stage">
            {diagnosticQuestions.map(({ number, signal, question, insight }) => (
              <article className="diagnostic-question" key={number}>
                <div className="question-meta"><span>{number}</span><b>{signal}</b></div>
                <h3>{question}</h3>
                <p>{insight}</p>
                <i className="question-corner" aria-hidden="true" />
              </article>
            ))}

            <article className="diagnostic-answer">
              <span>CE QUE VOS RÉPONSES RÉVÈLENT</span>
              <h3>Vous n’avez pas quatre problèmes.<br /><em>Vous avez une histoire client fragmentée.</em></h3>
              <div className="diagnostic-answer-line"><i /></div>
              <p>Ce n’est pas un manque d’effort de vos équipes. C’est le manque de continuité entre ce que votre entreprise sait, ce qu’elle fait et ce qu’elle apprend.</p>
              <a href="#mos">Découvrir la continuité MINGLER <Arrow /></a>
            </article>
          </div>

          <p className="diagnostic-scroll" aria-hidden="true"><span /> CONTINUEZ À DÉFILER</p>
        </div>
      </section>

      <div className="motion-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>ACQUÉRIR</span><i>✦</i><span>COMPRENDRE</span><i>✦</i><span>ACTIVER</span><i>✦</i><span>MESURER</span><i>✦</i>
          <span>ACQUÉRIR</span><i>✦</i><span>COMPRENDRE</span><i>✦</i><span>ACTIVER</span><i>✦</i><span>MESURER</span><i>✦</i>
        </div>
      </div>

      <section className="mos-section" id="mos">
        <div className="mos-intro">
          <div className="section-kicker"><span>02</span> MOS Marketing</div>
          <div className="mos-heading gsap-reveal">
            <h2>Votre marketing<br /><span>prend vie.</span></h2>
            <div>
              <p>Neuf agents spécialisés transforment chaque signal marché en stratégie, contenus, diffusion et décisions mesurables.</p>
              <a href="#contact">Découvrir le MOS <Arrow /></a>
            </div>
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
            <div className="section-kicker light"><span>03</span> iACRM / Scoring intelligent</div>
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
        <div className="section-kicker"><span>04</span> Les produits</div>
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
          <div className="section-kicker light"><span>05</span> L’impact</div>
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
        <div><a href="#diagnostic">Diagnostic</a><a href="#mos">MOS</a><a href="#produits">Produits</a></div>
        <span>© 2026 Mingler.ai</span>
      </footer>
    </main>
  );
}
