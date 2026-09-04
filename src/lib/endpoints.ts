/**
 * Barcha backend API endpointlari bitta joyda.
 * O'zgarish bo'lsa faqat shu yerni tahrirlaymiz.
 */
export const endpoints = {
  // Sayt ma'lumotlari va menyu
  /** Sayt ma'lumotlari + menyu + modal xabarlar — bitta so'rovda. */
  bootstrap: "/bootstrap",
  siteInfo: "/siteinfo",
  menu: "/menu",

  // Bannerlar va reklama
  banners: "/banners",
  reklama: "/reklama",

  // Yangiliklar
  news: "/news",
  newsItem: (slug: string) => `/news/${slug}`,
  videoNews: "/video_news",
  videoNewsItem: (slug: string) => `/video_news/${slug}`,
  categories: "/categories",
  category: (slug: string) => `/categories/${slug}`,


  // Rahbariyat va tuzilma
  leaderships: "/leaderships",
  leadership: (slug: string) => `/leaderships/${slug}`,
  department: "/department",
  departmentItem: (slug: string) => `/department/${slug}`,
  faculties: "/fakultet",
  faculty: (slug: string) => `/fakultet/${slug}`,
  chairs: "/kafedralar",
  chair: (slug: string) => `/kafedralar/${slug}`,

  // Ta'lim dasturlari
  educationalPrograms: "/educational-programs",
  educationalProgram: (id: string | number) => `/educational-programs/${id}`,

  // Hujjatlar va jurnallar
  documents: "/documents",
  journals: "/journals",
  journal: (slug: string) => `/journals/${slug}`,

  // Vakansiyalar, hamkorlar, FAQ
  vacancies: "/vacancies",
  vacancy: (id: string | number) => `/vacancies/${id}`,
  partners: "/partners",
  faq: "/faq",

  // Aloqa (POST)
  contacts: "/contacts",

  // Murojaatlar moduli
  appealMeta: "/murojaat/meta",
  appeals: "/murojaat",
  appeal: (ticket: string) => `/murojaat/${encodeURIComponent(ticket)}`,

  // Admin paneldan boshqariladigan dinamik sahifalar
  pages: "/pages",
  page: (slug: string) => `/pages/${slug}`,
  pageItem: (slug: string, item: string) => `/pages/${slug}/${item}`,

  // Saytga kirilganda ochiladigan xabarlar va tabriklar
  popups: "/popups",
  birthdays: "/birthdays",

  // Tadbirlar kalendari
  events: "/events",
  event: (slug: string) => `/events/${slug}`,

  // Galereya
  gallery: "/gallery",
  galleryAlbum: (id: string | number) => `/gallery/${id}`,
  photos: "/photos",

  // Tyutorlar va lavozimlar
  tutors: "/tutors",
  positions: "/positions",
  documentCategories: "/document-categories",
} as const;
