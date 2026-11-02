import { useCallback, useMemo, useState } from "react";

import { AuthContext } from "./AuthContext";
import { getSession, login, logout } from "../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession);

  const signIn = useCallback(async (email, password) => {
    const session = await login(email, password);

    setUser(session);

    return session;
  }, []);

  const signOut = useCallback(() => {
    logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}