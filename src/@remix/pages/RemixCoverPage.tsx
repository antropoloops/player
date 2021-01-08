import { useParams } from "react-router-dom";
import RemixLayout from "../components/RemixLayout";
import EditImage from "../components/image/EditImage";
import routes from "../../routes";
import { Project } from "../../models";
import { DataStore } from "aws-amplify";

export default function RemixCoverPage() {
  const params = useParams<{ id: string }>();
  return (
    <RemixLayout
      remixId={params.id}
      editor={({ group, remix }) =>
        remix ? (
          <EditImage
            group={group}
            remix={remix}
            aspect={16 / 9}
            backTo={routes.remix(remix.id)}
            editableImage={remix.image}
            saveImage={async (current) => {
              return DataStore.save(
                Project.copyOf(remix, (draft) => {
                  if (draft.image) {
                    draft.image.current = current;
                  }
                })
              );
            }}
          />
        ) : null
      }
    ></RemixLayout>
  );
}
