import { createContext, useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { changeGroup, Group } from "../datastore";
import { useObserveModel } from "../hooks/useObserveModel";

const STORAGE_KEY = "ATPLS_GROUP";

type Listener = (groupId: string) => void;

let _currentGroupId = localStorage.getItem(STORAGE_KEY) || "";

let listeners: Listener[] = [];

export function getCurrentGroupId() {
  return _currentGroupId;
}

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((x) => x !== listener);
  };
}

export async function setCurrentGroup(groupId: string) {
  _currentGroupId = groupId;
  localStorage.setItem(STORAGE_KEY, groupId);
  if (groupId) changeGroup(groupId);
  for (const listener of listeners) {
    listener(groupId);
  }
}

export const CurrentGroupContext = createContext<Group | undefined>(undefined);

export const CurrentGroupContextProvider: React.FC = ({ children }) => {
  const [groupId, setGroupId] = useState(_currentGroupId);
  const { data, isLoading } = useObserveModel(Group, _currentGroupId);

  useEffect(() => subscribe(setGroupId), [groupId]);

  return (
    <CurrentGroupContext.Provider value={data}>
      {isLoading ? <LoadingScreen /> : children}
    </CurrentGroupContext.Provider>
  );
};
