import React, { useRef, useEffect } from "react";
import cc from "classcat";
import { Link } from "react-router-dom";
import { Topic, TopicGroupList } from "../../api/types";
import routes from "../../routes";
import { ArrowRight, ArrowUp } from "../Icons";
import { Markdown } from "../Markdown";

type Props = {
  topics: TopicGroupList;
  active?: Topic;
  inline?: boolean;
};

const TopicBrowser: React.FC<Props> = ({ topics, active, inline }) => {
  const inlineRef = useRef<HTMLDivElement>(null);

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
        <div key={group.title} className="bg-gray-dark">
          <div className="py-1 px-2 mb-1 bg-green text-black font-normal text-base">
            {group.title}
          </div>
          {group.topics.map((topic) =>
            active && inline && topic.id === active.id ? (
              <div ref={inlineRef} key={topic.id} className="p-2 text-white">
                <Link to={routes.topics()} className="flex">
                  <h2 className="text-lg mb-2 font-bold">{topic.title}</h2>
                  <ArrowUp className="ml-2 flex-shrink-0" />
                </Link>
                <Markdown markdown={active.readme} />
              </div>
            ) : (
              <Link
                to={routes.topic(topic.path)}
                key={topic.id}
                className={cc([
                  "group flex items-center px-2 mb-1",
                  topic.id === active?.id ? "bg-gray-light" : "bg-gray-medium",
                ])}
              >
                <span
                  className={cc([
                    "flex-grow",
                    topic.id === active?.id
                      ? "text-green"
                      : "text-white group-hover:text-white-light",
                  ])}
                >
                  {topic.title}
                </span>
                <ArrowRight
                  className={cc([
                    "flex-shrink-0 ml-2 my-2",
                    topic.id === active?.id
                      ? "text-green"
                      : "text-gray-light group-hover:text-green",
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
