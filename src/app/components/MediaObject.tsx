import React from "react";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  to: string;
  image: string;
  alt: string;
};

const MediaObject: React.FC<Props> = ({
  className = "",
  to,
  alt,
  image,
  children,
}) => (
  <Link to={to} className={className + " mb-2 flex w-full text-white min-h-12"}>
    <div className="ratio w-1/3 flex-shrink-0 overflow-hidden">
      <svg viewBox="0 0 16 9" />
      <img className="" src={image} alt={alt} />
    </div>
    {children}
  </Link>
);

export default MediaObject;
