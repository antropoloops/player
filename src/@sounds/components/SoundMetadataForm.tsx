import { useForm } from "react-hook-form";
import { SoundMetadata } from "../backend";

type SoundMetadataFormProps = { className?: string };

export function SoundMetadataForm({ className }: SoundMetadataFormProps) {
  const { register, handleSubmit } = useForm<SoundMetadata>();

  const onSubmit = (data: SoundMetadata) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <fieldset className="grid grid-cols-property-list gap-x-4 gap-y-1">
        <label className="flex items-center text-right mr-2">Título</label>
        <input
          className="bg-gray-darker p-1 focus:outline-none"
          name="title"
          ref={register({ required: true })}
        />
        <label className="flex items-center text-right mr-2">Álbum</label>
        <input
          className="bg-gray-darker p-1 focus:outline-none"
          name="album"
          ref={register({ required: true })}
        />
        <label className="flex items-center text-right mr-2">Artista</label>
        <input
          className="bg-gray-darker p-1 focus:outline-none"
          name="artist"
          ref={register({ required: true })}
        />
      </fieldset>
      <button type="submit">Guardar</button>
    </form>
  );
}
