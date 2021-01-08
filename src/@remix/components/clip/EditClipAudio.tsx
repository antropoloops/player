import { Clip, Track, Group, Project } from "../../../models";
import RemixNavigation from "../remix/RemixNavigation";
import AudioPreview from "../audio/AudioPreview";
import { Heading } from "../../../@core/components";

export default function EditClipAudio({
  group,
  remix,
  track,
  clip,
}: {
  group: Group;
  remix: Project;
  track?: Track;
  clip?: Clip;
}) {
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
        <AudioPreview
          file={clip.audio?.current.file}
          color={track?.meta.color || "white"}
        />
      )}
    </div>
  );
}
