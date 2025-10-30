// AdSense configuration and ad slot definitions
export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-9258915549707323',
  adSlots: {
    // Header banner ads (728x90, 320x50 responsive)
    headerBanner: '1234567890',

    // In-content rectangle ads (300x250)
    inContentRectangle: '0987654321',

    // Sidebar vertical banner (160x600, 300x600)
    sidebarVertical: '1122334455',

    // Footer banner ads (728x90, 320x50 responsive)
    footerBanner: '5566778899',
  },

  // Ad formats for different placements
  formats: {
    header: 'auto', // Responsive horizontal
    rectangle: 'rectangle', // 300x250
    vertical: 'vertical', // 160x600 or 300x600
    footer: 'auto', // Responsive horizontal
  },

  // Mobile optimization settings
  responsive: {
    breakpoints: {
      mobile: 768,
      tablet: 1024,
    },
    formats: {
      mobile: 'auto',
      desktop: 'auto',
    },
  },
} as const;

// Ad placement configurations
export const AD_PLACEMENTS = {
  blogPost: {
    header: true,
    inContent: true,
    footer: true,
  },
  categoryPage: {
    header: true,
    sidebar: true,
    footer: true,
  },
  resourcesPage: {
    sidebar: true,
    footer: true,
  },
} as const;