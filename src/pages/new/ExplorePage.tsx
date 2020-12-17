import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import API from "../../api";
import LoadingScreen from "../../components/LoadingScreen";
import PlayPanelScreen from "../../components/play-panel/PlayPanelScreen";

type RouteParams = {
  id: string;
};

const ExplorePage: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { data: audioset } = useQuery(["project", params.id], () =>
    API.audiosets.get({ path: params.id })
  );

  if (!audioset) return <LoadingScreen />;

  return <PlayPanelScreen audioset={audioset} />;
};
export default ExplorePage;
