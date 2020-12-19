import React, { useState } from "react";
import { DataStore, Group, Project, Track } from "../../@backend/datastore";
import { DesktopView, Heading } from "../../@core/components";
import { AddIcon, EditIcon } from "../../components/icons/Icons";
import { RemixProperties } from "./RemixProperties";
import RemixForm from "./RemixForm";
import ActionButton from "./shared/ActionButton";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { randomColor } from "../helpers/colorHelpers";

type Props = {
  group: Group;
  remix: Project;
};

export default function ShowEditRemix({ remix, group }: Props) {
  const history = useHistory();
  const [edit, setEdit] = useState(false);

  const addTrack = async () => {
    const track = await DataStore.save(
      new Track({
        groupID: group.id,
        projectID: remix.id,
        meta: {
          name: "Pista",
          color: randomColor(),
        },
        clips: [],
      })
    );
    history.push(routes.remixEditItemChild(remix.id, "t", track.id));
  };

  return (
    <DesktopView>
      <Heading level={1} className="mb-8">
        {remix.meta.title}
      </Heading>

      {edit ? (
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
            ).then(() => setEdit(false));
          }}
          onCancel={() => setEdit(false)}
        />
      ) : (
        <>
          <RemixProperties className="my-8" remix={remix} />
          <div className="flex">
            <ActionButton
              className="mr-4"
              icon={EditIcon}
              smallIcon
              onClick={() => {
                setEdit(true);
              }}
            >
              Editar
            </ActionButton>
            <ActionButton
              colors="bg-remixes text-black"
              className="mr-4"
              icon={AddIcon}
              onClick={addTrack}
            >
              Añadir pista
            </ActionButton>
          </div>
        </>
      )}
    </DesktopView>
  );
}
