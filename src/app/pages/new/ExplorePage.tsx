import React from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import API from "../../api";
import LoadingPage from "../LoadingPage";
import PlayPanelScreen from "../../components/play-panel/PlayPanelScreen";

type RouteParams = {
  id: string;
};

const ExplorePage: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: audioset } = useQuery(
    ["project", { path: params.id }],
    (_, p) => API.audiosets.get(p)
  );

  if (!audioset) return <LoadingPage />;

  return <PlayPanelScreen audioset={audioset} />;
};
export default ExplorePage;
