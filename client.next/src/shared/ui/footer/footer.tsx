import React from "react";
import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";
import { useSettings } from "@/app/contexts/settings-context";
import { getPhoneFromString } from "@/shared/lib/string";
import Link from "next/link";
import cn from "clsx";
import { SocialLinks } from "@/shared/ui/social-links";

const ListTitle = ({
  title,
  children,
  listClassName,
}: {
  title: string;
  children: React.ReactNode;
  listClassName?: string;
}) => {
  return (
    <>
      <div className="pb-4 mb-4 border-b border-b-grey-200 text-md-10 font-bold">
        {title}
      </div>
      <div className={cn(listClassName, "flex gap-2 text-sm-10")}>
        {children}
      </div>
    </>
  );
};

export const Footer = () => {
  const settings = useSettings();
  const phone = settings?.contacts?.phone;
  const fax = settings?.contacts?.fax;
  const email = settings?.contacts?.email;
  const categories = settings?.taxonomies?.categories?.length
    ? settings.taxonomies.categories
    : [];
  const geographyTags = settings?.taxonomies?.geography?.length
    ? settings.taxonomies.geography
    : [];

  return (
    <footer>
      {/* top */}
      <div className="mt-6 md:mt-12 py-12 bg-grey-100">
        <Container className="flex flex-wrap gap-5 text-center md:text-left">
          {/* col info */}
          <div className="w-full md:flex-1 md:min-w-[300px] text-grey-500">
            <div className="h-[49px] w-[166px] mx-auto md:mx-0">
              <Logo />
            </div>
            <p className="mt-9">
              «Вечерний Ставрополь» зарегистрирован Роскомнадзором в реестре СМИ
              под номером:
            </p>
            <p className="mt-2">Эл № ФС77–82584 от 30.12.2021 г</p>
            {phone && (
              <p className="mt-5">
                Тел: <a href={`tel:${getPhoneFromString(phone)}`}>{phone}</a>
              </p>
            )}
            {fax && <p className="mt-2">Факс: {fax}</p>}
            {email && (
              <p className="mt-2">
                Email: <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}

            <div className="flex justify-center md:justify-start mt-5 space-x-3">
              <SocialLinks />
            </div>
          </div>

          {/* col */}
          <div className="flex-1 link-primary">
            <ListTitle title="Навигация" listClassName="flex-col">
              <Link href="/news" prefetch={false}>
                <a>Новости</a>
              </Link>
              <Link href="/articles" prefetch={false}>
                <a>Статьи</a>
              </Link>
              <Link href="/newspaper" prefetch={false}>
                <a>Газета</a>
              </Link>
              <Link href="/about" prefetch={false}>
                <a>О нас</a>
              </Link>
              <Link href="/advertising" prefetch={false}>
                <a>Рекламные услуги</a>
              </Link>
              <Link href="/contacts" prefetch={false}>
                <a>Контакты</a>
              </Link>
            </ListTitle>
          </div>

          {/* col */}
          <div className="hidden md:block flex-1 link-primary">
            <ListTitle title="Новости" listClassName="flex-col">
              {geographyTags.map((tag) => {
                return (
                  <Link
                    key={tag.id}
                    href={`/news/${tag.slug}`}
                    prefetch={false}
                  >
                    <a className="p-1">{tag.name}</a>
                  </Link>
                );
              })}
            </ListTitle>
          </div>

          {/* col */}
          <div className="hidden md:block flex-1 link-primary">
            <ListTitle title="Газета" listClassName="flex-col">
              <Link href="/newspaper" prefetch={false}>
                <a>Свежий номер</a>
              </Link>
              <Link href="/newspaper" prefetch={false}>
                <a>Архив новостей</a>
              </Link>
            </ListTitle>
          </div>

          {/* col */}
          <div className="hidden sm:block xl:flex-1 w-full xl:min-w-[300px] mt-5 xl:mt-0 link-primary">
            <ListTitle
              title="Рубрики"
              listClassName="flex-row flex-wrap justify-center md:justify-start -m-1"
            >
              {categories.map((cat) => {
                return (
                  <Link
                    key={cat.id}
                    href={`/news/${cat.slug}`}
                    prefetch={false}
                  >
                    <a className="p-1">{cat.name}</a>
                  </Link>
                );
              })}
            </ListTitle>
          </div>
        </Container>
      </div>

      {/* bottom */}
      <div className="py-6 bg-grey-500">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:items-start justify-between w-full text-14px text-grey-400 text-center">
            <Link href="/privacy-policy">
              <a className="text-grey-400 hover:text-white underline order-0">
                Политика конфиденциальности
              </a>
            </Link>

            <p className="order-3 lg:order-1">
              © ИД «Вечерний Ставрополь», 2022
            </p>

            <Link href="/user-agreement">
              <a className="text-grey-400 hover:text-white underline order-2">
                Пользовательское соглашение
              </a>
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};
