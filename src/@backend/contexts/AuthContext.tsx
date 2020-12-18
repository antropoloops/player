import React from "react";
import { createContext, useEffect, useState } from "react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

export type Authorization = {
  user?: {
    id: string;
    email: string;
  };
};

export const AuthContext = createContext<Authorization>({});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const authorization = {
    user: user
      ? { id: user.id || user.username, email: user.attributes?.email }
      : undefined,
  };
  console.log("AUTH", authState, authorization, user);

  return (
    <AuthContext.Provider value={authorization}>
      {children}
    </AuthContext.Provider>
  );
};
