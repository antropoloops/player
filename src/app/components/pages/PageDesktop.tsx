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
    <div className="PageDesktop min-h-full bg-gray-dark text-white px-4 py-2">
      <div
        className={cx({
          "max-w-content p-8": true,
          "bg-white text-black": white,
          "mx-auto": center,
        })}
      >
        <div
          className={cx([
            "prose max-w-none mx-auto px-0 lg:px-8 py-4",
            white && "prose-page",
          ])}
        >
          {header}
          {subtitle && <h3 className="italic">{subtitle}</h3>}
          <h1 className="">{page.title}</h1>
          <HtmlContent
            className={white ? "prose-page" : ""}
            content={page.content || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default PageDesktop;
