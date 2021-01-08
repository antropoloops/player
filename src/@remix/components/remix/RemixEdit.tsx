import { DataStore } from "aws-amplify";
import { useHistory, useParams } from "react-router-dom";
import { Project } from "../../../models";
import { Heading } from "../../../@core/components";
import routes from "../../../routes";
import RemixForm from "./RemixForm";
import RemixNavigation from "./RemixNavigation";
import { RemixEditProps } from "../../contexts/RemixContext";

export default function RemixEdit({ remix }: RemixEditProps) {
  const history = useHistory();
  return (
    <div>
      <RemixNavigation current="Remezcla" />
      <Heading level={1} className="mb-8">
        {remix.meta.title}
      </Heading>
      <RemixForm
        remix={remix}
        className="max-w-2xl"
        onSubmit={(data) => {
          // console.log("data", data);
          // setEdit(false);
          DataStore.save(
            Project.copyOf(remix, (draft) => {
              draft.meta = data.meta;
              draft.remix = data.remix;
            })
          ).then(() => {
            history.push(routes.remix(remix.id));
          });
        }}
        onCancel={() => {
          history.push(routes.remix(remix.id));
        }}
      />
    </div>
  );
}
