import { EmptyImages } from "../../helpers/imageHelpers";
import { StoredFile } from "../../../models";
import classcat from "classcat";
import { useStorageUrl } from "../../../@backend/hooks/useStorage";
import { Blurhash } from "react-blurhash";

type Props = {
  className?: string;
  imageFile?: StoredFile;
  aspect?: "1" | "16:9";
};

export default function ImagePreview({ className, imageFile, aspect }: Props) {
  const { url } = useStorageUrl(imageFile?.key);

  const viewBox = aspect === "16:9" ? "0 0 16 9" : "0 0 1 1";
  const ratio = aspect === "16:9" ? 16 / 9 : 1;

  const MAX_WIDTH = 385;

  const width = MAX_WIDTH;
  const height = MAX_WIDTH / ratio;

  return (
    <div className={classcat(["relative ratio max-w-sm", className])}>
      <svg className="text-gray-darker" viewBox={viewBox}>
        <rect width="20" height="20" fill="currentColor" />
      </svg>

      {imageFile?.thumbnail && (
        <Blurhash hash={imageFile.thumbnail} width={width} height={height} />
      )}

      {url ? (
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${url})` }}
        />
      ) : null}
    </div>
  );
}
