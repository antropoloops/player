import React, { ReactElement } from "react";

type ListProps<T> = {
  className?: string;
  items: T[];
  render: (x: T) => ReactElement;
};

export function List<T>({ className, items, render }: ListProps<T>) {
  return <ul className={className}>{items.map((value) => render(value))}</ul>;
}

type PropertyListProps = {
  className?: string;
  keys: string[];
  labels: Record<string, string>;
  values: any;
};

export function PropertyList({
  className,
  keys,
  labels,
  values,
}: PropertyListProps) {
  return (
    <div className={"grid grid-cols-property-list gap-x-4 " + className}>
      {keys.map((key) => (
        <React.Fragment key={key}>
          <label className="text-right text-white-dark">
            {labels[key] || key}:
          </label>
          <span>{"" + (values[key] || "--")}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
