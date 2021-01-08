import RemixNavigation from "../remix/RemixNavigation";
import AudioEdit from "../audio/AudioEdit";
import { Heading } from "../../../@core/components";
import { RemixEditProps } from "../../contexts/RemixContext";
import routes from "../../../routes";
import { audioUploader } from "../../services/audioUploader";
import useSimpleAudioContext from "../../hooks/useSimpleAudioContext";
import { AudioRegion, Clip } from "../../../models";
import { DataStore } from "aws-amplify";

export default function EditClipAudio({
  group,
  remix,
  tracks,
  clips,
  clipId,
}: RemixEditProps & {
  clipId: string;
}) {
  const ctx = useSimpleAudioContext();
  const clip = clips?.find((c) => c.id === clipId);
  const track = clip && tracks?.find((t) => t.id === clip.trackID);

  return (
    <div>
      <RemixNavigation
        remix={remix}
        track={track}
        clip={clip}
        current="Sonido"
      />
      <Heading level={1}>Editar sonido</Heading>
      {clip && (
        <AudioEdit
          file={clip.audio?.original.file}
          color={track?.meta.color || "white"}
          backTo={routes.remixClip(remix.id, clipId)}
          region={clip.audio?.current.region}
          saveFile={async (file: File, region: AudioRegion) => {
            if (!clip.audio) return false;

            const upload = audioUploader(ctx, group, remix);
            const media = await upload(file);
            await DataStore.save(
              Clip.copyOf(clip, (draft) => {
                if (draft.audio) {
                  draft.audio.current = {
                    file: media.file,
                    region,
                  };
                }
              })
            );
            return true;
          }}
        />
      )}
    </div>
  );
}
