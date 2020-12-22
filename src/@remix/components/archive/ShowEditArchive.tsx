import React, { useState } from "react";
import { DataStore, Group, Project, Clip } from "../../../@backend/datastore";
import { DesktopView, Heading } from "../../../@core/components";
import { EditIcon } from "../../../components/icons/Icons";
import ActionButton from "../shared/ActionButton";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import BackToLink from "../../../components/BackToLink";
import ArchiveForm from "./ArchiveForm";
import ArchiveProperties from "./ArchiveProperties";
import FilesInput from "../shared/FilesInput";
import { audioUploader } from "../../services/audioUploader";
import useSimpleAudioContext from "../../hooks/useSimpleAudioContext";

type Props = {
  group: Group;
  archive: Project;
};

export default function ShowEditArchive({ group, archive }: Props) {
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const ctx = useSimpleAudioContext();

  const uploadFile = async (file: File) => {
    const uploader = audioUploader(ctx, group, archive, undefined);
    const selection = await uploader(file);
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
              fileType="audio"
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
