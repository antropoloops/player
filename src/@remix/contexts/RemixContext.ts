import { createContext } from "react";
import { Project, Track, Clip, Group } from "../../models";

export type RemixEditProps = {
  isLoading?: boolean;
  group: Group;
  remix: Project;
  tracks?: Track[];
  clips?: Clip[];
};

const RemixContext = createContext<RemixEditProps>({
  remix: {
    type: "REMIX",
    id: "",
    groupID: "",
    access: "GROUP",
    meta: {},
    remix: {},
  },
  group: {
    id: "",
    name: "",
    meta: {},
  },
});

export default RemixContext;
