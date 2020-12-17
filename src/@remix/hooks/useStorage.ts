import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { loadStorage } from "../offline";

const isStorageKey = (key?: string) => key && key.startsWith("storage:");

export function useStorageImage(urlOrStorageKey?: string) {
  const storageKey = isStorageKey(urlOrStorageKey)
    ? urlOrStorageKey
    : undefined;

  const { url: storageUrl } = useStorage(storageKey);

  const url = storageKey ? storageUrl : urlOrStorageKey;

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

export function useStorage(storageKey?: string) {
  const [url, setUrl] = useState("");
  const { data: storage } = useQuery(
    ["remix-storage", storageKey],
    () => loadStorage(storageKey || ""),
    {
      enabled: !!(storageKey && storageKey.startsWith("storage:")),
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (storage) {
      const url = URL.createObjectURL(storage.blob);
      setUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setUrl("");
    }
  }, [storage, setUrl]);

  return { storage, url };
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
