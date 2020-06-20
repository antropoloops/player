import React from "react";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  to: string;
  image: string;
  alt: string;
};

const MediaObject: React.FC<Props> = ({ to, alt, image, children }) => (
  <Link to={to} className="mb-2 flex w-full text-white bg-gray-light">
    <div className="ratio w-1/3 flex-shrink-0">
      <svg viewBox="0 0 16 9" />
      <img className="" src={image} alt={alt} />
    </div>
    <div className="p-2">{children}</div>
  </Link>
);

export default MediaObject;
