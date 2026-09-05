/**
 * Laravel backend API javoblari uchun TypeScript tiplari.
 * Backend ko'p tilli: matnlar joriy tilga moslab (Accept-Language) qaytariladi.
 */

/** Uch o'lchamli rasm to'plami (lg/md/sm URL). */
export interface ImageSet {
  lg: string | null;
  md: string | null;
  sm: string | null;
}

/** Laravel paginate() javobining standart shakli. */
export interface Paginated<T> {
  data: T[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

/** Yangilik / post. */
export interface Post {
  id: number;
  title: string | null;
  subtitle?: string | null;
  desc: string | null;
  images: ImageSet[];
  categories: { id: number; slug?: string | null; name?: string | null; title?: string | null }[];
  date: string | null;
  url: string | null;
  views_count: number | null;
  slug: string;
  file?: string | null;
  video_link?: string | null;
  meta_keywords?: string | null;
}

/** Yangiliklar kategoriyasi. */
export interface Category {
  id: number;
  title: string | null;
  desc: string | null;
  children?: Category[];
  images?: ImageSet;
  in_main?: number | null;
  view?: number | null;
  slug: string;
}

/** Kategoriya sahifasi javobi (kategoriya + postlar). */
export interface CategoryWithPosts {
  category: Category;
  posts: Paginated<Post>;
}

/** Sayt umumiy ma'lumotlari (kontaktlar, statistika, ijtimoiy tarmoqlar). */
export interface SiteInfo {
  id: number;
  title: string | null;
  logo_dark: string | null;
  desc: string | null;
  /** Yuqori paneldagi shior. */
  tagline?: string | null;
  /** Sayt pastidagi shior. */
  slogan?: string | null;
  /** Hujjat qabuli boshlanish sanasi (YYYY-MM-DD) — hisoblagich uchun. */
  admission_starts_at?: string | null;
  /** Hujjat qabuli tugash sanasi. */
  admission_ends_at?: string | null;
  /** Qabul haqida batafsil sahifa manzili. */
  admission_url?: string | null;
  address: string | null;
  phone_number: string | null;
  /** Call markaz raqami. Bo'sh bo'lsa `phone_number` ishlatiladi. */
  call_center?: string | null;
  email: string | null;
  work_time: string | null;
  map: string | null;
  exchange: string | null;
  favicon: string | null;
  logo: string | null;
  telegram: string | null;
  instagram: string | null;
  yt_url: string | null;
  facebook: string | null;
  youtube: string | null;
  audience_size: string | number | null;
  educational_programs: string | number | null;
  green_zone: string | number | null;
  library_collection: string | number | null;
  number_of_students: string | number | null;
  male_students: string | number | null;
  female_students: string | number | null;
  /** Bank rekvizitlari — /requisites sahifasi uchun. */
  requisites?: {
    legal_name: string | null;
    bank_name: string | null;
    bank_account: string | null;
    treasury_account: string | null;
    mfo: string | null;
    inn: string | null;
    oked: string | null;
  } | null;
}

/** Bosh sahifa banneri (Brand). */
export interface Banner {
  id: number;
  title: string | null;
  desc: string | null;
  url: string | null;
  action: string | null;
  images: ImageSet;
}

/** Reklama (modal / pop-up). */
export interface Reklama {
  id: number;
  title: string | null;
  url: string | null;
  logo: string | null;
}

/** Tez-tez beriladigan savol. */
export interface Faq {
  id: number;
  question: string | null;
  answer: string | null;
}

/** Hamkor. */
export interface Partner {
  id: number;
  title: string | null;
  photo: ImageSet;
  link: string | null;
}

/** Hujjat turkumi. */
export interface DocumentCategory {
  id: number;
  slug: string;
  title: string | null;
  documents_count?: number;
  images?: ImageSet;
  children?: DocumentCategory[];
}

/** Hujjat. */
export interface DocumentItem {
  id: number;
  title: string | null;
  link: string | null;
  date: string | null;
  file: string | null;
  category?: { id: number; slug: string; title: string | null } | null;
}

/** Jurnal (ilmiy nashr — Service modeli). */
export interface Journal {
  id: number;
  title: string | null;
  desc: string | null;
  views_count: number | null;
  slug: string | null;
  date: string | null;
  photo: ImageSet;
}

/** Vakansiya. */
export interface Vacancy {
  id: number;
  title: string | null;
  desc: string | null;
  week: string | null;
  price: string | null;
  photo: ImageSet;
  date: string | null;
  views_count: number | null;
  location: string | null;
}

/** Xodim (rahbar / o'qituvchi). */
export interface Employee {
  id: number;
  slug?: string | null;
  id_employ?: number;
  first_name: string | null;
  last_name: string | null;
  surname?: string | null;
  email?: string | null;
  address?: string | null;
  phone?: string | null;
  photo: string | null;
  dec?: string | null;
  birthday?: string | null;
  gender?: string | null;
  status?: number | string | null;
  started_work?: string | null;
  leader?: number | null;
  professor?: number | null;
  position?: { id: number; name: Record<string, string> | string } | null;
  employ_form?: string | null;
  employ_staff?: string | null;
  employ_type?: string | null;
}

/** Rahbariyat bo'limi (rektorat). */
export interface LeadershipGroup {
  id: number;
  name: string | null;
  structure_type: { id: number; name: string | null } | null;
  parent: { id: number; name: string | null } | null;
  active: number | null;
  code: string | null;
  professor_employ: Employee[];
  manage_employ: Employee[];
}

/** Bo'lim / fakultet / kafedra (Department). */
export interface Department {
  id: number;
  name: Record<string, string> | string | null;
  slug: string | null;
  code: string | null;
  active: number | null;
  structure_type_id?: number | null;
}

/** Bo'lim xodimlari javobi (rahbar + oddiy xodimlar). */
export interface DepartmentStaff {
  department_boss: unknown | null;
  simple_employee: unknown[];
}

/** Admin paneldan boshqariladigan navbar menyu elementi (/api/menu). */
export interface MenuItem {
  id: number;
  title: string | null;
  parent_id: number | null;
  path: string | null;
  order: number | null;
  slug: string | null;
  children?: MenuItem[];
}

/** Ta'lim dasturi (yo'nalish). */
export interface EducationalProgram {
  id: number;
  name: string | null;
  slug: string | null;
  active: number | null;
  education_years: string | number | null;
  yt_link: string | null;
  order: number | null;
  code?: string | null;
  photo?: ImageSet;
  icon?: string | null;
  file?: string | null;
  first_description?: string | null;
  second_description?: string | null;
  third_description?: string | null;
  form_education?: string | null;
  daytime?: number | null;
  part_time?: number | null;
  children?: EducationalProgram[];
  employs?: { id: number; name: string; dec?: string | null; photo?: ImageSet }[];
}

/** Talaba (iqtidorli talabalar / mashhur bitiruvchilar bo'limi). */
export interface Student {
  id: number;
  name: string | null;
  dec: string | null;
  position: string | null;
  phone_number: string | null;
  slug: string | null;
  instagram_link?: string | null;
  linkedin_link?: string | null;
  facebook_link?: string | null;
  photo: ImageSet;
}

/** Murojaat holati (backenddagi Appeal::statuses bilan bir xil). */
export type AppealStatus = "new" | "in_review" | "answered" | "rejected";

/** Murojaat turi. */
export type AppealType = "rector" | "tutor" | "compliance";

/** Yuborilgan murojaat. */
export interface Appeal {
  id: number;
  ticket: string;
  type: AppealType;
  type_label: string | null;
  status: AppealStatus;
  status_label: string | null;
  name: string | null;
  message: string | null;
  file: string | null;
  answer: string | null;
  answered_at: string | null;
  created_at: string;
}

/** Murojaat formasi uchun ma'lumotnoma (turlar va holatlar ro'yxati). */
export interface AppealMeta {
  types: { key: AppealType; label: string }[];
  statuses: { key: AppealStatus; label: string }[];
}

/**
 * Xodim — `/department`, `/tutors` endpointlarining tekis shakli.
 *
 * `/leaderships` esa `Employee` (ichma-ich joylashgan) shaklini qaytaradi,
 * shuning uchun ikkalasi alohida tip sifatida saqlanadi.
 */
export interface StaffMember {
  id: number;
  slug: string | null;
  first_name: string | null;
  last_name: string | null;
  surname: string | null;
  /** Backend tayyorlab bergan to'liq ism: "Familiya Ism Otasining ismi". */
  full_name: string | null;
  /** Lavozim nomi joriy tilda. */
  position: string | null;
  work_time: string | null;
  dec: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  gender: string | null;
  leader: boolean;
  professor: boolean;
  photo: string | null;
  department: {
    id: number;
    slug: string | null;
    name: string | null;
    structure_type: { id: number; name: string | null } | null;
  } | null;
  position_ref: { id: number; name: string | null } | null;
}

/** Fotoalbom (galereya). */
export interface GalleryAlbum {
  id: number;
  title: string | null;
  desc: string | null;
  youtube_link: string | null;
  video: string | null;
  images_count: number;
  cover: ImageSet;
  date: string | null;
  /** Faqat bitta albom so'ralganda qaytadi. */
  images?: (ImageSet & { id: number })[];
}

/** Yangiliklarga biriktirilgan rasm (umumiy foto lenta). */
export interface GalleryPhoto extends ImageSet {
  id: number;
  post_slug: string | null;
  post_title: string | null;
  date: string | null;
}

/** Dinamik sahifa turi (backenddagi `layout` maydoni). */
export type PageLayout = "single" | "cards" | "files";

/** Dinamik sahifaga biriktirilgan fayl. */
export interface PageFile {
  /** Backend har doim ham id bermaydi. */
  id?: number;
  title: string | null;
  /** Fayl haqida qisqa izoh — ro'yxatda sarlavha ostida ko'rinadi. */
  desc?: string | null;
  url: string | null;
  size: number | string | null;
  mime: string | null;
  /** Yuklangan yoki hujjat sanasi — yillar bo'yicha guruhlash shu asosda. */
  date: string | null;
  /** Muqova rasmi (ixtiyoriy) — masalan hujjat sahifasining skani. */
  image?: ImageSet | string | null;
}

/** `layout: "cards"` turidagi sahifadagi bitta kartochka. */
export interface PageCard {
  /** Backend har doim ham id bermaydi — kalit sifatida slug ishlatiladi. */
  id?: number;
  slug: string;
  title: string | null;
  desc: string | null;
  image: ImageSet | string | null;
  date: string | null;
  /** Ikonka nomi (lucide-react) — matnli kartochkalar uchun. */
  icon?: string | null;
  /** Bloklar guruhi (masalan "systems", "links", "activity"). */
  group?: string | null;
  order?: number | null;
  link?: string | null;
}

/** Admin paneldan boshqariladigan dinamik sahifa. */
export interface DynamicPage {
  slug: string;
  layout: PageLayout;
  title: string | null;
  subtitle: string | null;
  /** `layout: "single"` uchun HTML tanasi. */
  body?: string | null;
  blocks?: PageCard[];
  files?: PageFile[];
  /** `single` uchun qo'shimcha rasmlar va video. */
  images?: (ImageSet | string)[] | null;
  video?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
}

/** `cards` turidagi sahifaning ichki elementi (alohida sahifa). */
export interface DynamicPageItem {
  slug: string;
  title: string | null;
  subtitle?: string | null;
  desc: string | null;
  body: string | null;
  /** Muqova rasmi. */
  image: ImageSet | string | null;
  /** Qo'shimcha rasmlar — matn ostida galereya bo'lib chiziladi. */
  images?: (ImageSet | string)[] | null;
  /** YouTube yoki boshqa video havolasi. */
  video?: string | null;
  date: string | null;
  files?: PageFile[];
}

/**
 * Saytga kirilganda ochiladigan modal xabar (bayram tabrigi, muhim e'lon).
 * Bir nechta bo'lsa slider ko'rinishida almashadi.
 */
export interface PopupNotice {
  id: number;
  title: string | null;
  /** Qisqa matn yoki HTML tanasi. */
  desc: string | null;
  image: ImageSet | string | null;
  /** Bosilganda o'tiladigan manzil. */
  url: string | null;
  /**
   * Tugma matni. Backend eski  ustunidan mantiqiy qiymat ham
   * qaytarishi mumkin — bu holda standart matn ishlatiladi.
   */
  action: string | boolean | null;
  /** Ko'rsatish oralig'i — backend allaqachon filtrlaydi, ma'lumot uchun. */
  starts_at?: string | null;
  ends_at?: string | null;
}

/** Bugun tug'ilgan kuni bo'lgan xodim. */
export interface BirthdayPerson {
  id: number;
  slug: string | null;
  full_name: string | null;
  position: string | null;
  department: string | null;
  photo: string | null;
  /** Necha yoshga to'lgani (backend hisoblab beradi). */
  age?: number | null;
}

/**
 * Tadbir — kalendar va "yaqin tadbirlar" bloki uchun.
 * Sana `YYYY-MM-DD` ko'rinishida, vaqt alohida maydonda.
 */
export interface CalendarEvent {
  id: number;
  slug: string | null;
  title: string | null;
  desc: string | null;
  /** Boshlanish sanasi (YYYY-MM-DD). */
  date: string;
  /** Ko'p kunlik tadbirlar uchun tugash sanasi. */
  end_date?: string | null;
  /** Boshlanish vaqti (HH:MM). */
  time?: string | null;
  location?: string | null;
  /** Turkum: konferensiya, uchrashuv, imtihon va h.k. */
  type?: string | null;
  /** Batafsil sahifaga havola. */
  url?: string | null;
  image?: ImageSet | string | null;
}
