import React from "react";
import { Page as PageData } from "../api/pages";
import { Markdown } from "./Markdown";

type Props = {
  page?: PageData;
};

const Page: React.FC<Props> = ({ page }) => {
  if (!page) return null;

  return (
    <div className="p-4 text-white">
      <h1 className="text-4xl mb-4">{page.title}</h1>
      <Markdown markdown={page.content} />
    </div>
  );
};

export default Page;
