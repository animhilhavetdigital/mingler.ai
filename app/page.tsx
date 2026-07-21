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
      "Six agents spécialisés transforment un marché en campagnes mesurables, avec validation humaine à chaque moment décisif.",
    stat: "6 agents",
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
  ["01", "Étude de marché", "Go, test ou no-go — avant d’investir."],
  ["02", "Stratégie", "Segments, positionnement, plan et budget."],
  ["03", "Orchestration", "Un calendrier éditorial cohérent sur 90 jours."],
  ["04", "Studio créatif", "Des concepts déclinés pour chaque canal."],
  ["05", "Advertising", "Des campagnes prêtes à valider et publier."],
  ["06", "Analytics", "Des résultats traduits en prochaines actions."],
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

        const dataStory = gsap.timeline({
          scrollTrigger: { trigger: ".dark-section", start: "top 75%", end: "bottom 55%", scrub: 1 },
        });
        dataStory
          .from(".dark-intro h2", { xPercent: -18, opacity: 0.08 }, 0)
          .from(".dark-intro p", { xPercent: 35, opacity: 0 }, 0.06)
          .from(".data-rail article", { y: 170, opacity: 0, stagger: 0.12 }, 0.12)
          .fromTo(".rail-line i", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center" }, 0.12)
          .from(".dark-quote", { y: 100, opacity: 0 }, 0.55)
          .fromTo(".motion-phrase", { xPercent: 25 }, { xPercent: -30, ease: "none" }, 0.12);

        const mosStory = gsap.timeline({
          scrollTrigger: { trigger: ".agent-console", start: "top 82%", end: "bottom 48%", scrub: 0.85 },
        });
        mosStory
          .from(".agent-console", { clipPath: "inset(14% 14% 14% 14% round 90px)", scale: 0.88 }, 0)
          .from(".agent-list article", { x: -100, opacity: 0, stagger: 0.09 }, 0.06)
          .from(".console-orb", { scale: 0.28, rotate: -100, opacity: 0 }, 0.08)
          .to(".console-orb", { rotate: 130 }, 0.45);

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
          <a href="#ecosysteme" onClick={() => setMenuOpen(false)}>Écosystème</a>
          <a href="#mos" onClick={() => setMenuOpen(false)}>MOS</a>
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
          <p className="eyebrow"><i /> Pour ne plus perdre vos futurs clients</p>
          <h1>
            <span className="hero-line"><i>Chaque signal.</i></span>
            <span className="hero-line accent"><i>La bonne action.</i></span>
            <span className="hero-line"><i>Au bon moment.</i></span>
          </h1>
          <p className="hero-lead">
            Mingler relie l’acquisition, la donnée et la relation client dans un même système intelligent. Votre équipe sait quoi faire ensuite.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#ecosysteme">Explorer l’écosystème <Arrow /></a>
            <a className="button button-secondary" href="#contact">Voir Mingler en action <Arrow diagonal /></a>
          </div>
          <div className="hero-proof">
            <span><b>01</b> Données unifiées</span>
            <span><b>02</b> IA intégrée</span>
            <span><b>03</b> Résultats visibles</span>
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
        <a className="scroll-cue" href="#ecosysteme"><span /> Faire circuler la donnée</a>
      </section>

      <section className="dark-section" id="ecosysteme">
        <div className="section-kicker"><span>01</span> L’écosystème</div>
        <div className="dark-intro gsap-reveal">
          <h2>Quatre forces.<br /><i>Une seule mémoire.</i></h2>
          <p>Les outils ne manquent pas. Ce qui manque, c’est le fil qui relie chaque signal à la prochaine décision.</p>
        </div>
        <div className="data-rail" aria-label="Parcours de la donnée">
          <div className="rail-line"><i /></div>
          <article><span>ENTRÉE</span><b>Acquisition</b><p>Pages, campagnes, data, partenaires et recommandations.</p></article>
          <article><span>MÉMOIRE</span><b>iACRM</b><p>La source, le contexte et le stade restent attachés au contact.</p></article>
          <article><span>DÉCISION</span><b>Intelligence</b><p>Qualification, score, segmentation et prochaine meilleure action.</p></article>
          <article><span>IMPACT</span><b>Croissance</b><p>Conversion, fidélisation, réactivation et valeur client.</p></article>
        </div>
        <div className="dark-quote">
          <span>Le principe Mingler</span>
          <blockquote>La donnée n’attend plus dans un outil.<br />Elle déclenche une action.</blockquote>
        </div>
        <div className="motion-phrase" aria-hidden="true">SIGNAL&nbsp;&nbsp; CONTEXTE&nbsp;&nbsp; DÉCISION&nbsp;&nbsp; ACTION</div>
      </section>

      <div className="motion-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>ACQUÉRIR</span><i>✦</i><span>COMPRENDRE</span><i>✦</i><span>ACTIVER</span><i>✦</i><span>MESURER</span><i>✦</i>
          <span>ACQUÉRIR</span><i>✦</i><span>COMPRENDRE</span><i>✦</i><span>ACTIVER</span><i>✦</i><span>MESURER</span><i>✦</i>
        </div>
      </div>

      <section className="mos-section" id="mos">
        <div className="section-kicker"><span>02</span> MOS Marketing</div>
        <div className="mos-heading gsap-reveal">
          <h2>Votre marketing<br /><span>prend vie.</span></h2>
          <div>
            <p>Une chaîne d’agents spécialisés transforme une opportunité de marché en exécution mesurable.</p>
            <a href="#contact">Découvrir le MOS <Arrow /></a>
          </div>
        </div>

        <div className="agent-console">
          <div className="console-top">
            <span><i /> MOS / WORKFLOW ACTIF</span>
            <span>VALIDATION HUMAINE REQUISE</span>
          </div>
          <div className="agent-list">
            {agents.map(([number, title, description], index) => (
              <article key={title} style={{ "--delay": `${index * 0.08}s` } as React.CSSProperties}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <b>{index < agents.length - 1 ? "EN CHAÎNE" : "BOUCLE"}</b>
                <i aria-hidden="true">{index < agents.length - 1 ? "↓" : "↻"}</i>
              </article>
            ))}
          </div>
          <div className="console-orb" aria-hidden="true"><i /><i /><i /><span>M</span></div>
        </div>
      </section>

      <section className="products-section" id="produits">
        <div className="section-kicker"><span>03</span> Les produits</div>
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
          <div className="section-kicker light"><span>04</span> L’impact</div>
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
        <div><a href="#ecosysteme">Écosystème</a><a href="#mos">MOS</a><a href="#produits">Produits</a></div>
        <span>© 2026 Mingler.ai</span>
      </footer>
    </main>
  );
}
