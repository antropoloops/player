import React, { ReactElement } from "react";

//github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
const get = (obj: object, path: string, defaultValue?: any) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res: any, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

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
    <div
      className={"grid grid-cols-property-list gap-x-4 gap-y-1 " + className}
    >
      {keys.map((key) => (
        <React.Fragment key={key}>
          <label className="text-right text-white-dark">
            {labels[key] || key}:
          </label>
          <span>{"" + get(values, key, "--")}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
