import { useParams } from "react-router-dom";
import RemixLayout from "../components/RemixLayout";
import RemixNavigation from "../components/remix/RemixNavigation";

export default function RemixClipAudioPage() {
  const params = useParams<{ remixId: string; clipId: string }>();
  return (
    <RemixLayout
      remixId={params.remixId}
      editor={({ remix, tracks, clips }) => {
        const clip = clips?.find((clip) => clip.id === params.clipId);
        const track = clip
          ? tracks?.find((track) => track.id === clip?.trackID)
          : undefined;

        if (!remix || !clip) return null;

        return (
          <div>
            <RemixNavigation
              remix={remix}
              track={track}
              clip={clip}
              current="Sonido"
            />
          </div>
        );
      }}
    />
  );
}
