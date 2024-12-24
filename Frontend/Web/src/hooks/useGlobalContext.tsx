import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

export default useGlobalContext;