import classcat from "classcat";
import React from "react";
import { Link } from "react-router-dom";
import { Waveform } from "../components/Waveform";
import routes from "../../routes";
import { OfflineSoundData } from "../backend";
import { Separator } from "../../@core/components/Separator";

type Props = {
  sounds?: OfflineSoundData[];
};

export const SoundsBrowser: React.FC<Props> = ({ sounds }) => {
  if (!sounds) return <div>Loading...</div>;

  return (
    <div className="text-sounds">
      <Separator className="bg-sounds" to={routes.sounds()}>
        Sonidos
      </Separator>
      {sounds.map((sound) => (
        <SoundItem key={sound.id} sound={sound} toPath={routes.soundEdit} />
      ))}
    </div>
  );
};

type SoundItemProps = {
  sound: OfflineSoundData;
  activeId?: string;
  toPath: (id: string) => string;
};

const SoundItem = ({ sound, activeId, toPath }: SoundItemProps) => {
  return (
    <Link
      key={sound.id}
      className={classcat([
        "block overflow-hidden group items-center px-2 mb-1 shadow",
        activeId === sound.id
          ? "bg-gray-lighter"
          : "bg-gray-light hover:bg-gray-lighter",
      ])}
      to={toPath(sound.id)}
    >
      <div className="text-sm truncate">{sound.fileName}</div>
      {sound.audio?.thumbnail && (
        <Waveform
          className="my-2"
          width={100}
          height={10}
          points={sound.audio.thumbnail}
        />
      )}
    </Link>
  );
};
