import { createContext, useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { Group } from "../datastore";
import { useListGroupsQuery } from "../hooks/useOfflineQueries";

export const CurrentGroupContext = createContext<Group | undefined>(undefined);

export const CurrentGroupContextProvider: React.FC = ({ children }) => {
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const { data: groups, isLoading } = useListGroupsQuery();

  useEffect(() => {
    if (groups && groups.length > 0) {
      setGroup(groups[0]);
    }
  }, [groups]);
  return (
    <CurrentGroupContext.Provider value={group}>
      {isLoading ? <LoadingScreen /> : children}
    </CurrentGroupContext.Provider>
  );
};
