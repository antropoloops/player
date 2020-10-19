import React from "react";

type Props = {
  label: string;
};

const ListHeader: React.FC<Props> = ({ label }) => {
  return (
    <div className="py-1 px-2 my-1 bg-green text-black font-normal text-base">
      {label}
    </div>
  );
};

export default ListHeader;
