import React from "react";
import { Blurhash } from "react-blurhash";
import { useMeasure } from "react-use";
import { CustomPlaceholder } from "react-placeholder-image";

const RATIOS = {
  square: 1,
  portrait: 9 / 16,
} as const;

type Ratio = keyof typeof RATIOS;

type Props = {
  className?: string;
  ratio?: Ratio;
  color?: string;
};

const ImagePlaceholder: React.FC<Props> = ({
  className,
  ratio = "portrait",
  color,
}) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const height = Math.floor(width * RATIOS[ratio]);
  return (
    <div ref={ref} className={className}>
      {color ? (
        <CustomPlaceholder
          width={width}
          height={height}
          backgroundColor={color}
          textColor={color}
          text=" "
        />
      ) : (
        <Blurhash
          hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          width={width}
          height={height}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
    </div>
  );
};
export default ImagePlaceholder;
