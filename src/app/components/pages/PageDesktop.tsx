import React, { ReactNode } from "react";
import { Page as PageData } from "../../api/pages";
import HtmlContent from "../HtmlContent";
import cx from "classcat";

type Props = {
  page?: PageData;
  center?: boolean;
  white?: boolean;
  header?: ReactNode;
};

const PageDesktop: React.FC<Props> = ({ page, center, white, header }) => {
  if (!page) return null;

  const subtitle = page?.metadata?.subtitle;

  return (
    <div className="PageDesktop min-h-full bg-gray-medium text-white px-4 py-2">
      <div
        className={cx({
          "max-w-content text-justify p-8": true,
          "bg-white text-black": white,
          "mx-auto": center,
        })}
      >
        {header}
        {subtitle && <h2 className="text-xl italic">{subtitle}</h2>}
        <h1 className="text-4xl mb-4">{page.title}</h1>
        <HtmlContent markdown={page.content || ""} />
      </div>
    </div>
  );
};

export default PageDesktop;
