/**
 * Ichki sahifalar va umumiy UI uchun ko'p tilli matnlar.
 * (Asosiy `translations.ts` ni buzmaslik uchun alohida, modulli to'plam.)
 */
import type { Language } from "@/context/AppContext";

export interface PageDict {
  common: {
    readMore: string;
    viewAll: string;
    all: string;
    search: string;
    searchPlaceholder: string;
    backHome: string;
    back: string;
    share: string;
    views: string;
    date: string;
    download: string;
    openMap: string;
    phone: string;
    email: string;
    address: string;
    workTime: string;
    loading: string;
    notFound: string;
    notFoundDesc: string;
    error: string;
    errorDesc: string;
    retry: string;
    page: string;
    more: string;
    details: string;
    apply: string;
    seeProfile: string;
    appeal: string;
  };
  footer: {
    about: string;
    aboutText: string;
    quickLinks: string;
    sections: string;
    contact: string;
    followUs: string;
    rights: string;
    developed: string;
    allRights: string;
  };
  titles: {
    news: string;
    videoNews: string;
    announcements: string;
    leadership: string;
    structure: string;
    faculties: string;
    chairs: string;
    departments: string;
    programs: string;
    documents: string;
    journals: string;
    vacancies: string;
    partners: string;
    faq: string;
    contact: string;
    about: string;
    gallery: string;
  };
  subtitles: {
    news: string;
    videoNews: string;
    leadership: string;
    faculties: string;
    chairs: string;
    programs: string;
    documents: string;
    journals: string;
    vacancies: string;
    partners: string;
    faq: string;
  };
  contactForm: {
    title: string;
    name: string;
    phone: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
  };
  programs: {
    bachelor: string;
    master: string;
    duration: string;
    years: string;
    code: string;
    daytime: string;
    parttime: string;
    directions: string;
  };
  vacancy: {
    location: string;
    schedule: string;
    salary: string;
    posted: string;
  };
  leadershipPage: {
    rectorate: string;
    reception: string;
    duties: string;
    bio: string;
    contactInfo: string;
  };
  home: {
    badge: string;
    since: string;
    heroLead: string;
    admission: string;
    aboutInstitute: string;
    quickLinks: string;
    statsNote: string;
    students: string;
    professors: string;
    facultiesCount: string;
    directionsCount: string;
    directions: string;
    directionsSubtitle: string;
    activity: string;
    activitySubtitle: string;
    education: string;
    educationText: string;
    science: string;
    scienceText: string;
    international: string;
    internationalText: string;
    spiritual: string;
    spiritualText: string;
    systems: string;
    systemsSubtitle: string;
    usefulLinks: string;
    usefulLinksSubtitle: string;
    ctaTitle: string;
    ctaText: string;
    pressService: string;
    structureEyebrow: string;
    educationEyebrow: string;
    aboutEyebrow: string;
    digitalEyebrow: string;
    resourcesEyebrow: string;
  };
}

export const pages: Record<Language, PageDict> = {
  uz: {
    common: {
      readMore: "Batafsil",
      viewAll: "Barchasini ko'rish",
      all: "Barchasi",
      search: "Qidirish",
      searchPlaceholder: "Qidiruv...",
      backHome: "Bosh sahifaga",
      back: "Orqaga",
      share: "Ulashish",
      views: "ko'rishlar",
      date: "Sana",
      download: "Yuklab olish",
      openMap: "Xaritada ochish",
      phone: "Telefon",
      email: "Elektron pochta",
      address: "Manzil",
      workTime: "Ish vaqti",
      loading: "Yuklanmoqda...",
      notFound: "Sahifa topilmadi",
      notFoundDesc: "Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan.",
      error: "Xatolik yuz berdi",
      errorDesc:
        "Sahifani ko'rsatishda kutilmagan xatolik yuz berdi. Qayta urinib ko'ring yoki keyinroq tashrif buyuring.",
      retry: "Qayta urinish",
      page: "Sahifa",
      more: "Ko'proq",
      details: "Tafsilotlar",
      apply: "Ariza topshirish",
      seeProfile: "Profilni ko'rish",
      appeal: "Murojaat",
    },
    footer: {
      about: "Institut haqida",
      aboutText:
        "Guliston davlat pedagogika instituti — Sirdaryo viloyatida malakali pedagog kadrlar tayyorlovchi yetakchi oliy ta'lim muassasasi.",
      quickLinks: "Tezkor havolalar",
      sections: "Bo'limlar",
      contact: "Bog'lanish",
      followUs: "Ijtimoiy tarmoqlar",
      rights: "Barcha huquqlar himoyalangan.",
      developed: "Ishlab chiqildi",
      allRights: "Barcha huquqlar himoyalangan",
    },
    titles: {
      news: "Yangiliklar",
      videoNews: "Video yangiliklar",
      announcements: "E'lonlar",
      leadership: "Rahbariyat",
      structure: "Institut tuzilmasi",
      faculties: "Fakultetlar",
      chairs: "Kafedralar",
      departments: "Bo'limlar",
      programs: "Ta'lim yo'nalishlari",
      documents: "Hujjatlar",
      journals: "Ilmiy jurnallar",
      vacancies: "Bo'sh ish o'rinlari",
      partners: "Hamkorlar",
      faq: "Ko'p beriladigan savollar",
      contact: "Aloqa",
      about: "Institut haqida",
      gallery: "Galereya",
    },
    subtitles: {
      news: "Institut hayoti, ilmiy yutuqlar va so'nggi voqealar",
      videoNews: "Institutimiz hayotidan video lavhalar",
      leadership: "Institut rahbariyati va mas'ul shaxslar",
      faculties: "Institutimizdagi fakultetlar va ularning tarkibi",
      chairs: "Kafedralar va professor-o'qituvchilar tarkibi",
      programs: "Bakalavriat va magistratura yo'nalishlari",
      documents: "Me'yoriy hujjatlar, buyruqlar va nizomlar",
      journals: "Institutda nashr etiladigan ilmiy jurnallar",
      vacancies: "Jamoamizga qo'shiling — ochiq lavozimlar",
      partners: "Hamkor universitetlar va tashkilotlar",
      faq: "Ko'pchilikni qiziqtiradigan savollarga javoblar",
    },
    contactForm: {
      title: "Bizga murojaat qiling",
      name: "Ismingiz",
      phone: "Telefon raqamingiz",
      message: "Xabaringiz",
      submit: "Yuborish",
      sending: "Yuborilmoqda...",
      success: "Murojaatingiz qabul qilindi! Tez orada bog'lanamiz.",
      error: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      required: "Bu maydon to'ldirilishi shart",
    },
    programs: {
      bachelor: "Bakalavriat",
      master: "Magistratura",
      duration: "O'qish muddati",
      years: "yil",
      code: "Yo'nalish kodi",
      daytime: "Kunduzgi",
      parttime: "Sirtqi",
      directions: "yo'nalishlar",
    },
    vacancy: {
      location: "Manzil",
      schedule: "Ish jadvali",
      salary: "Maosh",
      posted: "E'lon qilingan",
    },
    leadershipPage: {
      rectorate: "Rektorat",
      reception: "Qabul kunlari",
      duties: "Vazifalari",
      bio: "Tarjimai hol",
      contactInfo: "Bog'lanish ma'lumotlari",
    },
    home: {
      badge: "Davlat oliy ta'lim muassasasi",
      since: "2022-yildan buyon pedagog kadrlar tayyorlaymiz",
      heroLead:
        "Guliston davlat pedagogika instituti — Sirdaryo viloyatida pedagogik ta'lim markazi. Zamonaviy metodika, ilmiy salohiyat va amaliyotga yo'naltirilgan ta'lim.",
      admission: "Qabul",
      aboutInstitute: "Institut haqida",
      quickLinks: "Tezkor havolalar",
      statsNote:
        "Ko'rsatkichlar joriy o'quv yili ma'lumotlari asosida shakllantirilgan.",
      students: "Talabalar soni",
      professors: "Professor-o'qituvchilar",
      facultiesCount: "Fakultetlar",
      directionsCount: "Ta'lim yo'nalishlari",
      directions: "Ta'lim yo'nalishlari",
      directionsSubtitle:
        "Bakalavriat va magistratura bo'yicha ta'lim yo'nalishlari ro'yxati",
      activity: "Institut faoliyati",
      activitySubtitle:
        "Ta'lim, ilm-fan, xalqaro hamkorlik va ma'naviy-ma'rifiy yo'nalishdagi ishlarimiz",
      education: "Ta'lim",
      educationText:
        "Bakalavriat, magistratura va oliy ta'limdan keyingi ta'lim bosqichlari bo'yicha yuqori malakali pedagog kadrlar tayyorlash.",
      science: "Ilm-fan",
      scienceText:
        "Ilmiy kengashlar, ilmiy-metodik jurnallar, laboratoriyalar va talabalar ilmiy to'garaklari faoliyati.",
      international: "Xalqaro hamkorlik",
      internationalText:
        "Xorijiy oliygohlar bilan qo'shma ta'lim dasturlari, xalqaro grantlar va almashinuv imkoniyatlari.",
      spiritual: "Ma'naviy-ma'rifiy ishlar",
      spiritualText:
        "Talabalar turar joyi, to'garaklar, sport va madaniy tadbirlar, ko'ngillilar harakati.",
      systems: "Bizning tizimlarimiz",
      systemsSubtitle:
        "Institutning raqamli platformalari — talabalar va xodimlar uchun",
      usefulLinks: "Foydali havolalar",
      usefulLinksSubtitle: "Ta'lim va davlat xizmatlarining elektron tizimlari",
      ctaTitle: "Kelajak o'qituvchilari shu yerda tayyorlanadi",
      ctaText: "Kelajak sari birinchi qadamni biz bilan boshlang.",
      pressService: "Axborot xizmati",
      structureEyebrow: "Institut tuzilmasi",
      educationEyebrow: "Ta'lim",
      aboutEyebrow: "Institut haqida",
      digitalEyebrow: "Raqamli platformalar",
      resourcesEyebrow: "Resurslar",
    },
  },
  ru: {
    common: {
      readMore: "Подробнее",
      viewAll: "Смотреть все",
      all: "Все",
      search: "Поиск",
      searchPlaceholder: "Поиск...",
      backHome: "На главную",
      back: "Назад",
      share: "Поделиться",
      views: "просмотров",
      date: "Дата",
      download: "Скачать",
      openMap: "Открыть на карте",
      phone: "Телефон",
      email: "Эл. почта",
      address: "Адрес",
      workTime: "Время работы",
      loading: "Загрузка...",
      notFound: "Страница не найдена",
      notFoundDesc: "Запрашиваемая страница не существует или была удалена.",
      error: "Произошла ошибка",
      errorDesc:
        "При отображении страницы произошла непредвиденная ошибка. Попробуйте снова или зайдите позже.",
      retry: "Повторить",
      page: "Страница",
      more: "Ещё",
      details: "Подробности",
      apply: "Подать заявку",
      seeProfile: "Смотреть профиль",
      appeal: "Обращение",
    },
    footer: {
      about: "Об институте",
      aboutText:
        "Гулистанский государственный педагогический институт — ведущий вуз Сырдарьинской области по подготовке квалифицированных педагогических кадров.",
      quickLinks: "Быстрые ссылки",
      sections: "Разделы",
      contact: "Контакты",
      followUs: "Социальные сети",
      rights: "Все права защищены.",
      developed: "Разработано",
      allRights: "Все права защищены",
    },
    titles: {
      news: "Новости",
      videoNews: "Видео новости",
      announcements: "Объявления",
      leadership: "Руководство",
      structure: "Структура института",
      faculties: "Факультеты",
      chairs: "Кафедры",
      departments: "Отделы",
      programs: "Направления обучения",
      documents: "Документы",
      journals: "Научные журналы",
      vacancies: "Вакансии",
      partners: "Партнёры",
      faq: "Часто задаваемые вопросы",
      contact: "Контакты",
      about: "Об институте",
      gallery: "Галерея",
    },
    subtitles: {
      news: "Жизнь института, научные достижения и последние события",
      videoNews: "Видеосюжеты из жизни нашего института",
      leadership: "Руководство института и ответственные лица",
      faculties: "Факультеты института и их состав",
      chairs: "Кафедры и профессорско-преподавательский состав",
      programs: "Направления бакалавриата и магистратуры",
      documents: "Нормативные документы, приказы и положения",
      journals: "Научные журналы, издаваемые институтом",
      vacancies: "Присоединяйтесь к нашей команде — открытые позиции",
      partners: "Университеты-партнёры и организации",
      faq: "Ответы на интересующие многих вопросы",
    },
    contactForm: {
      title: "Свяжитесь с нами",
      name: "Ваше имя",
      phone: "Ваш телефон",
      message: "Ваше сообщение",
      submit: "Отправить",
      sending: "Отправка...",
      success: "Ваше обращение принято! Мы скоро свяжемся с вами.",
      error: "Произошла ошибка. Пожалуйста, попробуйте снова.",
      required: "Это поле обязательно для заполнения",
    },
    programs: {
      bachelor: "Бакалавриат",
      master: "Магистратура",
      duration: "Срок обучения",
      years: "года",
      code: "Код направления",
      daytime: "Очное",
      parttime: "Заочное",
      directions: "направлений",
    },
    vacancy: {
      location: "Адрес",
      schedule: "График работы",
      salary: "Зарплата",
      posted: "Опубликовано",
    },
    leadershipPage: {
      rectorate: "Ректорат",
      reception: "Приёмные дни",
      duties: "Обязанности",
      bio: "Биография",
      contactInfo: "Контактная информация",
    },
    home: {
      badge: "Государственное высшее учебное заведение",
      since: "С 2022 года готовим педагогические кадры",
      heroLead:
        "Гулистанский государственный педагогический институт — центр педагогического образования Сырдарьинской области. Современные методики, научный потенциал и практико-ориентированное обучение.",
      admission: "Приём",
      aboutInstitute: "Об институте",
      quickLinks: "Быстрые ссылки",
      statsNote:
        "Показатели сформированы на основе данных текущего учебного года.",
      students: "Количество студентов",
      professors: "Профессорско-преподавательский состав",
      facultiesCount: "Факультеты",
      directionsCount: "Направления образования",
      directions: "Направления образования",
      directionsSubtitle:
        "Перечень направлений бакалавриата и магистратуры",
      activity: "Деятельность института",
      activitySubtitle:
        "Наша работа в сфере образования, науки, международного сотрудничества и духовно-просветительской деятельности",
      education: "Образование",
      educationText:
        "Подготовка высококвалифицированных педагогических кадров по программам бакалавриата, магистратуры и послевузовского образования.",
      science: "Наука",
      scienceText:
        "Научные советы, научно-методические журналы, лаборатории и студенческие научные кружки.",
      international: "Международное сотрудничество",
      internationalText:
        "Совместные образовательные программы с зарубежными вузами, международные гранты и программы обмена.",
      spiritual: "Духовно-просветительская работа",
      spiritualText:
        "Студенческое общежитие, кружки, спортивные и культурные мероприятия, волонтёрское движение.",
      systems: "Наши системы",
      systemsSubtitle:
        "Цифровые платформы института — для студентов и сотрудников",
      usefulLinks: "Полезные ссылки",
      usefulLinksSubtitle:
        "Электронные системы образования и государственных услуг",
      ctaTitle: "Здесь готовят учителей будущего",
      ctaText: "Сделайте первый шаг в будущее вместе с нами.",
      pressService: "Пресс-служба",
      structureEyebrow: "Структура института",
      educationEyebrow: "Образование",
      aboutEyebrow: "Об институте",
      digitalEyebrow: "Цифровые платформы",
      resourcesEyebrow: "Ресурсы",
    },
  },
  en: {
    common: {
      readMore: "Read more",
      viewAll: "View all",
      all: "All",
      search: "Search",
      searchPlaceholder: "Search...",
      backHome: "Back home",
      back: "Back",
      share: "Share",
      views: "views",
      date: "Date",
      download: "Download",
      openMap: "Open in map",
      phone: "Phone",
      email: "Email",
      address: "Address",
      workTime: "Working hours",
      loading: "Loading...",
      notFound: "Page not found",
      notFoundDesc: "The page you are looking for does not exist or was removed.",
      error: "Something went wrong",
      errorDesc:
        "An unexpected error occurred while rendering this page. Please try again or come back later.",
      retry: "Try again",
      page: "Page",
      more: "More",
      details: "Details",
      apply: "Apply",
      seeProfile: "See profile",
      appeal: "Appeals",
    },
    footer: {
      about: "About the Institute",
      aboutText:
        "Gulistan State Pedagogical Institute is a leading higher education institution in the Sirdaryo region training qualified pedagogical staff.",
      quickLinks: "Quick links",
      sections: "Sections",
      contact: "Contact",
      followUs: "Follow us",
      rights: "All rights reserved.",
      developed: "Developed by",
      allRights: "All rights reserved",
    },
    titles: {
      news: "News",
      videoNews: "Video news",
      announcements: "Announcements",
      leadership: "Leadership",
      structure: "Institute structure",
      faculties: "Faculties",
      chairs: "Academic chairs",
      departments: "Departments",
      programs: "Academic programs",
      documents: "Documents",
      journals: "Scientific journals",
      vacancies: "Vacancies",
      partners: "Partners",
      faq: "Frequently asked questions",
      contact: "Contact",
      about: "About the Institute",
      gallery: "Gallery",
    },
    subtitles: {
      news: "Institute life, scientific achievements and latest events",
      videoNews: "Video stories from the life of our institute",
      leadership: "Institute leadership and responsible officials",
      faculties: "The institute's faculties and their structure",
      chairs: "Academic chairs and the teaching staff",
      programs: "Bachelor's and master's degree programs",
      documents: "Regulatory documents, orders and statutes",
      journals: "Scientific journals published by the institute",
      vacancies: "Join our team — open positions",
      partners: "Partner universities and organizations",
      faq: "Answers to the most common questions",
    },
    contactForm: {
      title: "Get in touch",
      name: "Your name",
      phone: "Your phone",
      message: "Your message",
      submit: "Send",
      sending: "Sending...",
      success: "Your message has been received! We will contact you soon.",
      error: "An error occurred. Please try again.",
      required: "This field is required",
    },
    programs: {
      bachelor: "Bachelor's",
      master: "Master's",
      duration: "Duration",
      years: "years",
      code: "Program code",
      daytime: "Full-time",
      parttime: "Part-time",
      directions: "programs",
    },
    vacancy: {
      location: "Location",
      schedule: "Schedule",
      salary: "Salary",
      posted: "Posted",
    },
    leadershipPage: {
      rectorate: "Rectorate",
      reception: "Reception days",
      duties: "Responsibilities",
      bio: "Biography",
      contactInfo: "Contact information",
    },
    home: {
      badge: "State higher education institution",
      since: "Training teachers since 2022",
      heroLead:
        "Gulistan State Pedagogical Institute is the centre of pedagogical education in the Syrdarya region. Modern methodology, research capacity and practice-oriented teaching.",
      admission: "Admission",
      aboutInstitute: "About the institute",
      quickLinks: "Quick links",
      statsNote:
        "Figures are based on data for the current academic year.",
      students: "Students",
      professors: "Academic staff",
      facultiesCount: "Faculties",
      directionsCount: "Study programmes",
      directions: "Study programmes",
      directionsSubtitle:
        "List of bachelor's and master's degree programmes",
      activity: "Institute activities",
      activitySubtitle:
        "Our work in education, research, international cooperation and student life",
      education: "Education",
      educationText:
        "Training highly qualified teachers through bachelor's, master's and postgraduate programmes.",
      science: "Research",
      scienceText:
        "Academic councils, scientific journals, laboratories and student research groups.",
      international: "International cooperation",
      internationalText:
        "Joint programmes with foreign universities, international grants and exchange opportunities.",
      spiritual: "Student life",
      spiritualText:
        "Student dormitories, clubs, sports and cultural events, volunteer movement.",
      systems: "Our systems",
      systemsSubtitle:
        "The institute's digital platforms for students and staff",
      usefulLinks: "Useful links",
      usefulLinksSubtitle:
        "Electronic systems for education and public services",
      ctaTitle: "The teachers of tomorrow are trained here",
      ctaText: "Take your first step towards the future with us.",
      pressService: "Press service",
      structureEyebrow: "Institute structure",
      educationEyebrow: "Education",
      aboutEyebrow: "About the institute",
      digitalEyebrow: "Digital platforms",
      resourcesEyebrow: "Resources",
    },
  },
};
