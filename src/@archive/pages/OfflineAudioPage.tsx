import React from "react";
import Layout from "../../components/layout/Layout";
import { getOfflineMediaFile, listAudioFiles } from "../offline";
import { useQuery } from "react-query";
import routes from "../../routes";
import AudioFileList from "../components/AudioFileList";
import { Link, useParams } from "react-router-dom";
import { Waveform } from "../components/Waveform";
import useAudioBuffer from "../hooks/useAudioBuffer";
import { usePlayBuffer } from "../hooks/usePlayBuffer";
import { formatTime } from "../helpers/timeHelpers";
import { PlayCircleIcon, StopCircleIcon } from "../../components/icons/Icons";

type Props = {};

const OfflineAudioPage: React.FC<Props> = () => {
  const params = useParams<{ id: string }>();
  const { data: files } = useQuery(["offline-audio-files"], listAudioFiles, {
    staleTime: Infinity,
  });
  const { data: file } = useQuery(
    ["offline-fileData-file", { id: params.id }],
    (_, { id }) => getOfflineMediaFile(id),
    { staleTime: Infinity }
  );
  const { buffer } = useAudioBuffer(file?.data.blob);
  const [play, { playing }] = usePlayBuffer(buffer, {
    offset: 0,
    duration: buffer?.duration || 0,
  });

  const PlayIcon = playing ? StopCircleIcon : PlayCircleIcon;

  return (
    <Layout
      backTo={routes.archiveOffline()}
      title="Joder"
      desktop={
        file && (
          <div className="p-4 text-yellow-400">
            <div className="flex items-center">
              <button
                className="text-yellow-400"
                onClick={() => (playing ? play(false) : play(true))}
              >
                <PlayIcon className="w-12 h-12 mr-4 fill-current" />
              </button>

              <h1 className="text-4xl">{file.mediaFile.name}</h1>
              <span className="ml-4 text-base">
                {buffer ? formatTime(buffer.duration) : "--:--:--"}
              </span>
            </div>
            {file.mediaFile.thumbnail && (
              <Waveform
                className="w-full text-yellow-500"
                width={1000}
                height={100}
                points={file.mediaFile.thumbnail}
              />
            )}
          </div>
        )
      }
    >
      <Link to={routes.archiveOffline()}>
        <img src="/images/sections/community.jpg" alt="das" />
        <h2 className="p-1 mb-1 bg-yellow-400 text-bg-dark">Archivo offline</h2>
      </Link>
      {files && (
        <AudioFileList
          files={files}
          toPath={routes.archiveOfflineMedia}
          activeId={file?.mediaFile.id}
        />
      )}
    </Layout>
  );
};

export default OfflineAudioPage;
