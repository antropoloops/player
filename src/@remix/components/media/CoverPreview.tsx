import { EmptyImages } from "../../helpers/imageHelpers";
import { Clip } from "../../../models";
import classcat from "classcat";
import { useStorageUrl } from "../../../@backend/hooks/useStorage";

type Props = {
  className?: string;
  cover?: Clip;
};

export default function CoverPreview({ className, cover }: Props) {
  const file = cover?.imageFile;
  const { url } = useStorageUrl(file?.key);

  const imgSrc = url || EmptyImages.light;

  return (
    <div className={classcat(["relative ratio max-w-sm", className])}>
      <svg viewBox="0 0 1 1" />
      <img className="w-full" src={EmptyImages.light} alt="" />
      {imgSrc ? (
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${url})` }}
        />
      ) : null}
    </div>
  );
}