import React, { useState } from "react";
import {
  DataStore,
  Group,
  Project,
  Selection,
  Track,
} from "../../../@backend/datastore";
import { DesktopView, Heading } from "../../../@core/components";
import { AddIcon, EditIcon } from "../../../components/icons/Icons";
import { RemixProperties } from "./RemixProperties";
import RemixForm from "./RemixForm";
import ActionButton from "../shared/ActionButton";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import { randomColor } from "../../helpers/colorHelpers";
import BackToLink from "../../../components/BackToLink";

type Props = {
  group: Group;
  remix: Project;
  tracks: Track[];
  clips: Selection[];
};

export default function ShowEditRemix({ remix, group, tracks, clips }: Props) {
  const history = useHistory();
  const [edit, setEdit] = useState(false);

  const addTrack = async () => {
    const track = await DataStore.save(
      new Track({
        groupID: group.id,
        projectID: remix.id,
        meta: {
          name: "Pista-" + (tracks.length + 1),
          volume: 1,
          position: tracks.length,
          color: randomColor(),
        },
        clips: [],
      })
    );
    history.push(routes.remixEditItemChild(remix.id, "t", track.id));
  };

  return (
    <DesktopView>
      <BackToLink label="Remezclas" to={routes.remixes()} />
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
      {/* <pre className="text-sm">
        {JSON.stringify({ remix, tracks, clips }, null, 2)}
      </pre> */}
    </DesktopView>
  );
}
