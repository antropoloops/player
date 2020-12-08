import { useReducer } from "react";
import { Audioset, EmptyAudioset } from "../../audioset";
import { OfflineRemix } from "../offline";

type EditPath = {
  type: "meta" | "clip" | "track";
  id: string;
};

type EditRemixState = {
  audioset: Audioset;
  path: EditPath;
};

const createInitialState = (): EditRemixState => ({
  audioset: EmptyAudioset,
  path: { type: "meta", id: "" },
});

export type EditRemixAction =
  | { type: "init"; remix: OfflineRemix }
  | { type: "edit"; path: EditPath }
  | { type: "audioset:update"; audioset: Audioset };

function reducer(
  state: EditRemixState,
  action: EditRemixAction
): EditRemixState {
  switch (action.type) {
    case "init":
      return {
        ...createInitialState(),
        audioset: action.remix.audioset,
      };

    case "edit":
      return { ...state, path: action.path };

    case "audioset:update":
      return { ...state, audioset: action.audioset };
  }
}

export function useEditRemix() {
  return useReducer(reducer, createInitialState());
}
