import React, { ReactNode, useEffect, useState } from "react";
import { EmptyImages } from "../../helpers/imageHelpers";
import { Selection, StoredFile } from "../../../models";
import { Storage } from "aws-amplify";

type Props = {
  className?: string;
  images?: Selection[];
  children?: ReactNode;
};

function useStorageUrl(key?: string) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!key) {
      setUrl("");
    } else {
      Storage.get(key, { download: false }).then((newUrl) => {
        if (typeof newUrl === "string") {
          setUrl(newUrl);
        }
      });
    }
  }, [key]);

  return { url };
}

export default function ImagePreview({ className, images, children }: Props) {
  const image = images && images[0];
  const file = image?.file || image?.media?.file;
  const { url } = useStorageUrl(file?.key);

  const imgSrc = url || EmptyImages.light;

  return (
    <div className={className}>
      <div className="relative ratio max-w-sm">
        <svg viewBox="0 0 1 1" />
        <img className="w-full" src={EmptyImages.light} alt="" />
        {imgSrc ? (
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: `url(${url})` }}
          />
        ) : null}
      </div>
      <div className="flex mt-4">{children}</div>
    </div>
  );
}
