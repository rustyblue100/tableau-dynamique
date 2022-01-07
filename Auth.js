import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Login from "./components/Login";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("no-user");
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }

  if (!currentUser) {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 20,
          }}
        >
          <CircularProgress />
        </Box>
      );
    } else {
      return <Login />;
    }
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useAuth = () => useContext(AuthContext);
