import Layout from "../../components/layout/Layout";
import {
  useObserveList,
  useObserveModel,
} from "../../@backend/hooks/useObserveModel";
import RemixContext, { RemixContextValue } from "../contexts/RemixContext";
import { Project, Clip, Track } from "../../models";
import RemixBrowser from "../components/remix/RemixBrowser";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import NotAuthorizedPage from "../../@backend/pages/NotAuthorizedPage";
import { ReactNode } from "react";

type Props = {
  remixId: string;
  editor?: (context: RemixContextValue) => ReactNode;
};

const RemixLayout: React.FC<Props> = ({ remixId, editor, children }) => {
  const group = useCurrentGroup();
  const { data: remix, isLoading } = useObserveModel(Project, remixId);
  const { data: tracks } = useObserveList(Track, remixId, (t) =>
    t.projectID("eq", remixId)
  );
  const { data: clips } = useObserveList(Clip, remixId, (t) =>
    t.projectID("eq", remixId)
  );

  if (!group) return <NotAuthorizedPage />;

  const context = { group, isLoading, remix, tracks, clips };
  return (
    <RemixContext.Provider value={context}>
      <Layout nav="projects" desktop={editor ? editor(context) : children}>
        {remix && <RemixBrowser remix={remix} tracks={tracks} clips={clips} />}
      </Layout>
    </RemixContext.Provider>
  );
};

export default RemixLayout;
