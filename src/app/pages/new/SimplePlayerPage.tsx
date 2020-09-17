import React from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import API from "../../api";
import Layout from "../../components/layout/Layout";
import Clip from "../../components/simple-player/Clip";
import useSimplePlayer from "../../hooks/useSimplePlayer";
import { StoppedStatus } from "../../simplePlayer";

type Props = {};

type RouteParams = {
  id: string;
};
const SimplePlayerPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: audioset } = useQuery(
    ["project", { path: params.id }],
    (_, p) => API.audiosets.get(p)
  );
  const [state, dispatch] = useSimplePlayer(audioset);

  return (
    <Layout>
      {audioset?.tracks?.map((track) => (
        <div
          key={track.id}
          className="mb-1"
          style={{ backgroundColor: track.color }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gray-dark opacity-25"></div>
            <h3 className="p-2 z-10">{track.name}</h3>
          </div>

          <div className="">
            {track.clipIds.map((clipId) => (
              <Clip
                key={clipId}
                status={state.clips[clipId] || StoppedStatus}
                clip={audioset.index.clipById[clipId]}
                onClick={() =>
                  dispatch({
                    type: "trigger",
                    clipId,
                    trackId: track.id,
                    playing: !state.clips[clipId]?.playing,
                  })
                }
              />
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default SimplePlayerPage;
