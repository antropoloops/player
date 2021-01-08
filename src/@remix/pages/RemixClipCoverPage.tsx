import { useParams } from "react-router-dom";
import RemixLayout from "../components/RemixLayout";
import EditClipCover from "../components/clip/EditClipCover";

export default function RemixClipCoverPage() {
  const params = useParams<{ remixId: string; clipId: string }>();
  return (
    <RemixLayout
      remixId={params.remixId}
      editor={({ group, remix }) =>
        remix ? (
          <EditClipCover group={group} remix={remix} clipId={params.clipId} />
        ) : null
      }
    />
  );
}
