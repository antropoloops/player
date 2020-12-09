import React from "react";
import cc from "classcat";

type SvgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

const SIZE_STYLES = {
  small: {
    text: "text-sm leading-6",
    icon: "w-6 h-6",
  },
  medium: {
    text: "leading-8",
    icon: "w-8 h-8",
  },
} as const;

const BG_STYLES = {
  gray: "bg-gray-light rounded-full opacity-75 hover:opacity-100",
  none: "hover:bg-gray-light opacity-75 hover:opacity-100",
};

type Size = "small" | "medium";
type Background = "none" | "gray";

type IconButtonProps = {
  className?: string;
  onClick?: () => void;
  icon?: SvgIcon;
  color?: string;
  textColor?: string;
  iconColor?: string;
  size?: Size;
  bg?: Background;
};

export const IconButton: React.FC<IconButtonProps> = ({
  className,
  children,
  icon: Icon,
  onClick,
  textColor,
  iconColor = textColor,
  size = "small",
  bg = "gray",
}) => {
  const sizes = SIZE_STYLES[size];
  const background = BG_STYLES[bg];

  return (
    <button
      className={cc([
        className,
        "flex items-center pr-3",
        textColor || "text-white-dark",
        sizes.text,
        background,
        "focus:outline-none rounded-full",
      ])}
      onClick={onClick}
    >
      {Icon && (
        <Icon
          className={`${sizes.icon} ${iconColor} rounded-full p-1 mr-1 shadow fill-current`}
        />
      )}
      {children}
    </button>
  );
};
