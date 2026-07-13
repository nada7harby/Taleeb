export type AccentKey = "yellow" | "cyan" | "green" | "red";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: AccentKey;
  tags: string[];
  features: string[];
  metrics: { value: string; label: string };
  demoComponent: "workplace" | "education" | "marketing" | "consultancy";
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  color: AccentKey;
  stats: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  color: AccentKey;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HighlightedText {
  text: string;
  highlight?: string | string[];
}

export interface AboutStat {
  value: string;
  label: string;
  color: AccentKey;
}

export interface AboutMissionPoint {
  iconName: string;
  color: AccentKey;
  title: string;
  text: string;
}

export interface AboutWhyCard {
  iconName: string;
  color: AccentKey;
  title: string;
  text: string;
  footer: string;
  size: "lg" | "sm";
}

export interface AboutTimelineItem {
  level: number;
  year: string;
  xp: string;
  title: string;
  text: string;
  color: AccentKey;
  current?: boolean;
}

export interface AboutTeamMember {
  name: string;
  role: string;
  bio: string;
  color: AccentKey;
  skills: { label: string; value: number }[];
}

export interface AboutTranslations {
  metaTitle: string;
  breadcrumb: { home: string; current: string };
  hero: {
    title: HighlightedText;
    subheading: string;
    companyCard: { est: string; level: string; footer: string };
    stats: AboutStat[];
  };
  mission: {
    eyebrow: string;
    title: HighlightedText;
    paragraphs: string[];
    points: AboutMissionPoint[];
    quote: { text: string; name: string; role: string };
  };
  whyUs: {
    eyebrow: string;
    title: HighlightedText;
    subhead: string;
    cards: AboutWhyCard[];
  };
  journey: {
    eyebrow: string;
    title: HighlightedText;
    subhead: string;
    items: AboutTimelineItem[];
  };
  team: {
    eyebrow: string;
    title: HighlightedText;
    subhead: string;
    members: AboutTeamMember[];
    joinText: string;
    joinCta: string;
  };
  cta: {
    title: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    proofPoints: string[];
  };
}

export interface ProductPlatformCard {
  iconName: string;
  color: AccentKey;
  title: string;
  text: string;
  bullets: string[];
}

export interface CoreProduct {
  iconName: string;
  color: AccentKey;
  name: string;
  tagline: string;
  popular?: boolean;
  features: { title: string; text: string }[];
  cta: string;
}

export interface ChallengeType {
  iconName: string;
  title: string;
  text: string;
  chips: [string, string];
}

export interface GamificationMechanic {
  iconName: string;
  color: AccentKey;
  title: string;
  text: string;
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  affiliation: string;
  score: number;
  color: AccentKey;
}

export interface ProductsTranslations {
  metaTitle: string;
  breadcrumb: { home: string; current: string };
  hero: {
    title: HighlightedText;
    subheading: string;
    badges: { iconName: string; label: string }[];
  };
  platformOverview: {
    eyebrow: string;
    title: HighlightedText;
    subhead: string;
    cards: ProductPlatformCard[];
  };
  coreProducts: {
    eyebrow: string;
    title: HighlightedText;
    subhead: string;
    popularLabel: string;
    products: CoreProduct[];
  };
  challengeTypes: {
    eyebrow: string;
    title: HighlightedText;
    subhead: string;
    items: ChallengeType[];
  };
  mechanics: {
    eyebrow: string;
    title: HighlightedText;
    text: string;
    items: GamificationMechanic[];
    demo: {
      title: string;
      pointsLabel: string;
      toNextLevel: string;
      streakTitle: string;
      streakSubtitle: string;
      bonusToast: string;
    };
  };
  leaderboard: {
    eyebrow: string;
    title: HighlightedText;
    subhead: string;
    liveLabel: string;
    rankLabel: string;
    scoreLabel: string;
    players: LeaderboardPlayer[];
  };
  screenshot: {
    eyebrow: string;
    title: HighlightedText;
    previewLabel: string;
    toast1: string;
    toast2: string;
  };
  cta: {
    title: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    proofPoints: string[];
  };
}

export interface TranslationDictionary {
  locale: "en" | "ar";
  dir: "ltr" | "rtl";
  nav: {
    brandName: string;
    services: string;
    features: string;
    impact: string;
    faq: string;
    about: string;
    products: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    headlineStart: string;
    headlineHighlight: string;
    headlineEnd: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    activeUsers: string;
    liveStats: string;
    cards: {
      questCompleted: string;
      questName: string;
      xp: string;
      rank: string;
      achievementUnlocked: string;
      achievementName: string;
      leaderboardTitle: string;
      player1: string;
      player2: string;
      player3: string;
    };
  };
  services: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubhead: string;
    viewDemo: string;
    closeDemo: string;
    items: ServiceItem[];
  };
  features: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubhead: string;
    items: FeatureItem[];
  };
  stats: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubhead: string;
    items: StatItem[];
  };
  testimonials: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubhead: string;
    items: TestimonialItem[];
  };
  faq: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubhead: string;
    items: FaqItem[];
  };
  contact: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubhead: string;
    formName: string;
    formEmail: string;
    formCompany: string;
    formService: string;
    formServicePlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    formSubmitting: string;
    successTitle: string;
    successMessage: string;
    successButton: string;
    servicesList: string[];
  };
  footer: {
    desc: string;
    linksTitle: string;
    servicesTitle: string;
    legalTitle: string;
    rights: string;
  };
  about: AboutTranslations;
  products: ProductsTranslations;
}
