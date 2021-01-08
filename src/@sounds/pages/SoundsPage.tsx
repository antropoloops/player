import classcat from "classcat";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Waveform } from "../../@archive/components/Waveform";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import { useObserveList } from "../../@backend/hooks/useObserveModel";
import { NotAuthorizedPage } from "../../@backend/pages/NotAuthorizedPage";
import { DesktopView, Separator } from "../../@core/components";
import Layout from "../../components/layout/Layout";
import { Media, MediaType } from "../../models";
import routes from "../../routes";
import { AudioFilesInput } from "../components/AudioFilesInput";

type Props = {};

const SoundPage: React.FC<Props> = () => {
  const params = useParams<{ id?: string }>();
  const group = useCurrentGroup();
  const { data: sounds } = useObserveList(Media, group?.id, (c) =>
    c.type("eq", MediaType.RECORDING)
  );

  if (!group) return <NotAuthorizedPage />;
  return (
    <Layout
      nav="admin"
      desktop={
        <DesktopView>
          <div className="flex">
            <AudioFilesInput bgColor="bg-sounds" onChange={() => {}}>
              Añadir sonidos
            </AudioFilesInput>
          </div>
          <pre className="text-xs">{JSON.stringify(sounds, null, 2)}</pre>
        </DesktopView>
      }
    >
      <Separator className="bg-sounds" to={routes.sounds()}>
        Sonidos {group.name}
      </Separator>
      {sounds.map((sound) => (
        <Link
          key={sound.id}
          className={classcat([
            "block overflow-hidden group items-center px-2 mb-1 shadow",
            "text-sounds",
            params.id === sound.id
              ? "bg-gray-lighter"
              : "bg-gray-light hover:bg-gray-lighter",
          ])}
          to={routes.sound(sound.id)}
        >
          <div className="text-sm truncate">{sound.file.fileName}</div>
          {sound.file.thumbnail && (
            <Waveform
              className="my-2"
              width={100}
              height={10}
              points={sound.file.thumbnail}
            />
          )}
        </Link>
      ))}
    </Layout>
  );
};
export default SoundPage;
