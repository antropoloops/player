import React from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import API from "../../api";
import SimplePlayerScreen from "../../components/simple-player/SimplePlayerScreen";

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

  return audioset ? <SimplePlayerScreen audioset={audioset} /> : null;
};

export default SimplePlayerPage;
