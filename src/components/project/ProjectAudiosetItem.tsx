import React, { useRef } from "react";
import { AudiosetReference } from "../../audioset";
import MediaObject from "../MediaObject";
import { ReactComponent as PlayIcon } from "../../assets/play-circle.svg";
import { ArrowRight } from "../Icons";
import classcat from "classcat";

type Props = {
  className?: string;
  linkTo: string;
  reference: AudiosetReference;
  play?: boolean;
};

const ProjectAudiosetItem: React.FC<Props> = ({
  className,
  reference,
  linkTo,
  play,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}>
      <MediaObject
        className={classcat([
          className || "bg-gray-light",
          "group hover:bg-gray-lighter",
        ])}
        key={reference.id}
        to={linkTo}
        image={reference.logo_url}
        alt={reference.title}
      >
        <div className="w-full flex items-center group">
          <div className="h-full flex-grow flex flex-col px-2 group-hover:text-white-light">
            <h3 className="leading-5 font-medium my-2">{reference.title}</h3>
            <div className="h-full flex flex-col justify-center">
              <p className="sm:hidden lg:block text-sm leading-4 font-light">
                {reference.description}
              </p>
            </div>
          </div>
          {play ? (
            <PlayIcon className="flex-shrink-0 text-white-dark w-8 h-8 mt-2 mr-2 group-hover:text-green" />
          ) : (
            <ArrowRight className="text-white-dark flex-shrink-0 mr-2 my-2 group-hover:text-white" />
          )}
        </div>
      </MediaObject>
    </div>
  );
};

export default ProjectAudiosetItem;
