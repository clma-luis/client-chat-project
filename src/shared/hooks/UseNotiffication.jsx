import { useContext } from "react";
import { NotifficationContext } from "./NotifficationContext";

const useNotiffication = () => {
  const { notiffication, addNotiffication, removeNotiffication } =
    useContext(NotifficationContext);
  return { notiffication, addNotiffication, removeNotiffication };
};

export default useNotiffication;
