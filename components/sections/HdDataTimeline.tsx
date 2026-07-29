"use client";

import React from "react";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const hdDataTimelineItems: TimelineItem[] = [
  {
    id: 1,
    title: "Base 20M+ Profils",
    date: "Étape 01",
    content: "Explorez une base B2B massive de plus de 20 millions de profils qualifiés sans acheter une liste au hasard.",
    category: "Base B2B",
    iconName: "Users",
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Ciblage Multicritères",
    date: "Étape 02",
    content: "Localisation (Maroc, Casablanca, Tanger), secteur (Immobilier, B2B), fonction (Dirigeants) et taille d'entreprise (10-200 salariés).",
    category: "Filtres",
    iconName: "Filter",
    relatedIds: [1, 3],
    status: "completed",
    energy: 85,
  },
  {
    id: 3,
    title: "Audience Identifiée",
    date: "Étape 03",
    content: "12 648 profils ciblés. Prévisualisez la composition exacte de votre audience avant de la déverrouiller.",
    category: "Audience",
    iconName: "Target",
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 4,
    title: "Data Pack Mégawatt",
    date: "Étape 04",
    content: "Votre sélection devient un Data Pack sur mesure. Achetez uniquement les données dont votre prochaine action a besoin.",
    category: "Data Pack",
    iconName: "Zap",
    relatedIds: [3, 5],
    status: "pending",
    energy: 45,
  },
  {
    id: 5,
    title: "Activation Directe",
    date: "Étape 05",
    content: "Une audience, deux chemins directs : injectez le Data Pack dans iACRM ou lancez votre campagne avec ReelSend.",
    category: "Activation",
    iconName: "Send",
    relatedIds: [4],
    status: "pending",
    energy: 20,
  },
];

export function HdDataTimeline() {
  return (
    <section className="w-full min-h-screen bg-white relative p-0 m-0 overflow-hidden" id="hd-data" aria-labelledby="hd-data-title">
      <RadialOrbitalTimeline timelineData={hdDataTimelineItems} />
    </section>
  );
}

export default HdDataTimeline;
