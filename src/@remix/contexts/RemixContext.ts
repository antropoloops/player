import { createContext } from "react";
import { Project, Track, Clip, Group } from "../../models";

export type RemixContextValue = {
  isLoading?: boolean;
  group: Group;
  remix?: Project;
  tracks?: Track[];
  clips?: Clip[];
};

const RemixContext = createContext<RemixContextValue>({
  group: {
    id: "",
    name: "",
    meta: {},
  },
});

export default RemixContext;
