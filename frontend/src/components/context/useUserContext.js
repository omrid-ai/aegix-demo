import { createContext, useContext } from "react";

export const UserContext = createContext({
  user: {
    username: localStorage.getItem("username") || "guest",
    role: localStorage.getItem("userRole") || "viewer",
  },
});

export const useUser = () => useContext(UserContext);