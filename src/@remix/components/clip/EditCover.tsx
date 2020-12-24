import { Clip, Group, Project } from "../../../models";
import { useObserveModel } from "../../../@backend/hooks/useObserveModel";
import EditImage from "../image/EditImage";
import routes from "../../../routes";
import { DataStore } from "aws-amplify";

type Props = {
  group: Group;
  remix: Project;
  clipId?: string;
};

export default function EditCover({ group, remix, clipId }: Props) {
  const { data: clip } = useObserveModel(Clip, clipId);

  return (
    <EditImage
      group={group}
      remix={remix}
      aspect={1}
      editableImage={clip?.image}
      saveImage={async (current) => {
        if (!clip || !clip.image) return;
        return DataStore.save(
          Clip.copyOf(clip, (draft) => {
            if (draft.image) {
              draft.image.current = current;
            }
          })
        );
      }}
      backTo={routes.remixClip(remix.id, clipId || "")}
    />
  );
}
