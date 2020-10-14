import React, { ReactNode } from "react";
import { Page as PageData } from "../../api/pages";
import HtmlContent from "../HtmlContent";
import cx from "classcat";

type Props = {
  page?: PageData;
  center?: boolean;
  white?: boolean;
  padding?: string;
  full?: boolean;
  header?: ReactNode;
};

const PageDesktop: React.FC<Props> = ({
  page,
  center,
  white,
  header,
  full = true,
  padding = "p-8",
}) => {
  if (!page) return null;

  const subtitle = page?.metadata?.subtitle;

  return (
    <div
      className={cx([
        "bg-gray-dark text-white px-4 py-2",
        full && "min-h-full",
      ])}
    >
      <div
        className={cx([
          "max-w-content",
          padding,
          white && "bg-white text-black",
          center && "mx-auto",
        ])}
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
