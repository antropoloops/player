import React from "react";
import { useForm } from "react-hook-form";
import Fieldset, { FormActions, TextInput } from "../../@core/components/Form";
import { Group } from "../../models";

type Props = {
  className?: string;
  group?: Partial<Group>;
  onSubmit: (values: Group) => void;
};

export function GroupForm({ className, onSubmit, group }: Props) {
  const { register, handleSubmit } = useForm<Group>({
    defaultValues: group,
  });

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <TextInput name="name" ref={register({ required: true })} />
      </Fieldset>
      <FormActions />
    </form>
  );
}
