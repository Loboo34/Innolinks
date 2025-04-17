import { useContext } from "react";
import { AuthContext } from "../context/userContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContext proviser");
  }

  return context;
};
