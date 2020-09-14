import React, { useRef, useEffect } from "react";
import cc from "classcat";
import { Link } from "react-router-dom";
import { Guide, GroupedGuides } from "../../api/guides";
import routes from "../../routes";
import { ArrowUp } from "../Icons";
import { ReactComponent as DownloadIcon } from "../../assets/download.svg";
import HtmlContent from "../HtmlContent";
import useLocale from "../../hooks/useLocale";

type Props = {
  guides: GroupedGuides;
  active?: Guide;
  inline?: boolean;
};

const GuideBrowser: React.FC<Props> = ({ guides, active, inline }) => {
  const inlineRef = useRef<HTMLDivElement>(null);
  const { formatMessage: f } = useLocale();

  useEffect(() => {
    setTimeout(() => {
      const element = inlineRef.current;
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element ? element.offsetTop : 0,
      });
    }, 100);
  }, []);

  return (
    <>
      {guides.groups.map((group) => (
        <div key={group.id} className="bg-gray-dark">
          <div className="py-1 px-2 mb-1 bg-green text-black font-normal text-base">
            {f(group.id)}
          </div>
          {group.guides.map((guide) =>
            active && inline && guide.slug === active.slug ? (
              <div ref={inlineRef} key={guide.slug} className="p-2 text-white">
                <Link to={routes.guides()} className="flex">
                  <h2 className="text-lg mb-2 font-bold">{guide.title}</h2>
                  <ArrowUp className="ml-2 flex-shrink-0" />
                </Link>
                <HtmlContent content={active.content || ""} />
              </div>
            ) : (
              <a
                key={guide.slug}
                href={guide.metadata.pdf?.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className={cc([
                  "w-full text-left group flex items-center p-2 mb-1",
                  "focus:outline-none",
                  guide.slug === active?.slug
                    ? "bg-gray-light"
                    : "bg-gray-medium",
                ])}
              >
                <div
                  className={cc([
                    "flex flex-col flex-grow",
                    guide.slug === active?.slug
                      ? "text-green"
                      : "text-white group-hover:text-white-light",
                  ])}
                >
                  <div className="font-bold mb-1">{guide.title}</div>
                  <div className="flex-grow text-sm">
                    {guide.metadata.subtitle}
                  </div>
                </div>
                <DownloadIcon
                  className={cc([
                    "flex-shrink-0 ml-2 my-2 w-6 h-6",
                    guide.slug === active?.slug
                      ? "text-green"
                      : "text-gray-light group-hover:text-white-dark",
                  ])}
                />
              </a>
            )
          )}
        </div>
      ))}
    </>
  );
};

export default GuideBrowser;
