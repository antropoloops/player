import React, { ReactNode, useEffect, useState } from "react";
import { validate } from "uuid";
import { DoneIcon, EditIcon } from "../../../components/icons/Icons";
import { IconButton } from "../../../components/shared/IconButton";
import { TextInput } from "./TextInput";

export { TextInput } from "./TextInput";
export { FileInput } from "./FileInput";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
};

type Props = {
  label?: string;
  value: string;
  render: (value: string) => ReactNode;
  input?: (input: InputProps) => JSX.Element;
  onChange: (value: string) => void;
  validate?: (value: string) => undefined | string;
};

export function InlineEdit({
  label,
  value,
  render,
  onChange,
  input: Input = TextInput,
}: Props) {
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    setCurrent(value);
  }, [value, setCurrent]);

  const handleSave = () => {
    const error = validate && validate(value);
    if (!error) {
      onChange(current);
      setEdit(false);
    }
  };

  if (edit) {
    return (
      <div>
        {label && <h4 className="mt-2 text-white-dark text-sm">{label}</h4>}
        <Input value={current} onChange={setCurrent} onSave={handleSave} />
        <div className="flex py-2">
          <IconButton icon={DoneIcon} onClick={handleSave}>
            Save
          </IconButton>
          <button
            className="text-sm ml-2"
            onClick={() => {
              setCurrent(value);
              setEdit(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-baseline">
        {render(current)}
        <button
          className="text-white p-1 ml-2 bg-gray-light opacity-50 rounded-full hover:opacity-100 hover:shadow"
          onClick={() => setEdit(true)}
        >
          <EditIcon className="w-3 h-3 fill-current" />
        </button>
      </div>
    );
  }
}

export default InlineEdit;
