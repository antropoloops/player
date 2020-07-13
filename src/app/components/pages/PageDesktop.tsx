import React from "react";
import { Page as PageData } from "../../api/pages";
import { Markdown } from "../Markdown";
import cx from "classcat";

type Props = {
  page?: PageData;
  center?: boolean;
  white?: boolean;
};

const PageDesktop: React.FC<Props> = ({ page, center, white }) => {
  if (!page) return null;

  const subtitle = page?.metadata?.subtitle;

  return (
    <div className="PageDesktop min-h-full bg-gray-medium text-white px-4 py-2">
      <div
        className={`max-w-content text-justify p-8 ${
          white ? "bg-white text-black" : ""
        } ${center ? "mx-auto" : ""}`}
      >
        {subtitle && <h2 className="text-xl italic">{subtitle}</h2>}
        <h1 className="text-4xl mb-4">{page.title}</h1>
        <Markdown markdown={page.content || ""} />
      </div>
    </div>
  );
};

export default PageDesktop;
