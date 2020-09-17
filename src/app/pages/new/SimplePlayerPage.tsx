import React from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import API from "../../api";
import Layout from "../../components/layout/Layout";
import Clip from "../../components/simple-player/Clip";
import useSimplePlayer, {
  PlayStatus,
  StoppedStatus,
} from "../../hooks/useSimplePlayer";

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

  const format = (status?: PlayStatus) =>
    status
      ? `${status.playing ? "YES" : "no"} ${status.time || "n/a"} ${
          status.dirty ? "*" : ""
        }`
      : "--";

  return (
    <Layout>
      {audioset?.tracks?.map((track) => (
        <div
          key={track.id}
          className="my-2"
          style={{ backgroundColor: track.color }}
        >
          <h3 className="border-b-2">
            {track.name} {format(state.tracks[track.id])}
          </h3>

          <div>
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
