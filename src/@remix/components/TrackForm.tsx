import React from "react";
import { useForm } from "react-hook-form";
import Fieldset, { FormActions, TextInput } from "../../@core/components/Form";
import { TrackMetadata } from "../../models";

type Props = {
  className?: string;
  track?: Partial<TrackMetadata>;
  onSubmit: (values: TrackMetadata) => void;
  onCancel?: () => void;
};

export default function TrackForm({
  className,
  onSubmit,
  onCancel,
  track,
}: Props) {
  const { register, handleSubmit } = useForm<TrackMetadata>({
    defaultValues: track,
  });

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <label>Nombre</label>
        <TextInput name="name" ref={register({ required: true })} autoFocus />
        <label>Color</label>
        <TextInput name="color" ref={register({ required: true })} />
        <label>Posición</label>
        <TextInput
          type="number"
          name="position"
          ref={register({ required: true, valueAsNumber: true })}
        />
        <label>Volúmen</label>
        <TextInput
          type="number"
          name="volume"
          ref={register({ required: true, valueAsNumber: true })}
        />
        <label></label>
        <FormActions className="my-4" onCancel={onCancel} />
      </Fieldset>
    </form>
  );
}
