import React from "react";
import Layout from "../../components/layout/Layout";
import { AudioFilesInput } from "../components/AudioFilesInput";
import { useSoundList } from "../hooks/useSoundQueries";
import { SoundsBrowser } from "../components/SoundsBrowser";
import { destroyDatabase } from "../backend";

type Props = {};
export const SoundListPage: React.FC<Props> = () => {
  const { data: sounds, refetch } = useSoundList();

  return (
    <Layout
      desktop={
        <div className="p-2 text-white">
          <h1>Añadir sonidos</h1>
          <div className="flex py-2">
            <AudioFilesInput
              bgColor="bg-sounds"
              onChange={() => {
                refetch();
              }}
            >
              Añadir sonidos
            </AudioFilesInput>
          </div>

          <button
            onClick={() => {
              destroyDatabase().then(() => refetch());
            }}
          >
            Borrar todos los sonidos
          </button>
        </div>
      }
    >
      <SoundsBrowser sounds={sounds} />
    </Layout>
  );
};
