import { isDocker, isSSR } from "@/utils/helpers";

export const mainMenu = [
  {
    id: 16,
    name: "Статьи",
    slug: "articles",
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
    slug: "contacts",
    icon: "phone",
  },
];

export const settings = {
  siteUrl: process.env.CLIENT_HOST,
  uploadUrl: isDocker
    ? process.env.UPLOAD_HOST_DOCKER
    : process.env.UPLOAD_HOST,
  apiUrl: process.env.API_HOST,
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
      url: "images/og-preview.jpg",
      width: "1200",
      height: "630",
      alt: "Вечерний ставрополь",
    },
  },
  contacts: {
    phone: "+7(8652)75-99-59",
    fax: "+7(8652)75-93-50",
    email: "vechorka@vechorka.ru",
    socials: [
      { href: "https://telegram.org", label: "Telegram", name: "telegram" },
      { href: "https://vk.com", label: "Вконтакте", name: "vk" },
      { href: "https://twitter.com", label: "Twitter", name: "twitter" },
      { href: "https://youtube.com", label: "Youtube", name: "youtube" },
      { href: "https://ok.ru", label: "Одноклассники", name: "ok" },
    ],
  },
};
