import React from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
};
export function TextInput({ value, onChange, onSave }: InputProps) {
  return (
    <input
      type="text"
      className="p-2 bg-gray-darker text-white focus:outline-none"
      value={value}
      autoFocus
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSave?.();
        }
      }}
    />
  );
}
