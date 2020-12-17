import React from "react";

const Fieldset: React.FC = ({ children }) => {
  return (
    <fieldset className="grid grid-cols-property-list gap-x-4 gap-y-1">
      {" "}
      {children}
    </fieldset>
  );
};
export default Fieldset;

type TextInputProps = {
  className?: string;
  name: string;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ name }, ref) => (
    <input
      className="bg-gray-darker p-1 focus:outline-none"
      name={name}
      ref={ref}
    />
  )
);

type FormActionsProps = {
  onCancel?: () => void;
};

export const FormActions: React.FC<FormActionsProps> = ({ children }) => {
  return (
    <div className="flex">
      <button type="submit">Guardar</button>
      {children}
    </div>
  );
};
