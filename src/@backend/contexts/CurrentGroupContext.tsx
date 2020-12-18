import { createContext, useEffect, useState } from "react";
import { changeGroup } from "../datastore";

type Group = {
  id: string;
  name: string;
};
type Listener = (group?: Group) => void;

let _currentGroup: Group | undefined;
let listeners: Listener[] = [];

export function getCurrentGroup() {
  return _currentGroup;
}

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((x) => x !== listener);
  };
}

export async function setCurrentGroup(group?: Group) {
  _currentGroup = group;
  if (group) changeGroup(group.id);
  for (const listener of listeners) {
    listener(group);
  }
}

export const CurrentGroupContext = createContext<Group | undefined>(undefined);

export const CurrentGroupContextProvider: React.FC = ({ children }) => {
  const [group, setGroup] = useState<Group | undefined>(_currentGroup);

  useEffect(() => subscribe(setGroup), []);

  return (
    <CurrentGroupContext.Provider value={group}>
      {children}
    </CurrentGroupContext.Provider>
  );
};
