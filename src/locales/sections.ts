/**
 * Menyu bo'limlari va "Qabul" sahifasi uchun ko'p tilli matnlar.
 *
 * Menyu tuzilishi samdpi.uz, qabul sahifasining bo'limlari esa jdpu.uz
 * saytidagi tartibga moslashtirilgan.
 */
import type { Language } from "@/context/AppContext";

/** Menyu guruhlari uchun qo'shimcha yorliqlar. */
export interface NavExtraDict {
  education: string;
  departments: string;
  councils: string;
  requisites: string;
  regulations: string;
  openData: string;
  tutors: string;
  pressService: string;
  activity: string;
  research: string;
  internationalCooperation: string;
  antiCorruption: string;
  studentLife: string;
  dormitory: string;
  talentedStudents: string;
  library: string;
}

export const navExtra: Record<Language, NavExtraDict> = {
  uz: {
    education: "Ta'lim",
    departments: "Boshqarma va bo'limlar",
    councils: "Kengashlar",
    requisites: "Rekvizitlar",
    regulations: "Me'yoriy hujjatlar va nizomlar",
    openData: "Ochiq ma'lumotlar",
    tutors: "Tyutorlar",
    pressService: "Axborot xizmati",
    activity: "Faoliyat",
    research: "Ilmiy faoliyat",
    internationalCooperation: "Xalqaro hamkorlik",
    antiCorruption: "Korrupsiyaga qarshi kurashish",
    studentLife: "Talabalar hayoti",
    dormitory: "Talabalar turar joyi",
    talentedStudents: "Iqtidorli talabalar",
    library: "Elektron kutubxona",
  },
  ru: {
    education: "Образование",
    departments: "Управления и отделы",
    councils: "Советы",
    requisites: "Реквизиты",
    regulations: "Нормативные документы и положения",
    openData: "Открытые данные",
    tutors: "Тьюторы",
    pressService: "Пресс-служба",
    activity: "Деятельность",
    research: "Научная деятельность",
    internationalCooperation: "Международное сотрудничество",
    antiCorruption: "Противодействие коррупции",
    studentLife: "Студенческая жизнь",
    dormitory: "Студенческое общежитие",
    talentedStudents: "Одарённые студенты",
    library: "Электронная библиотека",
  },
  en: {
    education: "Education",
    departments: "Divisions and departments",
    councils: "Councils",
    requisites: "Bank details",
    regulations: "Regulations and statutes",
    openData: "Open data",
    tutors: "Tutors",
    pressService: "Press service",
    activity: "Activities",
    research: "Research",
    internationalCooperation: "International cooperation",
    antiCorruption: "Anti-corruption",
    studentLife: "Student life",
    dormitory: "Student dormitory",
    talentedStudents: "Talented students",
    library: "Digital library",
  },
};

/** Qabul sahifasidagi bitta kartochka. */
export interface AdmissionCard {
  title: string;
  desc: string;
  /**
   * Kartochkaning o'z sahifasi manzili (`/admissions/{slug}`).
   * Faqat uz ro'yxatida beriladi — qolgan tillar indeks bo'yicha mos keladi.
   */
  slug?: string;
  /** Tashqi yoki boshqa bo'limga havola. */
  href?: string;
}

export interface AdmissionsDict {
  title: string;
  subtitle: string;
  note: string;
  tabs: {
    commission: string;
    bachelor: string;
    master: string;
    second: string;
    foreign: string;
  };
  cards: {
    commission: AdmissionCard[];
    bachelor: AdmissionCard[];
    master: AdmissionCard[];
    second: AdmissionCard[];
    foreign: AdmissionCard[];
  };
}

export const admissions: Record<Language, AdmissionsDict> = {
  uz: {
    title: "Qabul",
    subtitle:
      "Abituriyentlar uchun qabul komissiyasi, hujjat topshirish tartibi, imtihonlar va muddatlar bo'yicha barcha ma'lumotlar.",
    note: "Ma'lumotlar joriy qabul kampaniyasi davomida yangilanib boriladi. Aniqlik uchun qabul komissiyasiga murojaat qiling.",
    tabs: {
      commission: "Qabul komissiyasi",
      bachelor: "Bakalavriat",
      master: "Magistratura",
      second: "Ikkinchi oliy ta'lim",
      foreign: "Xorijiy fuqarolar",
    },
    cards: {
      commission: [
        {
          title: "Qabul komissiyasi tarkibi",
          slug: "qabul-komissiyasi-tarkibi",
          desc: "Abituriyentlarni qabul qilish, hujjatlarni tekshirish va kirish imtihonlarini tashkil etuvchi vakolatli xodimlar guruhi.",
        },
        {
          title: "Qabul komissiyasi mas'ullari",
          slug: "qabul-komissiyasi-masullari",
          desc: "Joriy o'quv yili qabulini yuqori saviyada o'tkazish bo'yicha belgilangan mas'ul shaxslar.",
        },
        {
          title: "Qabul kunlari",
          slug: "qabul-kunlari",
          desc: "Hujjat topshirish, maslahat olish va xizmat ko'rsatish amalga oshiriladigan sana va vaqtlar.",
        },
        {
          title: "Konsultatsiya markazi (Call-center)",
          slug: "konsultatsiya-markazi-call-center",
          desc: "Abituriyentlar va ota-onalarga hujjatlar hamda muddatlar bo'yicha telefon va onlayn maslahat beruvchi bo'linma.",
        },
        {
          title: "Qabul komissiyasi joylashuvi",
          slug: "qabul-komissiyasi-joylashuvi",
          desc: "Hujjat topshirish punkti manzili va unga qanday yetib borish haqida ma'lumot.",
        },
        {
          title: "Me'yoriy hujjatlar",
          slug: "meyoriy-hujjatlar",
          desc: "Qabul jarayonini tartibga soluvchi qarorlar, nizomlar va yo'riqnomalar.",
          href: "/documents",
        },
      ],
      bachelor: [
        {
          title: "Eslatma",
          slug: "eslatma",
          desc: "Bakalavriat abituriyentlari uchun hujjat topshirish muddati, kirish imtihonlari va muhim bosqichlar.",
        },
        {
          title: "Qabul nizomi",
          slug: "qabul-nizomi",
          desc: "Abituriyentlarni ta'lim dasturlariga qabul qilish tartibi, qoidalari va shartlarini belgilovchi hujjat.",
        },
        {
          title: "Qabul kvotasi",
          slug: "qabul-kvotasi",
          desc: "Ta'lim yo'nalishlari bo'yicha ajratilgan o'rinlar soni — davlat granti va to'lov-kontrakt asosida.",
        },
        {
          title: "Zarur hujjatlar ro'yxati",
          slug: "zarur-hujjatlar-royxati",
          desc: "Institutga kirish uchun abituriyent taqdim etishi kerak bo'lgan hujjatlar ro'yxati.",
        },
        {
          title: "Imtihon fanlari ro'yxati",
          slug: "imtihon-fanlari-royxati",
          desc: "Tanlangan yo'nalish bo'yicha topshiriladigan test yoki imtihon fanlari.",
        },
        {
          title: "Kontrakt summasi",
          slug: "kontrakt-summasi",
          desc: "Ta'lim yo'nalishi va o'qish shakli bo'yicha belgilangan kontrakt to'lovi miqdori.",
        },
        {
          title: "Imtiyozlar",
          slug: "imtiyozlar",
          desc: "Ayrim toifadagi abituriyentlar uchun qonunchilikda belgilangan yengillik va ustunliklar.",
        },
        {
          title: "Kasbiy (ijodiy) imtihon dasturi",
          slug: "kasbiy-ijodiy-imtihon-dasturi",
          desc: "Ijodiy imtihonlarning mazmuni, o'tkazish tartibi va baholash mezonlari.",
        },
        {
          title: "Kasbiy (ijodiy) imtihon natijalari",
          slug: "kasbiy-ijodiy-imtihon-natijalari",
          desc: "Ijodiy imtihonlardan so'ng abituriyentlarga qo'yilgan rasmiy ball va natijalar.",
        },
        {
          title: "Texnikum bitiruvchilari uchun",
          slug: "texnikum-bitiruvchilari-uchun",
          desc: "Texnikum bitiruvchilarini suhbat asosida qabul qilish tartibi, shartlari va imtiyozlari.",
        },
        {
          title: "Nogironligi bo'lgan abituriyentlar uchun",
          slug: "nogironligi-bolgan-abituriyentlar-uchun",
          desc: "Maxsus sharoitlar, moslashtirilgan imtihon shakllari va materiallar haqida ma'lumot.",
        },
      ],
      master: [
        {
          title: "Eslatma",
          slug: "magistratura-eslatma",
          desc: "Magistratura abituriyentlari uchun hujjat topshirish muddati va muhim bosqichlar.",
        },
        {
          title: "Qabul nizomi",
          slug: "magistratura-qabul-nizomi",
          desc: "Magistratura dasturlariga qabul qilish qoidalari, shartlari va tartibi.",
        },
        {
          title: "Qabul kvotasi",
          slug: "magistratura-qabul-kvotasi",
          desc: "Magistratura mutaxassisliklari bo'yicha ajratilgan o'rinlar soni.",
        },
        {
          title: "Zarur hujjatlar ro'yxati",
          slug: "magistratura-zarur-hujjatlar-royxati",
          desc: "Magistraturaga kirishda topshirilishi kerak bo'lgan hujjatlar ro'yxati.",
        },
        {
          title: "Imtihon fanlari ro'yxati",
          slug: "magistratura-imtihon-fanlari-royxati",
          desc: "Magistraturaga kirishda topshiriladigan imtihon va test fanlari.",
        },
        {
          title: "Kirish imtihonlari savollar banki",
          slug: "kirish-imtihonlari-savollar-banki",
          desc: "Magistratura kirish imtihonlari uchun namunaviy topshiriqlar va savollar to'plami.",
        },
        {
          title: "Imtihon natijalari",
          slug: "imtihon-natijalari",
          desc: "Magistratura kirish imtihonlaridan keyin e'lon qilinadigan rasmiy ball va natijalar.",
        },
      ],
      second: [
        {
          title: "Ikkinchi oliy ta'lim to'g'risidagi nizom",
          slug: "ikkinchi-oliy-talim-togrisidagi-nizom",
          desc: "Ikkinchi va undan keyingi oliy ta'lim olish tartibini belgilovchi hujjat.",
        },
        {
          title: "Qabul shartlari",
          slug: "qabul-shartlari",
          desc: "Ikkinchi oliy ta'limga hujjat topshirish shartlari, muddatlari va talablari.",
        },
        {
          title: "Kontrakt summasi",
          slug: "ikkinchi-oliy-kontrakt-summasi",
          desc: "Ikkinchi oliy ta'lim yo'nalishlari bo'yicha belgilangan kontrakt to'lovi.",
        },
        {
          title: "O'qishni ko'chirish",
          slug: "oqishni-kochirish",
          desc: "Boshqa oliy ta'lim muassasasidan o'qishni ko'chirish tartibi va zarur hujjatlar.",
        },
      ],
      foreign: [
        {
          title: "Xorijiy fuqarolarni qabul qilish tartibi",
          slug: "xorijiy-fuqarolarni-qabul-qilish-tartibi",
          desc: "Xorijiy abituriyentlarning hujjat topshirishi, tanlov va o'qish huquqini rasmiylashtirish tartibi.",
        },
        {
          title: "Zarur hujjatlar",
          slug: "zarur-hujjatlar",
          desc: "Xorijiy fuqarolar taqdim etishi kerak bo'lgan hujjatlar va ularni legallashtirish talablari.",
        },
        {
          title: "Vatandoshlar uchun",
          slug: "vatandoshlar-uchun",
          desc: "Xorijda istiqomat qiluvchi vatandoshlar uchun qabul bo'yicha alohida shartlar.",
        },
      ],
    },
  },

  ru: {
    title: "Приём",
    subtitle:
      "Вся информация для абитуриентов: приёмная комиссия, порядок подачи документов, экзамены и сроки.",
    note: "Информация обновляется в ходе текущей приёмной кампании. За уточнением обращайтесь в приёмную комиссию.",
    tabs: {
      commission: "Приёмная комиссия",
      bachelor: "Бакалавриат",
      master: "Магистратура",
      second: "Второе высшее образование",
      foreign: "Иностранные граждане",
    },
    cards: {
      commission: [
        {
          title: "Состав приёмной комиссии",
          desc: "Группа уполномоченных сотрудников, организующих приём абитуриентов, проверку документов и вступительные экзамены.",
        },
        {
          title: "Ответственные приёмной комиссии",
          desc: "Лица, назначенные ответственными за проведение приёма в текущем учебном году.",
        },
        {
          title: "Дни приёма",
          desc: "Даты и время подачи документов, консультаций и обслуживания абитуриентов.",
        },
        {
          title: "Консультационный центр (Call-center)",
          desc: "Подразделение, консультирующее абитуриентов и родителей по телефону и онлайн.",
        },
        {
          title: "Расположение приёмной комиссии",
          desc: "Адрес пункта приёма документов и информация о том, как до него добраться.",
        },
        {
          title: "Нормативные документы",
          desc: "Постановления, положения и инструкции, регулирующие процесс приёма.",
          href: "/documents",
        },
      ],
      bachelor: [
        {
          title: "Памятка",
          desc: "Сроки подачи документов, вступительные экзамены и важные этапы для абитуриентов бакалавриата.",
        },
        {
          title: "Положение о приёме",
          desc: "Документ, определяющий порядок, правила и условия приёма на образовательные программы.",
        },
        {
          title: "Квота приёма",
          desc: "Количество мест по направлениям образования — на основе гранта и по контракту.",
        },
        {
          title: "Перечень необходимых документов",
          desc: "Список документов, которые абитуриент должен представить для поступления.",
        },
        {
          title: "Перечень экзаменационных предметов",
          desc: "Предметы тестирования или экзаменов по выбранному направлению.",
        },
        {
          title: "Сумма контракта",
          desc: "Размер контрактной оплаты по направлению и форме обучения.",
        },
        {
          title: "Льготы",
          desc: "Льготы и преимущества, установленные законодательством для отдельных категорий абитуриентов.",
        },
        {
          title: "Программа творческого экзамена",
          desc: "Содержание, порядок проведения и критерии оценки творческих экзаменов.",
        },
        {
          title: "Результаты творческих экзаменов",
          desc: "Официальные баллы и результаты, выставленные после творческих экзаменов.",
        },
        {
          title: "Для выпускников техникумов",
          desc: "Порядок, условия и льготы приёма выпускников техникумов на основе собеседования.",
        },
        {
          title: "Для абитуриентов с инвалидностью",
          desc: "Специальные условия, адаптированные формы экзаменов и материалы.",
        },
      ],
      master: [
        {
          title: "Памятка",
          desc: "Сроки подачи документов и важные этапы для абитуриентов магистратуры.",
        },
        {
          title: "Положение о приёме",
          desc: "Правила, условия и порядок приёма на программы магистратуры.",
        },
        {
          title: "Квота приёма",
          desc: "Количество мест по специальностям магистратуры.",
        },
        {
          title: "Перечень необходимых документов",
          desc: "Документы, необходимые для поступления в магистратуру.",
        },
        {
          title: "Перечень экзаменационных предметов",
          desc: "Экзамены и тесты, сдаваемые при поступлении в магистратуру.",
        },
        {
          title: "Банк вопросов вступительных экзаменов",
          desc: "Типовые задания и вопросы для вступительных экзаменов в магистратуру.",
        },
        {
          title: "Результаты экзаменов",
          desc: "Официальные баллы и результаты вступительных экзаменов в магистратуру.",
        },
      ],
      second: [
        {
          title: "Положение о втором высшем образовании",
          desc: "Документ, определяющий порядок получения второго и последующего высшего образования.",
        },
        {
          title: "Условия приёма",
          desc: "Условия, сроки и требования при подаче документов на второе высшее образование.",
        },
        {
          title: "Сумма контракта",
          desc: "Размер контрактной оплаты по направлениям второго высшего образования.",
        },
        {
          title: "Перевод обучения",
          desc: "Порядок перевода из другого вуза и необходимые документы.",
        },
      ],
      foreign: [
        {
          title: "Порядок приёма иностранных граждан",
          desc: "Подача документов, конкурсный отбор и оформление права на обучение для иностранных абитуриентов.",
        },
        {
          title: "Необходимые документы",
          desc: "Документы для иностранных граждан и требования к их легализации.",
        },
        {
          title: "Для соотечественников",
          desc: "Отдельные условия приёма для соотечественников, проживающих за рубежом.",
        },
      ],
    },
  },

  en: {
    title: "Admission",
    subtitle:
      "Everything applicants need: the admission committee, how to submit documents, entrance exams and deadlines.",
    note: "This information is updated throughout the current admission campaign. Contact the admission committee to confirm details.",
    tabs: {
      commission: "Admission committee",
      bachelor: "Bachelor's",
      master: "Master's",
      second: "Second degree",
      foreign: "International applicants",
    },
    cards: {
      commission: [
        {
          title: "Committee members",
          desc: "The authorised staff who organise admissions, verify documents and run entrance examinations.",
        },
        {
          title: "Responsible officers",
          desc: "Staff appointed to oversee the admission campaign for the current academic year.",
        },
        {
          title: "Admission days",
          desc: "Dates and times for submitting documents, getting advice and receiving assistance.",
        },
        {
          title: "Call centre",
          desc: "The unit advising applicants and parents by phone and online about documents and deadlines.",
        },
        {
          title: "Where to find us",
          desc: "The address of the document intake point and how to get there.",
        },
        {
          title: "Regulations",
          desc: "Decrees, statutes and instructions governing the admission process.",
          href: "/documents",
        },
      ],
      bachelor: [
        {
          title: "Key reminders",
          desc: "Submission deadlines, entrance examinations and important milestones for bachelor's applicants.",
        },
        {
          title: "Admission statute",
          desc: "The document setting out the procedure, rules and conditions for admission to study programmes.",
        },
        {
          title: "Admission quota",
          desc: "The number of places per programme — state grant and tuition-based.",
        },
        {
          title: "Required documents",
          desc: "The list of documents an applicant must submit.",
        },
        {
          title: "Examination subjects",
          desc: "The tests or examinations taken for the chosen programme.",
        },
        {
          title: "Tuition fee",
          desc: "The contract fee set for each programme and mode of study.",
        },
        {
          title: "Benefits and privileges",
          desc: "Statutory benefits available to certain categories of applicants.",
        },
        {
          title: "Creative examination programme",
          desc: "The content, procedure and assessment criteria of creative examinations.",
        },
        {
          title: "Creative examination results",
          desc: "Official scores and results awarded after the creative examinations.",
        },
        {
          title: "For college graduates",
          desc: "Admission by interview for graduates of vocational colleges: procedure, conditions and benefits.",
        },
        {
          title: "For applicants with disabilities",
          desc: "Special arrangements, adapted examination formats and materials.",
        },
      ],
      master: [
        {
          title: "Key reminders",
          desc: "Submission deadlines and important milestones for master's applicants.",
        },
        {
          title: "Admission statute",
          desc: "Rules, conditions and procedure for admission to master's programmes.",
        },
        {
          title: "Admission quota",
          desc: "The number of places available per master's specialisation.",
        },
        {
          title: "Required documents",
          desc: "Documents required for admission to a master's programme.",
        },
        {
          title: "Examination subjects",
          desc: "Examinations and tests taken for master's admission.",
        },
        {
          title: "Question bank",
          desc: "Sample tasks and questions for master's entrance examinations.",
        },
        {
          title: "Examination results",
          desc: "Official scores and results published after master's entrance examinations.",
        },
      ],
      second: [
        {
          title: "Second degree statute",
          desc: "The document governing admission to a second or subsequent higher education degree.",
        },
        {
          title: "Admission conditions",
          desc: "Conditions, deadlines and requirements for second degree applications.",
        },
        {
          title: "Tuition fee",
          desc: "The contract fee set for second degree programmes.",
        },
        {
          title: "Transfer of studies",
          desc: "How to transfer from another university and which documents are needed.",
        },
      ],
      foreign: [
        {
          title: "Admission of international applicants",
          desc: "How international applicants submit documents, compete for places and formalise their right to study.",
        },
        {
          title: "Required documents",
          desc: "Documents required from international applicants and legalisation requirements.",
        },
        {
          title: "For compatriots abroad",
          desc: "Specific admission conditions for compatriots living abroad.",
        },
      ],
    },
  },
};

/** Menyudagi alohida bo'limlar uchun sahifa sarlavhalari. */
export interface SectionPage {
  title: string;
  subtitle: string;
}

export interface SectionPagesDict {
  departments: SectionPage;
  councils: SectionPage;
  requisites: SectionPage;
  openData: SectionPage;
  antiCorruption: SectionPage;
  tutors: SectionPage;
  research: SectionPage;
  international: SectionPage;
  dormitory: SectionPage;
  talented: SectionPage;
  announcements: SectionPage;
  /** Kontent hali kiritilmaganda ko'rsatiladigan izoh. */
  pending: string;
  /** Umumiy yorliqlar. */
  labels: {
    documents: string;
    relatedLinks: string;
    contact: string;
    hotline: string;
    bankDetails: string;
    /** Fakultet/kafedra detal sahifasidagi guruh sarlavhalari. */
    head: string;
    staff: string;
  };
}

export const sectionPages: Record<Language, SectionPagesDict> = {
  uz: {
    departments: {
      title: "Boshqarma va bo'limlar",
      subtitle:
        "Institut boshqaruv tuzilmasidagi boshqarma, bo'lim va markazlar hamda ularning mas'ul xodimlari.",
    },
    councils: {
      title: "Kengashlar",
      subtitle:
        "Institutda faoliyat yurituvchi ilmiy, o'quv-uslubiy va boshqa kengashlar tarkibi va qarorlari.",
    },
    requisites: {
      title: "Rekvizitlar",
      subtitle:
        "Institutning rasmiy bank rekvizitlari, soliq ma'lumotlari va aloqa manzillari.",
    },
    openData: {
      title: "Ochiq ma'lumotlar",
      subtitle:
        "Qonunchilikka muvofiq ommaga oshkor etiladigan hisobot, statistika va moliyaviy ma'lumotlar.",
    },
    antiCorruption: {
      title: "Korrupsiyaga qarshi kurashish",
      subtitle:
        "Komplayens-nazorat tizimi, korrupsiyaga qarshi choralar va murojaat qilish tartibi.",
    },
    tutors: {
      title: "Tyutorlar",
      subtitle:
        "Talabalar bilan ishlovchi tyutorlar tarkibi, ularning guruhlari va aloqa ma'lumotlari.",
    },
    research: {
      title: "Ilmiy faoliyat",
      subtitle:
        "Ilmiy kengashlar, jurnallar, laboratoriyalar, grantlar va talabalar ilmiy to'garaklari.",
    },
    international: {
      title: "Xalqaro hamkorlik",
      subtitle:
        "Xorijiy oliygohlar bilan hamkorlik, qo'shma dasturlar, grantlar va almashinuv imkoniyatlari.",
    },
    dormitory: {
      title: "Talabalar turar joyi",
      subtitle:
        "Yotoqxonaga joylashish tartibi, shartlar, to'lov va bo'sh o'rinlar haqida ma'lumot.",
    },
    talented: {
      title: "Iqtidorli talabalar",
      subtitle:
        "Olimpiada, tanlov va ilmiy anjumanlarda muvaffaqiyat qozongan talabalarimiz.",
    },
    announcements: {
      title: "E'lonlar",
      subtitle: "Institut bo'yicha rasmiy e'lonlar, tadbirlar va muhim xabarlar.",
    },
    pending:
      "Bu bo'lim ma'lumotlari admin panel orqali to'ldiriladi. Kontent kiritilgach, u shu yerda avtomatik ko'rinadi.",
    labels: {
      documents: "Hujjatlar",
      relatedLinks: "Tegishli bo'limlar",
      contact: "Bog'lanish",
      hotline: "Ishonch telefoni",
      bankDetails: "Bank rekvizitlari",
      head: "Bo'lim rahbari",
      staff: "Professor-o'qituvchilar",
    },
  },

  ru: {
    departments: {
      title: "Управления и отделы",
      subtitle:
        "Управления, отделы и центры в структуре института, а также ответственные сотрудники.",
    },
    councils: {
      title: "Советы",
      subtitle:
        "Состав и решения научных, учебно-методических и других советов института.",
    },
    requisites: {
      title: "Реквизиты",
      subtitle:
        "Официальные банковские реквизиты, налоговые данные и контактные адреса института.",
    },
    openData: {
      title: "Открытые данные",
      subtitle:
        "Отчёты, статистика и финансовые данные, раскрываемые в соответствии с законодательством.",
    },
    antiCorruption: {
      title: "Противодействие коррупции",
      subtitle:
        "Система комплаенс-контроля, антикоррупционные меры и порядок обращения.",
    },
    tutors: {
      title: "Тьюторы",
      subtitle:
        "Состав тьюторов, работающих со студентами, их группы и контактные данные.",
    },
    research: {
      title: "Научная деятельность",
      subtitle:
        "Научные советы, журналы, лаборатории, гранты и студенческие научные кружки.",
    },
    international: {
      title: "Международное сотрудничество",
      subtitle:
        "Сотрудничество с зарубежными вузами, совместные программы, гранты и обмены.",
    },
    dormitory: {
      title: "Студенческое общежитие",
      subtitle:
        "Порядок заселения, условия, оплата и информация о свободных местах.",
    },
    talented: {
      title: "Одарённые студенты",
      subtitle:
        "Наши студенты, добившиеся успехов на олимпиадах, конкурсах и научных конференциях.",
    },
    announcements: {
      title: "Объявления",
      subtitle: "Официальные объявления, мероприятия и важные сообщения института.",
    },
    pending:
      "Материалы этого раздела заполняются через админ-панель. После добавления контента он появится здесь автоматически.",
    labels: {
      documents: "Документы",
      relatedLinks: "Смежные разделы",
      contact: "Контакты",
      hotline: "Телефон доверия",
      bankDetails: "Банковские реквизиты",
      head: "Руководитель подразделения",
      staff: "Профессорско-преподавательский состав",
    },
  },

  en: {
    departments: {
      title: "Divisions and departments",
      subtitle:
        "The divisions, departments and centres within the institute's management structure and their staff.",
    },
    councils: {
      title: "Councils",
      subtitle:
        "Membership and decisions of the institute's academic, methodological and other councils.",
    },
    requisites: {
      title: "Bank details",
      subtitle:
        "The institute's official banking details, tax information and contact addresses.",
    },
    openData: {
      title: "Open data",
      subtitle:
        "Reports, statistics and financial data disclosed in accordance with the law.",
    },
    antiCorruption: {
      title: "Anti-corruption",
      subtitle:
        "The compliance control system, anti-corruption measures and how to report concerns.",
    },
    tutors: {
      title: "Tutors",
      subtitle:
        "The tutors who work with students, their groups and contact details.",
    },
    research: {
      title: "Research",
      subtitle:
        "Academic councils, journals, laboratories, grants and student research groups.",
    },
    international: {
      title: "International cooperation",
      subtitle:
        "Cooperation with foreign universities, joint programmes, grants and exchanges.",
    },
    dormitory: {
      title: "Student dormitory",
      subtitle:
        "How to apply for accommodation, conditions, fees and availability of places.",
    },
    talented: {
      title: "Talented students",
      subtitle:
        "Students who have excelled at olympiads, competitions and academic conferences.",
    },
    announcements: {
      title: "Announcements",
      subtitle: "Official announcements, events and important notices from the institute.",
    },
    pending:
      "This section is filled in through the admin panel. Once content is added it will appear here automatically.",
    labels: {
      documents: "Documents",
      relatedLinks: "Related sections",
      contact: "Contact",
      hotline: "Trust line",
      bankDetails: "Bank details",
      head: "Head of the unit",
      staff: "Academic staff",
    },
  },
};

/**
 * gspi.uz saytidan olingan qo'shimcha bo'limlar.
 * Kontent admin panel orqali to'ldiriladi — bu yerda faqat sarlavhalar.
 */
export type ExtraPageKey =
  | "instituteHistory"
  | "studyPlans"
  | "studySchedule"
  | "syllabus"
  | "qualificationRequirements"
  | "gallery"
  | "conferences"
  | "spiritual"
  | "informationHours"
  | "career"
  | "greenInstitute"
  | "ecoStudents"
  | "eResources"
  | "employers";

export const extraPages: Record<Language, Record<ExtraPageKey, SectionPage>> = {
  uz: {
    instituteHistory: {
      title: "Institut tarixi",
      subtitle: "Institutning tashkil etilishi, rivojlanish bosqichlari va muhim sanalar.",
    },
    studyPlans: {
      title: "O'quv rejalari",
      subtitle: "Ta'lim yo'nalishlari bo'yicha tasdiqlangan o'quv rejalari.",
    },
    studySchedule: {
      title: "Dars jadvali",
      subtitle: "Joriy semestr uchun mashg'ulotlar jadvali va o'zgarishlar.",
    },
    syllabus: {
      title: "Sillabus va fanlar majmuasi",
      subtitle: "Fanlar bo'yicha sillabuslar va o'quv-uslubiy majmualar.",
    },
    qualificationRequirements: {
      title: "Malaka talablari",
      subtitle: "Ta'lim yo'nalishlari bo'yicha davlat ta'lim standartlari va malaka talablari.",
    },
    gallery: {
      title: "Fotogalereya",
      subtitle: "Institut hayoti va tadbirlaridan fotolavhalar.",
    },
    conferences: {
      title: "Konferensiyalar",
      subtitle: "Institutda o'tkaziladigan ilmiy-amaliy anjuman va seminarlar.",
    },
    spiritual: {
      title: "Ma'naviy-ma'rifiy ishlar",
      subtitle: "Ma'naviyat minbari, tarbiyaviy tadbirlar va targ'ibot ishlari.",
    },
    informationHours: {
      title: "Axborot soatlari",
      subtitle: "Talabalar bilan o'tkaziladigan axborot soatlari mavzulari va jadvali.",
    },
    career: {
      title: "Karyera markazi",
      subtitle: "Bitiruvchilarni ishga joylashtirish, amaliyot va karyera bo'yicha xizmatlar.",
    },
    greenInstitute: {
      title: "Yashil institut",
      subtitle: "Ekologik tashabbuslar, ko'kalamzorlashtirish va resurs tejash loyihalari.",
    },
    ecoStudents: {
      title: "Ekofaol talabalar",
      subtitle: "Ekologik harakatda faol ishtirok etuvchi talabalar va ularning loyihalari.",
    },
    eResources: {
      title: "Elektron resurslar",
      subtitle: "Elektron darsliklar, ma'lumotlar bazalari va onlayn kutubxonalar.",
    },
    employers: {
      title: "Ish beruvchilar uchun",
      subtitle: "Bitiruvchilarni jalb qilish, hamkorlik va amaliyot bo'yicha ma'lumotlar.",
    },
  },

  ru: {
    instituteHistory: {
      title: "История института",
      subtitle: "Создание института, этапы развития и важные даты.",
    },
    studyPlans: {
      title: "Учебные планы",
      subtitle: "Утверждённые учебные планы по направлениям образования.",
    },
    studySchedule: {
      title: "Расписание занятий",
      subtitle: "Расписание на текущий семестр и изменения в нём.",
    },
    syllabus: {
      title: "Силлабусы и УМК",
      subtitle: "Силлабусы по предметам и учебно-методические комплексы.",
    },
    qualificationRequirements: {
      title: "Квалификационные требования",
      subtitle: "Государственные образовательные стандарты и квалификационные требования.",
    },
    gallery: {
      title: "Фотогалерея",
      subtitle: "Фотографии из жизни института и с мероприятий.",
    },
    conferences: {
      title: "Конференции",
      subtitle: "Научно-практические конференции и семинары института.",
    },
    spiritual: {
      title: "Духовно-просветительская работа",
      subtitle: "Воспитательные мероприятия и просветительская деятельность.",
    },
    informationHours: {
      title: "Информационные часы",
      subtitle: "Темы и расписание информационных часов со студентами.",
    },
    career: {
      title: "Центр карьеры",
      subtitle: "Трудоустройство выпускников, практика и карьерные услуги.",
    },
    greenInstitute: {
      title: "Зелёный институт",
      subtitle: "Экологические инициативы, озеленение и проекты ресурсосбережения.",
    },
    ecoStudents: {
      title: "Экоактивные студенты",
      subtitle: "Студенты, активно участвующие в экологическом движении, и их проекты.",
    },
    eResources: {
      title: "Электронные ресурсы",
      subtitle: "Электронные учебники, базы данных и онлайн-библиотеки.",
    },
    employers: {
      title: "Работодателям",
      subtitle: "Привлечение выпускников, сотрудничество и организация практики.",
    },
  },

  en: {
    instituteHistory: {
      title: "History of the institute",
      subtitle: "The founding of the institute, its stages of development and key dates.",
    },
    studyPlans: {
      title: "Curricula",
      subtitle: "Approved curricula for each study programme.",
    },
    studySchedule: {
      title: "Class schedule",
      subtitle: "The timetable for the current semester and any changes to it.",
    },
    syllabus: {
      title: "Syllabi and course materials",
      subtitle: "Subject syllabi and teaching and methodological complexes.",
    },
    qualificationRequirements: {
      title: "Qualification requirements",
      subtitle: "State educational standards and qualification requirements per programme.",
    },
    gallery: {
      title: "Photo gallery",
      subtitle: "Photographs from institute life and events.",
    },
    conferences: {
      title: "Conferences",
      subtitle: "Academic and practical conferences and seminars held at the institute.",
    },
    spiritual: {
      title: "Student development",
      subtitle: "Educational events and awareness-raising activities.",
    },
    informationHours: {
      title: "Information hours",
      subtitle: "Topics and schedule of information hours held with students.",
    },
    career: {
      title: "Career centre",
      subtitle: "Graduate employment, internships and career services.",
    },
    greenInstitute: {
      title: "Green institute",
      subtitle: "Environmental initiatives, landscaping and resource-saving projects.",
    },
    ecoStudents: {
      title: "Eco-active students",
      subtitle: "Students active in the environmental movement and their projects.",
    },
    eResources: {
      title: "Electronic resources",
      subtitle: "Electronic textbooks, databases and online libraries.",
    },
    employers: {
      title: "For employers",
      subtitle: "Recruiting graduates, cooperation and organising internships.",
    },
  },
};

/** Murojaat sahifasi (forma va holat tekshirish) uchun matnlar. */
export interface AppealDict {
  /** Sahifa sarlavhasi ostidagi izoh. */
  heroLead: string;
  formTitle: string;
  formLead: string;
  type: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  file: string;
  fileHint: string;
  submit: string;
  sending: string;
  successTitle: string;
  successLead: string;
  ticketLabel: string;
  copyTicket: string;
  copied: string;
  newAppeal: string;
  error: string;
  /** Holat tekshirish bloki */
  checkTitle: string;
  checkLead: string;
  checkPlaceholder: string;
  check: string;
  checking: string;
  notFound: string;
  status: string;
  answer: string;
  submittedAt: string;
  answeredAt: string;
  noAnswerYet: string;
}

export const appeal: Record<Language, AppealDict> = {
  uz: {
    heroLead:
      "Murojaatingiz ro'yxatga olinadi, ariza raqami beriladi va qonunchilikda belgilangan muddatlarda ko'rib chiqiladi.",
    formTitle: "Murojaat yuborish",
    formLead:
      "Ism-sharifingiz va aloqa ma'lumotlaringizni to'liq ko'rsating — javob shular asosida yuboriladi.",
    type: "Murojaat turi",
    name: "Ism-sharifingiz",
    phone: "Telefon raqamingiz",
    email: "Elektron pochta",
    address: "Manzilingiz",
    message: "Murojaat matni",
    file: "Fayl biriktirish",
    fileHint: "PDF, DOC, DOCX, JPG yoki PNG — 10 MB gacha",
    submit: "Murojaatni yuborish",
    sending: "Yuborilmoqda...",
    successTitle: "Murojaatingiz qabul qilindi",
    successLead:
      "Ariza raqamini saqlab qo'ying — murojaat holatini shu raqam orqali kuzatasiz.",
    ticketLabel: "Ariza raqami",
    copyTicket: "Nusxalash",
    copied: "Nusxalandi",
    newAppeal: "Yangi murojaat yuborish",
    error: "Murojaatni yuborib bo'lmadi. Iltimos, qayta urinib ko'ring.",
    checkTitle: "Murojaat holatini tekshirish",
    checkLead: "Ariza raqamingizni kiriting va murojaatingiz qay bosqichdaligini ko'ring.",
    checkPlaceholder: "MRJ-2026-000123",
    check: "Tekshirish",
    checking: "Tekshirilmoqda...",
    notFound: "Bunday ariza raqami topilmadi. Raqamni tekshirib qayta kiriting.",
    status: "Holati",
    answer: "Javob",
    submittedAt: "Yuborilgan sana",
    answeredAt: "Javob berilgan sana",
    noAnswerYet: "Murojaat ko'rib chiqilmoqda, javob hali berilmagan.",
  },

  ru: {
    heroLead:
      "Ваше обращение регистрируется, ему присваивается номер, и оно рассматривается в установленные законодательством сроки.",
    formTitle: "Отправить обращение",
    formLead:
      "Укажите полностью ФИО и контактные данные — ответ будет направлен по ним.",
    type: "Тип обращения",
    name: "Ваше ФИО",
    phone: "Номер телефона",
    email: "Электронная почта",
    address: "Ваш адрес",
    message: "Текст обращения",
    file: "Прикрепить файл",
    fileHint: "PDF, DOC, DOCX, JPG или PNG — до 10 МБ",
    submit: "Отправить обращение",
    sending: "Отправка...",
    successTitle: "Ваше обращение принято",
    successLead:
      "Сохраните номер заявки — по нему вы сможете отслеживать статус обращения.",
    ticketLabel: "Номер заявки",
    copyTicket: "Копировать",
    copied: "Скопировано",
    newAppeal: "Отправить новое обращение",
    error: "Не удалось отправить обращение. Пожалуйста, попробуйте ещё раз.",
    checkTitle: "Проверить статус обращения",
    checkLead: "Введите номер заявки и узнайте, на каком этапе ваше обращение.",
    checkPlaceholder: "MRJ-2026-000123",
    check: "Проверить",
    checking: "Проверка...",
    notFound: "Заявка с таким номером не найдена. Проверьте номер и попробуйте снова.",
    status: "Статус",
    answer: "Ответ",
    submittedAt: "Дата отправки",
    answeredAt: "Дата ответа",
    noAnswerYet: "Обращение рассматривается, ответ пока не дан.",
  },

  en: {
    heroLead:
      "Your appeal is registered, assigned a reference number and reviewed within the periods set by law.",
    formTitle: "Submit an appeal",
    formLead:
      "Give your full name and contact details — the response will be sent using them.",
    type: "Type of appeal",
    name: "Full name",
    phone: "Phone number",
    email: "Email address",
    address: "Your address",
    message: "Your message",
    file: "Attach a file",
    fileHint: "PDF, DOC, DOCX, JPG or PNG — up to 10 MB",
    submit: "Send appeal",
    sending: "Sending...",
    successTitle: "Your appeal has been received",
    successLead:
      "Save the reference number — you can track the status of your appeal with it.",
    ticketLabel: "Reference number",
    copyTicket: "Copy",
    copied: "Copied",
    newAppeal: "Submit another appeal",
    error: "The appeal could not be sent. Please try again.",
    checkTitle: "Check the status of an appeal",
    checkLead: "Enter your reference number to see the stage your appeal is at.",
    checkPlaceholder: "MRJ-2026-000123",
    check: "Check",
    checking: "Checking...",
    notFound: "No appeal was found with that number. Please check it and try again.",
    status: "Status",
    answer: "Response",
    submittedAt: "Submitted on",
    answeredAt: "Answered on",
    noAnswerYet: "The appeal is under review; no response has been given yet.",
  },
};

/**
 * `extraPages` / `sectionPages` kaliti → frontend marshruti (va backend slug'i).
 * Backend `menus.slug` va `GET /pages/{slug}` shu qiymatlarni ishlatadi.
 */
export const PAGE_SLUGS: Record<string, string> = {
  // sectionPages
  departments: "departments",
  councils: "councils",
  requisites: "requisites",
  openData: "open-data",
  antiCorruption: "anti-corruption",
  tutors: "tutors",
  research: "research",
  international: "international",
  dormitory: "dormitory",
  talented: "talented-students",
  announcements: "announcements",
  // extraPages
  instituteHistory: "institute-history",
  studyPlans: "study-plans",
  studySchedule: "study-schedule",
  syllabus: "syllabus",
  qualificationRequirements: "qualification-requirements",
  gallery: "gallery",
  conferences: "conferences",
  spiritual: "spiritual",
  informationHours: "information-hours",
  career: "career",
  greenInstitute: "green-institute",
  ecoStudents: "eco-students",
  eResources: "e-resources",
  employers: "employers",
};

/** Qabul hisoblagichi va tadbirlar kalendari matnlari. */
export interface CountdownDict {
  /** Qabul boshlanishidan oldin */
  beforeTitle: string;
  beforeLead: string;
  /** Qabul davom etayotganda */
  duringTitle: string;
  duringLead: string;
  /** Tugagandan keyin */
  endedTitle: string;
  endedLead: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  more: string;
}

export const countdown: Record<Language, CountdownDict> = {
  uz: {
    beforeTitle: "Hujjat qabuliga qoldi",
    beforeLead: "Hujjat topshirish muddati boshlanishiga sanoqli kunlar qoldi.",
    duringTitle: "Hujjat qabuli davom etmoqda",
    duringLead: "Hujjat topshirish muddati tugashiga qoldi:",
    endedTitle: "Hujjat qabuli yakunlandi",
    endedLead: "Joriy o'quv yili uchun hujjat topshirish muddati tugadi.",
    days: "kun",
    hours: "soat",
    minutes: "daqiqa",
    seconds: "soniya",
    more: "Qabul haqida",
  },
  ru: {
    beforeTitle: "До начала приёма документов",
    beforeLead: "До начала срока подачи документов осталось совсем немного.",
    duringTitle: "Приём документов идёт",
    duringLead: "До окончания приёма документов осталось:",
    endedTitle: "Приём документов завершён",
    endedLead: "Срок подачи документов на текущий учебный год завершён.",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",
    more: "О приёме",
  },
  en: {
    beforeTitle: "Until applications open",
    beforeLead: "Only a few days remain until the application period begins.",
    duringTitle: "Applications are open",
    duringLead: "Time remaining to submit your documents:",
    endedTitle: "Applications are closed",
    endedLead: "The application period for this academic year has ended.",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    more: "About admission",
  },
};

/** Tadbirlar kalendari matnlari. */
export interface EventsDict {
  title: string;
  subtitle: string;
  upcoming: string;
  noEvents: string;
  noEventsOnDay: string;
  today: string;
  allEvents: string;
  months: string[];
  weekdays: string[];
}

export const events: Record<Language, EventsDict> = {
  uz: {
    title: "Tadbirlar kalendari",
    subtitle:
      "Institutda o'tkaziladigan konferensiya, uchrashuv va boshqa tadbirlar jadvali.",
    upcoming: "Yaqin tadbirlar",
    noEvents: "Hozircha rejalashtirilgan tadbirlar yo'q.",
    noEventsOnDay: "Bu kunda tadbir belgilanmagan.",
    today: "Bugun",
    allEvents: "Barcha tadbirlar",
    months: [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
    ],
    weekdays: ["Du", "Se", "Chor", "Pay", "Ju", "Sha", "Yak"],
  },
  ru: {
    title: "Календарь мероприятий",
    subtitle:
      "Расписание конференций, встреч и других мероприятий института.",
    upcoming: "Ближайшие мероприятия",
    noEvents: "Запланированных мероприятий пока нет.",
    noEventsOnDay: "На этот день мероприятия не назначены.",
    today: "Сегодня",
    allEvents: "Все мероприятия",
    months: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ],
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  },
  en: {
    title: "Events calendar",
    subtitle:
      "Schedule of conferences, meetings and other events held at the institute.",
    upcoming: "Upcoming events",
    noEvents: "No events are scheduled yet.",
    noEventsOnDay: "No events are scheduled for this day.",
    today: "Today",
    allEvents: "All events",
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
};
