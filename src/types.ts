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
}
