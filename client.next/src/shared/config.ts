export const menuAllNewsItem = {
  id: 9999,
  name: "Все новости",
  slug: "news",
};

export const menuNewsItem = {
  id: 9998,
  slug: "news",
  name: "Новости",
  icon: "earth",
};

export const menuHomeItem = {
  id: 9997,
  name: "Главная",
  slug: "/",
  icon: "house",
};

export const menuMainNewsItem = {
  id: 9996,
  name: "Главные новости",
  slug: "news",
};

export const mainMenu = [
  {
    id: 16,
    name: "Статьи",
    slug: "article",
    icon: "articles",
  },
  {
    id: 17,
    name: "Газета",
    slug: "newspaper",
    icon: "newspaper",
  },
  {
    id: 18,
    name: "О нас",
    slug: "about",
    icon: "about",
  },
  {
    id: 19,
    name: "Рекламные услуги",
    slug: "advertising",
    icon: "ads",
  },
  {
    id: 20,
    name: "Контакты",
    slug: "contact",
    icon: "phone",
  },
];

export const settings = {
  siteUrl: process.env.CLIENT_HOST,
  apiUrl: process.env.API_HOST,
  uploadUrl: process.env.UPLOAD_HOST,
  title: "Вечерний Ставрополь",
  description:
    "Новости, статьи, блоги о событиях в Ставрополе, Ставропольском крае, России, мире.",
  keywords:
    "Вечерний Ставрополь, Вечёрка, новости, газета, Ставрополь, Ставропольский край, статьи, аналитика",
  robots: "index,follow",
  openGraph: {
    title: "Вечерний Ставрополь",
    type: "website",
    locale: "ru_RU",
    description:
      "Новости, статьи, блоги о событиях в Ставрополе, Ставропольском крае, России, мире.",
    site_name: "Вечерний Ставрополь",
    url: process.env.CLIENT_HOST,
    image: {
      url: `${process.env.CLIENT_HOST}/images/og-preview.jpg`,
      width: "1200",
      height: "630",
      alt: "Вечерний ставрополь",
    },
  },
  contacts: {
    phone: "+7(8652)75-99-59",
    fax: "+7(8652)75-93-50",
    email: "vechorka@vechorka.ru",
    fullAddress: "355037, г. Ставрополь, ул. Доваторцев 28/30",
    socials: [
      { href: "https://telegram.org", label: "Telegram", name: "telegram" },
      { href: "https://vk.com", label: "Вконтакте", name: "vk" },
      { href: "https://twitter.com", label: "Twitter", name: "twitter" },
      { href: "https://youtube.com", label: "Youtube", name: "youtube" },
      { href: "https://ok.ru", label: "Одноклассники", name: "ok" },
    ],
  },
};
