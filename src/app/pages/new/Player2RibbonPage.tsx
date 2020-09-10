import React from "react";
import { useQuery } from "react-query";
import API from "../../api";
import PlayerRibbon from "../../components/next/PlayerRibbon";
import { useRouteMatch } from "react-router-dom";
import LoadingPage from "../LoadingPage";

type RouteParams = {
  id: string;
};

type Props = {};
const Player2Page: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: audioset, isError } = useQuery(
    ["project", { path: params.id }],
    (_, p) => API.audiosets.get(p)
  );

  if (isError) return <div>Couldn't load</div>;
  if (!audioset) return <LoadingPage />;

  return audioset ? <PlayerRibbon audioset={audioset} /> : null;
};
export default Player2Page;
