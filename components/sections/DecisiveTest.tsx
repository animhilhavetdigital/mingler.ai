"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ddLogo from "@/dd.png";

const diagnosticQuestions = [
  {
    number: "01",
    signal: "ORIGINE",
    question: "Savez-vous exactement d’où viennent vos meilleurs clients ?",
    insight:
      "Pas seulement le canal : la campagne, le message et le premier signal qui ont créé la relation.",
  },
  {
    number: "02",
    signal: "ACTION",
    question:
      "Chaque prospect reçoit-il automatiquement la bonne action au bon moment ?",
    insight:
      "Sans attendre qu’une personne rapproche manuellement les informations et décide de relancer.",
  },
  {
    number: "03",
    signal: "MÉMOIRE",
    question:
      "Avez-vous une seule histoire client, ou des informations dispersées dans plusieurs outils ?",
    insight:
      "Une histoire que marketing, vente et relation client peuvent reprendre sans la reconstruire.",
  },
  {
    number: "04",
    signal: "APPRENTISSAGE",
    question: "Pouvez-vous expliquer pourquoi un client achète… ou abandonne ?",
    insight:
      "Et transformer cette réponse en une prochaine décision plus précise pour toute l’équipe.",
  },
];

interface CardState {
  x: number;
  y: number;
  scale: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

interface StageConfig {
  deck: CardState;
  fan: CardState[];
  expand: CardState[];
  final: CardState[];
}

function getStageConfig(stage: HTMLElement, breakpoint: string): StageConfig {
  const style = getComputedStyle(stage);
  const rawW = parseFloat(style.getPropertyValue("--card-width"));
  const rawH = parseFloat(style.getPropertyValue("--card-height"));
  const rawG = parseFloat(style.getPropertyValue("--card-gap"));
  const w = Number.isFinite(rawW) ? rawW : 320;
  const h = Number.isFinite(rawH) ? rawH : 460;
  const g = Number.isFinite(rawG) ? rawG : 24;
  const vh = window.innerHeight;

  const baseDeck: CardState = {
    x: 0,
    y: vh * 0.85,
    scale: 0.75,
    rotationX: 4,
    rotationY: 0,
    rotationZ: 0,
  };

  if (breakpoint === "desktop") {
    const total = w * 4 + g * 3;
    const finalX = Array.from(
      { length: 4 },
      (_, i) => -total / 2 + w / 2 + i * (w + g),
    );
    const final: CardState[] = finalX.map((x) => ({
      x,
      y: 0,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
    }));
    const fan: CardState[] = final.map((state, i) => ({
      x: state.x * 0.7,
      y: 0,
      scale: 0.92,
      rotationX: 2,
      rotationY: [-5, -2, 2, 5][i],
      rotationZ: [-11, -4, 4, 11][i],
    }));
    const expand: CardState[] = final.map((state, i) => ({
      x: state.x * 0.9,
      y: 0,
      scale: 0.96,
      rotationX: 1,
      rotationY: [-3, -1, 1, 3][i],
      rotationZ: [-6, -2, 2, 6][i],
    }));
    return { deck: baseDeck, fan, expand, final };
  }

  if (breakpoint === "tablet") {
    const totalW = w * 2 + g;
    const rowY = (h + g) / 2;
    const final: CardState[] = [
      { x: -totalW / 2 + w / 2, y: -rowY, scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0 },
      { x: totalW / 2 - w / 2, y: -rowY, scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0 },
      { x: -totalW / 2 + w / 2, y: rowY, scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0 },
      { x: totalW / 2 - w / 2, y: rowY, scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0 },
    ];
    const fan: CardState[] = [
      { x: -w * 0.75, y: -h * 0.12, scale: 0.9, rotationX: 2, rotationY: -4, rotationZ: -8 },
      { x: -w * 0.25, y: -h * 0.12, scale: 0.9, rotationX: 2, rotationY: -1.5, rotationZ: -3 },
      { x: w * 0.25, y: h * 0.12, scale: 0.9, rotationX: 2, rotationY: 1.5, rotationZ: 3 },
      { x: w * 0.75, y: h * 0.12, scale: 0.9, rotationX: 2, rotationY: 4, rotationZ: 8 },
    ];
    const expand: CardState[] = [
      { x: -w * 1.05, y: -h * 0.25, scale: 0.94, rotationX: 1, rotationY: -2.5, rotationZ: -4 },
      { x: -w * 0.35, y: -h * 0.25, scale: 0.94, rotationX: 1, rotationY: -1, rotationZ: -1.5 },
      { x: w * 0.35, y: h * 0.25, scale: 0.94, rotationX: 1, rotationY: 1, rotationZ: 1.5 },
      { x: w * 1.05, y: h * 0.25, scale: 0.94, rotationX: 1, rotationY: 2.5, rotationZ: 4 },
    ];
    return { deck: baseDeck, fan, expand, final };
  }

  // mobile
  const fan: CardState[] = [
    { x: -w * 0.15, y: -h * 0.65, scale: 0.88, rotationX: 1, rotationY: -3, rotationZ: -5 },
    { x: -w * 0.05, y: -h * 0.22, scale: 0.88, rotationX: 1, rotationY: -1, rotationZ: -2 },
    { x: w * 0.05, y: h * 0.22, scale: 0.88, rotationX: 1, rotationY: 1, rotationZ: 2 },
    { x: w * 0.15, y: h * 0.65, scale: 0.88, rotationX: 1, rotationY: 3, rotationZ: 5 },
  ];
  const expand: CardState[] = [
    { x: -w * 0.1, y: -h * 0.75, scale: 0.94, rotationX: 0.5, rotationY: -1.5, rotationZ: -3 },
    { x: -w * 0.03, y: -h * 0.25, scale: 0.94, rotationX: 0.5, rotationY: -0.5, rotationZ: -1 },
    { x: w * 0.03, y: h * 0.25, scale: 0.94, rotationX: 0.5, rotationY: 0.5, rotationZ: 1 },
    { x: w * 0.1, y: h * 0.75, scale: 0.94, rotationX: 0.5, rotationY: 1.5, rotationZ: 3 },
  ];
  const final: CardState[] = [
    { x: -w * 0.07, y: -h * 0.58, scale: 1, rotationX: 0, rotationY: 0, rotationZ: -1.5 },
    { x: -w * 0.02, y: -h * 0.2, scale: 1, rotationX: 0, rotationY: 0, rotationZ: -0.5 },
    { x: w * 0.02, y: h * 0.2, scale: 1, rotationX: 0, rotationY: 0, rotationZ: 0.5 },
    { x: w * 0.07, y: h * 0.58, scale: 1, rotationX: 0, rotationY: 0, rotationZ: 1.5 },
  ];

  return { deck: baseDeck, fan, expand, final };
}

function CardBackGraphic({ number }: { number: string }) {
  return (
    <div className="card-back decisive-card-back relative w-full h-full bg-[#ff4b0b] text-white rounded-[26px] overflow-hidden p-0 select-none shadow-2xl">
      {/* Exact Vector Playing Card Back Pattern matching blue reference edge-to-edge */}
      <svg
        viewBox="0 0 320 460"
        className="w-full h-full text-white fill-none stroke-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Full Edge Outer Double Border Touching Card Boundaries MAX */}
        <rect x="2" y="2" width="316" height="456" rx="26" strokeWidth="3" stroke="white" opacity="0.95" />
        <rect x="7" y="7" width="306" height="446" rx="22" strokeWidth="1.5" stroke="white" opacity="0.8" />

        {/* Outer Frame Top/Bottom Decorative Banners */}
        <rect x="140" y="2" width="40" height="46" fill="#ff4b0b" stroke="white" strokeWidth="1.5" opacity="0.9" />
        <circle cx="160" cy="18" r="7" stroke="white" strokeWidth="1.5" fill="white" opacity="0.9" />
        <circle cx="160" cy="33" r="4" stroke="white" strokeWidth="1" fill="#ff4b0b" opacity="0.9" />

        <rect x="140" y="412" width="40" height="46" fill="#ff4b0b" stroke="white" strokeWidth="1.5" opacity="0.9" />
        <circle cx="160" cy="442" r="7" stroke="white" strokeWidth="1.5" fill="white" opacity="0.9" />
        <circle cx="160" cy="427" r="4" stroke="white" strokeWidth="1" fill="#ff4b0b" opacity="0.9" />

        {/* Four Corner Arcs & Dots */}
        <path d="M7,50 A44,44 0 0,0 50,7" strokeWidth="1.5" stroke="white" opacity="0.85" />
        <circle cx="25" cy="25" r="5" strokeWidth="1.2" stroke="white" fill="white" opacity="0.9" />

        <path d="M313,50 A44,44 0 0,1 270,7" strokeWidth="1.5" stroke="white" opacity="0.85" />
        <circle cx="295" cy="25" r="5" strokeWidth="1.2" stroke="white" fill="white" opacity="0.9" />

        <path d="M7,410 A44,44 0 0,1 50,453" strokeWidth="1.5" stroke="white" opacity="0.85" />
        <circle cx="25" cy="435" r="5" strokeWidth="1.2" stroke="white" fill="white" opacity="0.9" />

        <path d="M313,410 A44,44 0 0,0 270,453" strokeWidth="1.5" stroke="white" opacity="0.85" />
        <circle cx="295" cy="435" r="5" strokeWidth="1.2" stroke="white" fill="white" opacity="0.9" />

        {/* Inner Rectangular Frame Extended */}
        <rect x="16" y="46" width="288" height="368" rx="12" strokeWidth="2" stroke="white" opacity="0.9" />
        <rect x="20" y="50" width="280" height="360" rx="10" strokeWidth="1" stroke="white" opacity="0.6" />

        {/* Dense Diagonal Parallel Rays Filling Inner Back Background */}
        <g stroke="white" strokeWidth="1.2" opacity="0.45">
          <line x1="20" y1="84" x2="300" y2="364" />
          <line x1="20" y1="114" x2="300" y2="394" />
          <line x1="20" y1="54" x2="300" y2="334" />
          <line x1="20" y1="144" x2="276" y2="400" />
          <line x1="20" y1="174" x2="246" y2="400" />
          <line x1="20" y1="204" x2="216" y2="400" />
          <line x1="20" y1="234" x2="186" y2="400" />
          <line x1="20" y1="264" x2="156" y2="400" />

          <line x1="300" y1="84" x2="20" y2="364" />
          <line x1="300" y1="114" x2="20" y2="394" />
          <line x1="300" y1="54" x2="20" y2="334" />
          <line x1="300" y1="144" x2="44" y2="400" />
          <line x1="300" y1="174" x2="74" y2="400" />
          <line x1="300" y1="204" x2="104" y2="400" />
          <line x1="300" y1="234" x2="134" y2="400" />
          <line x1="300" y1="264" x2="164" y2="400" />
        </g>

        <defs>
          <g id="mingler-flame-icon" fill="#ff4b0b">
            <path d="M11.7298 58.6309C21.0607 65.6691 30.9156 69.7089 42.8821 70.0024C46.4795 70.0906 49.8957 69.8678 53.4865 69.4993L63.7549 68.4491C67.2573 68.0917 72.2632 68.3807 74.9365 70.3907C76.5638 71.6152 76.754 73.6009 75.6086 75.2579C74.4522 76.9325 72.7873 78.071 71.1643 79.0749C48.9648 91.3201 21.0142 81.6806 11.0156 58.6221C11.2854 58.7191 11.5043 58.7478 11.732 58.6309H11.7298Z" />
            <path d="M13.1272 54.3239L13.402 54.1083C26.0465 58.5156 37.3307 57.2262 49.8557 53.2816C59.3674 50.2873 78.5835 45.096 87.1558 48.9215C89.4623 49.9503 90.9179 51.9653 90.8382 54.5688C90.8005 56.2221 90.5036 57.8709 89.757 59.331L87.2289 64.2707C83.7703 62.2693 80.1168 61.2651 76.1907 61.0135C72.5304 60.7777 69.0231 60.9843 65.3762 61.5302L52.5255 63.4576C48.3291 64.0865 44.3321 64.3696 40.0826 64.3089C30.1322 64.1652 20.7689 60.7665 13.125 54.3262L13.1272 54.3239Z" />
            <path d="M57.3957 46.0822C48.326 49.2962 39.1835 52.42 29.4428 52.2509C24.0813 52.1586 18.9582 51.1239 14.0625 49.0963C20.8101 49.1094 27.1362 48.0967 33.4379 46.0954C36.9939 44.9641 40.318 43.7119 43.6532 42.0796L51.3787 38.2989C58.4287 34.8499 66.3572 31.1944 74.0496 29.7204C81.4594 28.3012 88.9487 29.1184 92.0455 36.5502C92.818 38.244 93.1668 39.9729 93.4537 42.0159C81.0775 37.2906 69.262 41.8797 57.3979 46.0844L57.3957 46.0822Z" />
            <path d="M28.9669 42.4638C23.9244 43.9742 19.0259 44.9326 13.7109 44.8862C17.3953 43.6032 20.8382 42.1524 24.239 40.2025C28.7232 37.6365 32.8174 34.7525 36.8563 31.5438L44.8055 25.2304C50.5924 20.635 57.6665 15.7127 64.5013 13.0164C73.7422 9.37058 82.1456 10.4328 87.4074 19.3785C79.8659 19.0384 72.9668 21.4609 66.3158 24.5414C57.2589 28.7371 48.7092 34.1673 39.5548 38.3321C36.0609 39.9309 32.7155 41.2823 28.9669 42.4638Z" />
            <path d="M11.5267 40.8681C11.396 40.8439 11.3317 40.7053 11.3871 40.5492C14.5243 37.7765 17.2671 34.7993 19.8792 31.5033L29.8932 18.8644C32.5696 15.4848 35.3168 12.3911 38.4451 9.42925C47.1808 1.15947 56.6233 -2.91276 68.3145 2.36882C59.6186 4.72816 51.7359 10.4187 45.2023 16.3094L34.9867 25.5203C28.0743 31.7539 20.2536 37.5984 11.5267 40.8637V40.8681Z" />
            <path d="M21.5253 21.6205C17.523 27.7724 13.4333 34.0342 7.73438 38.8581C8.39816 27.4536 13.4377 16.9966 21.7218 9.47931C23.1367 8.19528 24.5429 7.13771 26.2111 6.26923C27.1325 5.78332 28.0823 5.40514 29.1195 5.36117C30.8095 5.29081 30.2702 7.83249 28.9426 9.93004L21.5297 21.6226L21.5253 21.6205Z" />
            <path d="M3.81457 34.399C3.33697 37.2553 3.74164 39.8312 4.68978 42.5428C1.71125 39.6041 -0.0438676 35.8483 0.000833781 31.8188C0.0267135 29.4722 1.02661 25.9213 2.86173 25.7966C4.22394 25.7031 4.92034 27.7714 4.61214 29.6125L3.81457 34.399Z" />
          </g>
        </defs>

        {/* Side Chevrons / Triangles */}
        <polygon points="20,170 76,230 20,290" fill="white" stroke="white" strokeWidth="1" opacity="0.9" />
        <polygon points="300,170 244,230 300,290" fill="white" stroke="white" strokeWidth="1" opacity="0.9" />
        <polygon points="104,50 160,106 216,50" fill="white" stroke="white" strokeWidth="1" opacity="0.9" />
        <polygon points="104,410 160,354 216,410" fill="white" stroke="white" strokeWidth="1" opacity="0.9" />

        {/* Mingler Flame Logos inside the 4 white triangles */}
        <use href="#mingler-flame-icon" transform="translate(24, 216) scale(0.32)" />
        <use href="#mingler-flame-icon" transform="translate(266, 216) scale(0.32)" />
        <use href="#mingler-flame-icon" transform="translate(145, 54) scale(0.32)" />
        <use href="#mingler-flame-icon" transform="translate(145, 377) scale(0.32)" />

        {/* Central Scalloped Diamond Medallion Frame */}
        <g transform="translate(160, 230) rotate(45)">
          <rect x="-64" y="-64" width="128" height="128" rx="20" fill="#ff4b0b" stroke="white" strokeWidth="2.5" opacity="0.95" />
          <rect x="-56" y="-56" width="112" height="112" rx="16" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Center White Medallion Circle */}
        <circle cx="160" cy="230" r="54" strokeWidth="3" stroke="#ff4b0b" fill="white" />
        <circle cx="160" cy="230" r="48" strokeWidth="1.2" stroke="#ff4b0b" fill="white" opacity="0.8" />

        {/* Decorative Four Dots inside Central Medallion Border */}
        <circle cx="160" cy="180" r="2.5" fill="#ff4b0b" />
        <circle cx="160" cy="280" r="2.5" fill="#ff4b0b" />
        <circle cx="110" cy="230" r="2.5" fill="#ff4b0b" />
        <circle cx="210" cy="230" r="2.5" fill="#ff4b0b" />
      </svg>

      {/* ONLY THE CARD NUMBER in Central Medallion (No Text) */}
      <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-10">
        <span className="text-5xl sm:text-6xl font-black tracking-tighter text-[#ff4b0b] leading-none drop-shadow-sm font-sans">
          {number}
        </span>
      </div>
    </div>
  );
}

export function DecisiveTest() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const answerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stage = stageRef.current;
    const answer = answerRef.current;
    if (!section || !stage || !answer) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      stage.querySelectorAll(".decisive-card-wrapper"),
    );

    const isReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduceMotion || cards.length !== 4) return;

    const getBp = () => {
      const w = window.innerWidth;
      if (w >= 1024) return "desktop";
      if (w >= 768) return "tablet";
      return "mobile";
    };

    let config = getStageConfig(stage, getBp());

    const updateConfig = () => {
      config = getStageConfig(stage, getBp());
    };

    const applyState = (card: HTMLElement, state: CardState) => {
      gsap.set(card, {
        x: state.x,
        y: state.y,
        scale: state.scale,
        rotationX: state.rotationX,
        rotationY: state.rotationY,
        rotationZ: state.rotationZ,
      });
    };

    cards.forEach((card) => applyState(card, config.deck));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 1,
          onRefresh: updateConfig,
        },
      });

      tl.to(cards, {
        x: (i) => config.fan[i].x,
        y: (i) => config.fan[i].y,
        scale: (i) => config.fan[i].scale,
        rotationX: (i) => config.fan[i].rotationX,
        rotationY: (i) => config.fan[i].rotationY,
        rotationZ: (i) => config.fan[i].rotationZ,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.08,
      });

      tl.to(
        cards,
        {
          x: (i) => config.expand[i].x,
          y: (i) => config.expand[i].y,
          scale: (i) => config.expand[i].scale,
          rotationX: (i) => config.expand[i].rotationX,
          rotationY: (i) => config.expand[i].rotationY,
          rotationZ: (i) => config.expand[i].rotationZ,
          duration: 1.4,
          ease: "power1.inOut",
        },
        "+=0.2",
      );

      tl.to(
        cards,
        {
          x: (i) => config.final[i].x,
          y: (i) => config.final[i].y,
          scale: (i) => config.final[i].scale,
          rotationX: (i) => config.final[i].rotationX,
          rotationY: (i) => config.final[i].rotationY,
          rotationZ: (i) => config.final[i].rotationZ,
          duration: 1.4,
          ease: "power2.out",
        },
        "+=0.2",
      );

      cards.forEach((card, index) => {
        const inner = card.querySelector<HTMLElement>(".decisive-card-inner");
        if (inner) {
          tl.to(
            inner,
            {
              rotateY: 180,
              duration: 1.1,
              ease: "power2.inOut",
            },
            `-=${0.9 - index * 0.15}`,
          );
        }
      });

      tl.to(
        stage,
        {
          opacity: 0,
          scale: 0.92,
          y: -40,
          duration: 1.2,
          ease: "power2.in",
        },
        "+=0.6",
      );

      tl.fromTo(
        answer,
        { opacity: 0, scale: 0.94, y: 50, autoAlpha: 0 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          autoAlpha: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        "-=0.4",
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="diagnostic-section decisive-test-section"
      id="diagnostic"
      aria-labelledby="diagnostic-title"
    >
      <div className="diagnostic-pin decisive-pin">
        <div className="diagnostic-grid" aria-hidden="true" />
        <div className="diagnostic-head decisive-test-head">
          <div className="section-kicker light">
            <span>A</span> Le test décisif
          </div>
          <h2 id="diagnostic-title">
            Pouvez-vous répondre<br />
            <em>immédiatement ?</em>
          </h2>
          <p>
            Répondez mentalement. Si la réponse demande plusieurs outils,
            plusieurs personnes ou plusieurs minutes, continuez à faire défiler.
          </p>
        </div>

        <div ref={stageRef} className="cards-stage decisive-cards-stage">
          {diagnosticQuestions.map((q) => (
            <div key={q.number} className="decisive-card-outer">
              <div className="card decisive-card-wrapper">
                <div className="card-inner decisive-card-inner">
                  <CardBackGraphic number={q.number} />
                  <div className="card-front decisive-card-front">
                    <article className="diagnostic-question">
                      <div className="question-meta flex items-center justify-between w-full">
                        <div className="flex items-baseline gap-2">
                          <span>{q.number}</span>
                          <b>{q.signal}</b>
                        </div>
                        <img
                          src={typeof ddLogo === "string" ? ddLogo : ddLogo.src}
                          alt="Mingler Logo"
                          className="w-11 h-11 sm:w-13 sm:h-13 object-contain -mt-3 -mr-1.5"
                        />
                      </div>
                      <h3>{q.question}</h3>
                      <p>{q.insight}</p>
                      <i className="question-corner" aria-hidden="true" />
                    </article>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <article
          ref={answerRef}
          className="diagnostic-answer decisive-answer"
        >
          <div className="diagnostic-answer-line">
            <i />
          </div>
        </article>

        <p className="diagnostic-scroll" aria-hidden="true">
          <span /> CONTINUEZ À DÉFILER
        </p>
      </div>
    </section>
  );
}

export default DecisiveTest;
