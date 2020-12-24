import React, { useState } from "react";
import classcat from "classcat";
import ActionButton from "./ActionButton";
import { DeleteIcon, CloseIcon } from "../../../components/icons/Icons";

type Props = {
  className?: string;
  message?: string;
  disabled?: string;
  onClick?: () => void;
};

const DeleteAction: React.FC<Props> = ({
  className,
  message,
  disabled,
  children,
  onClick,
}) => {
  const [confirm, setConfirm] = useState(false);
  return (
    <div
      className={classcat([
        "flex my-16 bg-red-700 bg-opacity-25 p-4",
        disabled && "opacity-50",
        className,
      ])}
    >
      {confirm ? (
        <div className="flex items-center">
          <label className="flex flex-grow flex-col mr-4 text-sm">
            <p>{message}</p>
            <p>Esta acción no se puede deshacer. ¿Quieres continuar?</p>
          </label>
          <ActionButton icon={DeleteIcon} onClick={onClick} smallIcon>
            Si, borrar
          </ActionButton>
          <ActionButton
            icon={CloseIcon}
            onClick={() => {
              setConfirm(false);
            }}
            smallIcon
          >
            No, cancelar
          </ActionButton>
        </div>
      ) : (
        <div className="flex items-center">
          <ActionButton
            disabled={!!disabled}
            icon={DeleteIcon}
            onClick={() => {
              setConfirm(true);
            }}
            smallIcon
          >
            {children}
          </ActionButton>
          {disabled && <label>{disabled}</label>}
        </div>
      )}
    </div>
  );
};

export default DeleteAction;
