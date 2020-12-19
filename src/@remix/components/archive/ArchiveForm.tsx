import React from "react";
import { useForm } from "react-hook-form";
import Fieldset, {
  FormActions,
  TextInput,
} from "../../../@core/components/Form";
import { Metadata } from "../../../models";

type ArchiveData = {
  meta: Metadata;
};

type Props = {
  className?: string;
  archive?: Partial<ArchiveData>;
  onSubmit: (values: ArchiveData) => void;
  onCancel?: () => void;
};

export default function ArchiveForm({
  className,
  onSubmit,
  onCancel,
  archive,
}: Props) {
  const { register, handleSubmit } = useForm<ArchiveData>({
    defaultValues: archive,
  });

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <label>Nombre</label>
        <TextInput
          name="meta.title"
          ref={register({ required: true })}
          autoFocus
        />
        <label>Descripción</label>
        <TextInput name="meta.description" ref={register()} />
        <label>¿Quién lo ha hecho?</label>
        <TextInput name="meta.authors" ref={register()} />

        <label></label>
        <FormActions className="my-4" onCancel={onCancel} />
      </Fieldset>
    </form>
  );
}
