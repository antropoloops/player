import { useParams } from "react-router-dom";
import ShowEditClip from "../components/clip/ShowEditClip";
import RemixLayout from "../components/RemixLayout";

export default function RemixClipPage() {
  const params = useParams<{ remixId: string; clipId: string }>();
  return (
    <RemixLayout
      remixId={params.remixId}
      editor={(ctx) => <ShowEditClip {...ctx} clipId={params.clipId} />}
    ></RemixLayout>
  );
}
