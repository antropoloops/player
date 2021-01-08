import React from "react";
import { useForm } from "react-hook-form";
import Fieldset, {
  FormActions,
  TextInput,
} from "../../../@core/components/Form";
import { ClipMetadata } from "../../../models";

type Props = {
  className?: string;
  clip?: Partial<ClipMetadata>;
  onSubmit: (values: ClipMetadata) => void;
  onCancel?: () => void;
};

export default function ClipForm({
  className,
  onSubmit,
  onCancel,
  clip,
}: Props) {
  const { register, handleSubmit } = useForm<ClipMetadata>({
    defaultValues: clip,
  });

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <label>Nombre</label>
        <TextInput name="name" ref={register({ required: true })} autoFocus />
        <label>Tecla</label>
        <TextInput name="keyboardKey" ref={register()} />
        <label></label>
        <FormActions className="my-4" onCancel={onCancel} />
      </Fieldset>
    </form>
  );
}
