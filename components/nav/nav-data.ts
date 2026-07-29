export interface NavSubItem {
  id: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
  stat?: string;
  iconName: string;
  featured?: boolean;
}

export interface NavSection {
  id: string;
  label: string;
  href: string;
  hasDropdown: boolean;
  kicker?: string;
  tagline?: string;
  mainCards?: NavSubItem[];
  smallItems?: NavSubItem[];
  largeFeatured?: NavSubItem;
}

export const navData: NavSection[] = [
  {
    id: "diagnostic",
    label: "Diagnostic",
    href: "#diagnostic",
    hasDropdown: true,
    kicker: "Le Test Décisif",
    tagline: "Évaluez la maturité de votre écosystème d'acquisition en 4 questions",
    mainCards: [
      {
        id: "origine",
        title: "01. Origine des clients",
        description: "Identifiez le premier signal exact et la campagne ayant généré la relation.",
        href: "#diagnostic",
        stat: "Signal 360°",
        iconName: "Target",
      },
      {
        id: "action",
        title: "02. Automatisation des relances",
        description: "Déclenchez la bonne action au bon moment sans intervention manuelle.",
        href: "#diagnostic",
        stat: "Temps réel",
        iconName: "Zap",
      },
      {
        id: "memoire",
        title: "03. Mémoire client unifiée",
        description: "Une seule histoire partagée entre marketing, vente et relation client.",
        href: "#diagnostic",
        stat: "Unified CRM",
        iconName: "Database",
      },
      {
        id: "apprentissage",
        title: "04. Apprentissage continu",
        description: "Comprenez pourquoi vos prospects achètent ou abandonnent et optimisez.",
        href: "#diagnostic",
        stat: "ROI ×3",
        iconName: "TrendingUp",
      },
    ],
  },
  {
    id: "hd-data",
    label: "HD Data",
    href: "#hd-data",
    hasDropdown: true,
    kicker: "Prospection Ultra-Ciblée",
    tagline: "Accédez à plus de 20 millions de profils B2B qualifiés et prêts à l'activation",
    mainCards: [
      {
        id: "profils",
        title: "Base +20M Profils",
        description: "Filtrez les dirigeants, décideurs et entreprises par secteur, taille et ville.",
        href: "#hd-data",
        stat: "+20M",
        badge: "B2B",
        iconName: "Users",
        featured: true,
      },
      {
        id: "filtres",
        title: "Ciblage Multicritères",
        description: "Maroc, Immobilier, Construction B2B, PropTech et 10-200 salariés.",
        href: "#hd-data",
        stat: "Filtres précis",
        iconName: "Filter",
      },
      {
        id: "activation",
        title: "Activation Directe",
        description: "Injectez directement vos segments dans iACRM ou vos canaux d'outreach.",
        href: "#hd-data",
        stat: "ReelSend Ready",
        iconName: "Send",
      },
    ],
    smallItems: [
      {
        id: "immo-casablanca",
        title: "Dirigeants Immobilier Casablanca",
        description: "Promotion & Gestion locative",
        href: "#hd-data",
        iconName: "Building",
      },
      {
        id: "b2b-tanger",
        title: "Construction B2B Tanger & Marrakech",
        description: "Décideurs & Acheteurs qualifiés",
        href: "#hd-data",
        iconName: "Briefcase",
      },
    ],
  },
  {
    id: "mos",
    label: "MOS",
    href: "#mos",
    hasDropdown: true,
    kicker: "MOS Marketing",
    tagline: "Neuf agents spécialisés orchestrent toute votre stratégie d'acquisition",
    mainCards: [
      {
        id: "market-strategy",
        title: "Étude marché & Stratégie SCP",
        description: "Analyse concurrentielle, segmentation et conception du positionnement.",
        href: "#mos",
        stat: "Agent 01 & 02",
        iconName: "Compass",
      },
      {
        id: "orchestrator",
        title: "Orchestrateur Éditorial",
        description: "Concepteur opérationnel qui coordonne les canaux et la création.",
        href: "#mos",
        stat: "Agent 03",
        badge: "Core",
        iconName: "Cpu",
        featured: true,
      },
      {
        id: "multichannel",
        title: "Ads, Content, Email & CM",
        description: "Production automatisée de visuels, campagnes Ads et séquences email.",
        href: "#mos",
        stat: "Agents 04 à 07",
        iconName: "Layers",
      },
      {
        id: "publishing-perf",
        title: "Publishing & Performance",
        description: "Diffusion multi-canal et attribution précise du ROI en temps réel.",
        href: "#mos",
        stat: "Agents 08 & 09",
        iconName: "BarChart3",
      },
    ],
  },
  {
    id: "iacrm",
    label: "iACRM",
    href: "#iacrm",
    hasDropdown: true,
    kicker: "Mémoire Client Intelligente",
    tagline: "Ne perdez plus jamais le contexte du premier signal à la fidélisation",
    mainCards: [
      {
        id: "vue-360",
        title: "Vue 360° Client",
        description: "Toutes les interactions, signaux web et historiques réunis sur une fiche unique.",
        href: "#iacrm",
        stat: "360°",
        iconName: "UserCheck",
      },
      {
        id: "scoring",
        title: "Scoring & Relances Auto",
        description: "Qualification intelligente des leads et déclenchement automatique des tâches.",
        href: "#iacrm",
        stat: "Auto",
        iconName: "Workflow",
      },
      {
        id: "affiliation",
        title: "HD Affiliation & Network",
        description: "Attribuez chaque conversion à vos commerciaux, affiliés et apporteurs d'affaires.",
        href: "#iacrm",
        stat: "100% Attribué",
        iconName: "Share2",
      },
    ],
  },
  {
    id: "produits",
    label: "Produits",
    href: "#produits",
    hasDropdown: true,
    kicker: "L'Écosystème Mingler",
    tagline: "Des briques complémentaires pour connecter acquisition, data et relation client",
    mainCards: [
      {
        id: "prod-mos",
        title: "MOS Marketing",
        description: "9 agents IA pour transformer chaque signal marché en actions mesurables.",
        href: "#mos",
        stat: "Acquisition",
        iconName: "Sparkles",
      },
      {
        id: "prod-hddata",
        title: "HD Data",
        description: "Base B2B de +20M profils ciblés à activer instantanément.",
        href: "#hd-data",
        stat: "Data B2B",
        iconName: "Database",
      },
      {
        id: "prod-affiliation",
        title: "HD Affiliation",
        description: "Attribution des conversions et automatisation des commissions réseau.",
        href: "#iacrm",
        stat: "Réseau",
        iconName: "Network",
      },
      {
        id: "prod-iacrm",
        title: "iACRM",
        description: "CRM intelligent centralisant la mémoire et les décisions clients.",
        href: "#iacrm",
        stat: "Relation Client",
        iconName: "ShieldCheck",
      },
    ],
  },
  {
    id: "impact",
    label: "Impact",
    href: "#impact",
    hasDropdown: true,
    kicker: "Résultats Mesurés",
    tagline: "Des performances concrètes observées chez nos entreprises partenaires",
    mainCards: [
      {
        id: "metric-roi",
        title: "×3 ROI Moyen",
        description: "Multiplication par 3 du retour sur investissement des campagnes marketing.",
        href: "#impact",
        stat: "×3 ROI",
        iconName: "TrendingUp",
      },
      {
        id: "metric-leads",
        title: "+25M Leads Qualifiés",
        description: "Volume de prospects qualifiés et engagés via la plateforme.",
        href: "#impact",
        stat: "+25M",
        iconName: "CheckCircle2",
      },
      {
        id: "metric-temps",
        title: "−70% Temps de Gestion",
        description: "Réduction drastique des tâches manuelles de suivi et d'exécution.",
        href: "#impact",
        stat: "−70%",
        iconName: "Clock",
      },
      {
        id: "metric-entreprises",
        title: "+10K Entreprises",
        description: "Organisations qui orchestrent leur croissance avec Mingler.",
        href: "#impact",
        stat: "+10 000",
        iconName: "Building2",
      },
    ],
  },
];
