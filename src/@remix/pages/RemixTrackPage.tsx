import { useContext } from "react";
import { useParams } from "react-router-dom";
import RemixLayout from "../components/RemixLayout";
import ShowEditTrack from "../components/track/ShowEditTrack";

export default function RemixTrackPage() {
  const params = useParams<{ remixId: string; trackId: string }>();

  return (
    <RemixLayout
      remixId={params.remixId}
      editor={({ remix, group, tracks, clips }) =>
        remix ? (
          <ShowEditTrack
            group={group}
            remix={remix}
            track={tracks?.find((track) => track.id === params.trackId)}
            clips={clips || []}
          />
        ) : null
      }
    />
  );
}
