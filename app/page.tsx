"use client";

import { useEffect, useRef, useState } from "react";

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
  const [activeNode, setActiveNode] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
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
            Chaque signal.<br />
            <span>La bonne action.</span><br />
            Au bon moment.
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
        <a className="scroll-cue" href="#ecosysteme"><span /> Faire circuler la donnée</a>
      </section>

      <section className="dark-section" id="ecosysteme">
        <div className="section-kicker"><span>01</span> L’écosystème</div>
        <div className="dark-intro">
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
      </section>

      <section className="mos-section" id="mos">
        <div className="section-kicker"><span>02</span> MOS Marketing</div>
        <div className="mos-heading">
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
        <div className="products-title">
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
