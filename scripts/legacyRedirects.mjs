/** Legacy WordPress / old marketing URLs → current React routes (301). */
export const legacyRedirects = [
  { source: '/about-us', destination: '/about' },
  { source: '/about-us/', destination: '/about' },
  { source: '/contact-us', destination: '/contact' },
  { source: '/contact-us/', destination: '/contact' },
  { source: '/testimonial', destination: '/testimonials' },
  { source: '/testimonial/', destination: '/testimonials' },
  {
    source:
      '/btr-serenity-ready-to-move-in-luxury-apartments-hyderabad',
    destination: '/btr-serenity',
  },
  {
    source:
      '/btr-serenity-ready-to-move-in-luxury-apartments-hyderabad/',
    destination: '/btr-serenity',
  },
  { source: '/serenity', destination: '/btr-serenity' },
  { source: '/serenity/', destination: '/btr-serenity' },
  { source: '/btr', destination: '/btr-township' },
  { source: '/btr/', destination: '/btr-township' },
  { source: '/gardenia', destination: '/btr-villa-plots' },
  { source: '/gardenia/', destination: '/btr-villa-plots' },
  { source: '/plots', destination: '/btr-villa-plots' },
  { source: '/plots/', destination: '/btr-villa-plots' },
  { source: '/fern-villas', destination: '/fern/index.html' },
  { source: '/fern-villas/', destination: '/fern/index.html' },
]
