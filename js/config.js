/**
 * Central content config for the hero scene.
 * Every user-facing string and asset path lives here.
 */
window.HERO_CONFIG = {
  wordmark: "ANURAG",

  hiddenH1: "Anurag Patole — Project Manager, AI Builder, Author",

  welcomeLine: "WELCOME TO MY WORLD",

  pills: {
    topRight: "AI BUILDER",
    bottomLeft: "INFRA PM",
  },

  header: {
    mark: "ANURAG PATOLE",
    roles: "PM · BUILDER · AUTHOR",
    nav: [
      { label: "JOURNEY", href: "#journey" },
      { label: "PRODUCTS", href: "#" },
      { label: "WRITING", href: "#" },
      { label: "CONTACT", href: "#" },
    ],
    menuLabel: "MENU",
  },

  scrollHint: "SCROLL",

  // Scene 2 — placeholder copy, swap for the real career timeline whenever ready.
  journey: {
    eyebrow: "THE JOURNEY",
    title: "From Infra to Impact",
    intro: "A career spent keeping systems up by day, and building the next ones by night.",
    milestones: [
      {
        year: "2015",
        role: "First infra role",
        description: "Started out on the ground floor of infrastructure — racks, uptime, and 3am pages.",
      },
      {
        year: "2018",
        role: "Became a Project Manager",
        description: "Moved from keeping systems alive to deciding which systems get built next.",
      },
      {
        year: "2021",
        role: "Infra PM at scale",
        description: "Ran cloud infrastructure programs across teams — the day job that funds the night work.",
      },
      {
        year: "2023",
        role: "Started building AI products",
        description: "Nights and weekends turned into shipped AI tools — the builder side takes over.",
      },
      {
        year: "2025",
        role: "Started writing",
        description: "Began writing down what the last decade in infra and AI actually taught me.",
      },
    ],
  },

  assets: {
    platesLandscape: "assets/hero-plate.png",
    platePortrait: "assets/hero-plate.png",
    anurag: "assets/anurag.jpg",
  },

  // Breakpoint (px) below which the portrait composition is used.
  portraitBreakpoint: 820,
};
