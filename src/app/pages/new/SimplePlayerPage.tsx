import React, { useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import API from "../../api";
import Layout from "../../components/layout/Layout";
import useSimplePlayer, { PlayStatus } from "../../hooks/useSimplePlayer";

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
  useEffect(() => {
    dispatch({ type: "init", audioset });
  }, [dispatch, audioset]);

  const _tick = useCallback(() => {
    dispatch({ type: "tick", time: Date.now() });
  }, [dispatch]);

  useEffect(() => {
    const id = setInterval(_tick, 100);
    return () => clearInterval(id);
  }, [_tick]);

  const format = (status?: PlayStatus) =>
    status
      ? `${status.playing ? "YES" : "no"} ${status.time || "n/a"} ${
          status.dirty ? "*" : ""
        }`
      : "--";

  return (
    <Layout>
      <div className="text-white">
        <h1>{state.startAt}</h1>

        <button onClick={() => dispatch({ type: "tick", time: Date.now() })}>
          tick
        </button>
      </div>
      {audioset?.tracks.map((track) => (
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
              <button
                key={clipId}
                className="flex"
                onClick={() =>
                  dispatch({
                    type: "trigger",
                    clipId,
                    trackId: track.id,
                    playing: !state.clips[clipId]?.playing,
                  })
                }
              >
                {clipId} {format(state.clips[clipId])}
              </button>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};
export default SimplePlayerPage;
