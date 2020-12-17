import { useContext } from "react";
import { CurrentGroupContext } from "../contexts/CurrentGroupContext";

export function useCurrentGroup() {
  return useContext(CurrentGroupContext);
}
