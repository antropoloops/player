import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useCurrentUser() {
  const { user } = useContext(AuthContext);
  return user;
}
