import React, { useState } from "react";
import classcat from "classcat";
import ActionButton from "./ActionButton";
import { DeleteIcon, CloseIcon } from "../../../components/icons/Icons";

type Props = {
  className?: string;
  message?: string;
  disabled?: boolean;
  onClick?: () => void;
  smallIcon?: boolean;
};

const DeleteAction: React.FC<Props> = ({
  className,
  message,
  disabled,
  children,
  onClick,
  smallIcon,
}) => {
  const [confirm, setConfirm] = useState(false);
  return (
    <div
      className={classcat([
        "flex my-4 bg-red-700 bg-opacity-25  p-4",
        className,
      ])}
    >
      {confirm ? (
        <div className="flex items-center">
          <label className="flex flex-grow flex-col mr-4 text-sm">
            <p>{message}</p>
            <p>Esta acción no se puede deshacer. Quieres continuar?</p>
          </label>
          <ActionButton
            disabled={disabled}
            icon={DeleteIcon}
            onClick={onClick}
            smallIcon={smallIcon}
          >
            Si, borrar
          </ActionButton>
          <ActionButton
            icon={CloseIcon}
            onClick={() => {
              setConfirm(false);
            }}
            smallIcon={smallIcon}
          >
            No, cancelar
          </ActionButton>
        </div>
      ) : (
        <ActionButton
          icon={DeleteIcon}
          onClick={() => {
            setConfirm(true);
          }}
          smallIcon={smallIcon}
        >
          {children}
        </ActionButton>
      )}
    </div>
  );
};

export default DeleteAction;
