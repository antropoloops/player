import { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { useQuery } from "react-query";

export function useStorageUrl(key?: string) {
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

export function useStorageImage(urlOrStorageKey?: string) {
  const isUrl = urlOrStorageKey && urlOrStorageKey.startsWith("http");

  const { url: storageUrl } = useStorageUrl(urlOrStorageKey);

  const url = isUrl ? urlOrStorageKey : storageUrl;

  const { data: image, isLoading } = useQuery(
    ["image", url],
    () => preloadImage(url || ""),
    {
      enabled: !!url,
      staleTime: Infinity,
    }
  );

  return { image, isLoading };
}

function preloadImage(url: string): Promise<HTMLImageElement> {
  const image = document.createElement("img");
  image.src = url;

  return new Promise(function (resolve, reject) {
    image.onerror = function () {
      reject(new Error("ImageBlobReduce: failed to create Image() from blob"));
    };
    image.onload = function () {
      resolve(image);
    };
  });
}
