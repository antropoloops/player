import React from "react";
import { useForm } from "react-hook-form";
import Fieldset, { FormActions, TextInput } from "../../@core/components/Form";
import { Metadata, RemixMetadata } from "../../models";

type RemixData = {
  meta: Metadata;
  remix: RemixMetadata;
};

type Props = {
  className?: string;
  remix?: Partial<RemixData>;
  onSubmit: (values: RemixData) => void;
  onCancel?: () => void;
};

export default function RemixForm({
  className,
  onSubmit,
  onCancel,
  remix,
}: Props) {
  const { register, handleSubmit } = useForm<RemixData>({
    defaultValues: remix,
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

        <label>Bpm (tempo)</label>
        <TextInput
          type="number"
          name="remix.bpm"
          ref={register({ valueAsNumber: true })}
        />

        <label></label>
        <FormActions className="my-4" onCancel={onCancel} />
      </Fieldset>
    </form>
  );
}
