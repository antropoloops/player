import React from "react";
import { useParams } from "react-router-dom";
import { Waveform } from "../components/Waveform";
import useAudioBuffer from "../../@archive/hooks/useAudioBuffer";
import { usePlayBuffer } from "../../@archive/hooks/usePlayBuffer";
import Layout from "../../components/layout/Layout";
import { SoundsBrowser } from "../components/SoundsBrowser";
import { AudioProperties } from "../components/AudioProperties";
import { useSoundList, useSoundQuery } from "../hooks/useSoundQueries";
import { PlayButton } from "../components/PlayButton";
import { SoundMetadataForm } from "../components/SoundMetadataForm";

type Props = {};

export const SoundEditPage: React.FC<Props> = () => {
  const params = useParams<{ id: string }>();
  const { data: sounds } = useSoundList();
  const { data: sound } = useSoundQuery(params.id);
  const { buffer } = useAudioBuffer(sound?.file.blob);
  const [play, { playing }] = usePlayBuffer(buffer, {
    offset: 0,
    duration: buffer?.duration || 0,
  });

  const audio = sound?.data.audio;

  return (
    <Layout
      desktop={
        <div className="p-4 text-sounds">
          <div className="flex items-center">
            <PlayButton
              className="border-2 border-sounds rounded-full mr-4"
              onClick={() => (playing ? play(false) : play(true))}
              playing={playing}
            />

            <h1 className="text-4xl">{sound?.data.fileName}</h1>
          </div>
          {audio?.thumbnail && (
            <div className="bg-gray-darker p-2 my-4">
              <Waveform
                className="w-full text-sounds"
                width={100}
                height={10}
                points={audio.thumbnail}
              />
            </div>
          )}
          {audio && <AudioProperties audio={audio} />}
          <SoundMetadataForm className="my-4 max-w-2xl" />
        </div>
      }
    >
      <SoundsBrowser sounds={sounds} />
    </Layout>
  );
};
