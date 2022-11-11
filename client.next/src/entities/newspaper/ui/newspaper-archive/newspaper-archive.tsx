import React, { useState } from "react";
import { NewsPaperAllProps } from "@/shared/types";
import { getNewspapers } from "@/shared/api/newspaper";
import {
  formatISOToLocaleDateMonth,
  formatISOToLocaleMonth,
} from "@/shared/lib/date";
import { Button } from "@/shared/ui/buttons";
import { Heading } from "@/shared/ui/heading";
import { LastRelease } from "@/entities/newspaper/ui/newspaper-archive/last-release";
import { useRouter } from "next/router";
import { useSettings } from "@/app/contexts/settings-context";
import { SEO } from "@/shared/ui/SEO";

export const NewspaperArchive = ({
  newspapers,
}: {
  newspapers: NewsPaperAllProps;
}) => {
  const {
    posts: initPosts,
    lastRelease,
    allYears,
    postsMonths,
    postsYear,
  } = newspapers;
  const [posts, setPosts] = useState(initPosts);
  const [activeYear, setActiveYear] = useState(postsYear);
  const [activeMonthsOfYear, setActiveMonthsOfYear] = useState(postsMonths);
  const [activeMonth, setActiveMonth] = useState(Math.max(...postsMonths));

  const router = useRouter();
  const settings = useSettings();

  const postUrl = `${settings.siteUrl}${router.asPath}`;

  const changeYear = (year: number) => {
    const fetchData = async () => {
      try {
        const data = await getNewspapers({
          year,
        });

        if (data.posts) {
          setPosts(data.posts);
          setActiveMonthsOfYear(data.postsMonths);
          setActiveMonth(Math.max(...data.postsMonths));
          setActiveYear(data.postsYear);
        }
      } catch (error) {
        console.log("newspaper-archive", error);
      }
    };

    fetchData();
  };

  const activePosts =
    posts && activeMonth && posts[activeMonth] ? posts[activeMonth] : [];

  return (
    <>
      <SEO
        title="Архив номеров"
        openGraph={{
          title: "Архив номеров",
          url: postUrl,
        }}
      />
      {lastRelease && <LastRelease item={lastRelease} />}
      <Heading className="text-grey-500 my-5" tag="h2" title="Архив номеров" />
      <div className="mt-5 p-8 border border-grey-200 text-center">
        {/* years */}
        <h6>Год выпуска:</h6>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {allYears.map((year) => (
            <Button
              key={year}
              variant="filled"
              size="sm"
              active={year === activeYear}
              onClick={() => changeYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
        {/* months */}
        <h6 className="mt-5">Месяц:</h6>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {activeMonthsOfYear.map((month) => {
            const monthStr = formatISOToLocaleMonth(month - 1);

            return (
              <Button
                key={month}
                variant="filled"
                size="sm"
                active={month === activeMonth}
                onClick={() => setActiveMonth(month)}
              >
                <span className="capitalize">{monthStr}</span>
              </Button>
            );
          })}
        </div>
      </div>
      {/* posts */}
      <div className="flex flex-wrap -m-3 mt-5">
        {activePosts.map((post) => (
          <div key={post.id} className="flex items-center w-full sm:w-1/2 p-3">
            <div className="flex-shrink-0 bg-blue-200 p-2 text-14px text-white">
              {post.createdAt && formatISOToLocaleDateMonth(post.createdAt)}
            </div>
            {post.attached && (
              <a
                href={post.attached}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 font-bold"
              >
                {post.title}
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
