import React, { useState } from "react";
import {
  DataStore,
  Group,
  Project,
  Selection,
} from "../../../@backend/datastore";
import { DesktopView, Heading } from "../../../@core/components";
import { EditIcon } from "../../../components/icons/Icons";
import ActionButton from "../shared/ActionButton";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import BackToLink from "../../../components/BackToLink";
import ArchiveForm from "./ArchiveForm";
import ArchiveProperties from "./ArchiveProperties";
import FilesInput from "../shared/FilesInput";
import { imageUploader } from "../../services/imageUploader";

type Props = {
  group: Group;
  archive: Project;
};

export default function ShowEditArchive({ group, archive }: Props) {
  const history = useHistory();
  const [edit, setEdit] = useState(false);

  const uploadFile = async (file: File) => {
    const selection = await imageUploader(archive, group)(file);
    return selection.id;
  };

  return (
    <DesktopView>
      <BackToLink label="Archivo" to={routes.archives()} />
      <Heading level={1} className="mb-8">
        {archive.meta.title}
      </Heading>

      {edit ? (
        <ArchiveForm
          archive={archive}
          className="max-w-2xl"
          onSubmit={(data) => {
            DataStore.save(
              Project.copyOf(archive, (draft) => {
                draft.meta = data.meta;
              })
            ).then(() => setEdit(false));
          }}
          onCancel={() => setEdit(false)}
        />
      ) : (
        <>
          <ArchiveProperties className="my-8" archive={archive} />
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
            <FilesInput
              colors="bg-archives text-black"
              className="mr-4"
              uploadFile={uploadFile}
            >
              Subir grabaciones
            </FilesInput>
          </div>
        </>
      )}
      {/* <pre className="text-sm">
        {JSON.stringify({ remix, tracks, clips }, null, 2)}
      </pre> */}
    </DesktopView>
  );
}
