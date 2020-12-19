import classcat from "classcat";
import React from "react";
import ActionButton from "../../@remix/components/shared/ActionButton";
import { DoneIcon, ClearIcon } from "../../components/icons/Icons";

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
  type?: string;
  name: string;
  autoFocus?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, type, autoFocus }, ref) => (
    <input
      type={type}
      className="bg-gray-darker p-1 focus:outline-none"
      name={name}
      ref={ref}
      autoFocus={autoFocus}
    />
  )
);

type FormActionsProps = {
  className?: string;
  onCancel?: () => void;
};

export const FormActions: React.FC<FormActionsProps> = ({
  className,
  onCancel,
  children,
}) => {
  return (
    <div className={classcat(["flex", className])}>
      <ActionButton icon={DoneIcon} className="mr-4" type="submit">
        Guardar
      </ActionButton>
      {onCancel && (
        <ActionButton icon={ClearIcon} className="mr-4" onClick={onCancel}>
          Cancelar
        </ActionButton>
      )}
      {children}
    </div>
  );
};
