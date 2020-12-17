import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import SimplePlayerScreen from "../../components/simple-player/SimplePlayerScreen";
import { getOfflineRemix } from "../offline";

type Props = {};
const RemixPlayPage: React.FC<Props> = () => {
  const params = useParams<{ id: string }>();
  const { data: remix } = useQuery(["offline-remix", params.id], () =>
    getOfflineRemix(params.id)
  );

  if (!remix) return <LoadingScreen />;

  return <SimplePlayerScreen audioset={remix.audioset} />;
};
export default RemixPlayPage;
