import React from "react";
import { useForm } from "react-hook-form";
import Fieldset, { FormActions, TextInput } from "../../@core/components/Form";
import { Track, TrackMetadata } from "../../models";

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
        <label></label>
        <FormActions className="my-4" onCancel={onCancel} />
      </Fieldset>
    </form>
  );
}
