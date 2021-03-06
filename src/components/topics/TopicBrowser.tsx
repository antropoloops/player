import React, { useRef, useEffect } from "react";
import cc from "classcat";
import { Link } from "react-router-dom";
import { Topic, GroupedTopics } from "../../api/topics";
import routes from "../../routes";
import { ArrowRight, ArrowUp } from "../Icons";
import HtmlContent from "../HtmlContent";
import useLocale from "../../hooks/useLocale";
import ListHeader from "../shared/ListHeader";

type Props = {
  topics: GroupedTopics;
  active?: Topic;
  inline?: boolean;
};

const TopicBrowser: React.FC<Props> = ({ topics, active, inline }) => {
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
      {topics.groups.map((group) => (
        <div data-cy="TopicGroup" key={group.id}>
          <ListHeader label={f(group.id)} />
          {group.topics.map((topic) =>
            active && inline && topic.slug === active.slug ? (
              <div ref={inlineRef} key={topic.slug} className="p-2 text-white">
                <Link to={routes.topics()} className="flex">
                  <h2 className="text-lg mb-2 font-bold">{topic.title}</h2>
                  <ArrowUp className="ml-2 flex-shrink-0" />
                </Link>
                <HtmlContent content={active.content || ""} />
              </div>
            ) : (
              <Link
                to={routes.topic(topic.slug)}
                key={topic.slug}
                className={cc([
                  "group flex items-center px-2 mb-1 shadow",
                  topic.slug === active?.slug
                    ? "bg-gray-lighter"
                    : "bg-gray-light hover:bg-gray-lighter",
                ])}
              >
                <span
                  className={cc([
                    "flex-grow",
                    topic.slug === active?.slug
                      ? "text-green"
                      : "text-white group-hover:text-white-light",
                  ])}
                >
                  {topic.title}
                </span>
                <ArrowRight
                  className={cc([
                    "flex-shrink-0 ml-2 my-2",
                    topic.slug === active?.slug
                      ? "text-green"
                      : "text-white-dark group-hover:text-white",
                  ])}
                />
              </Link>
            )
          )}
        </div>
      ))}
    </>
  );
};

export default TopicBrowser;
