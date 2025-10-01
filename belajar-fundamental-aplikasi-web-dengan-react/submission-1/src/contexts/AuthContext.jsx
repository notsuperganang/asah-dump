import { createContext, useState, useEffect, useMemo } from "react";
import { getUserLogged, putAccessToken } from "../utils/network-data";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { error, data } = await getUserLogged();

      if (!error) {
        setAuthedUser(data);
      }

      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const onLoginSuccess = async (accessToken) => {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();

    if (!error) {
      setAuthedUser(data);
    }
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  const contextValue = useMemo(() => ({
    authedUser,
    isLoading,
    onLoginSuccess,
    onLogout,
  }), [authedUser, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
