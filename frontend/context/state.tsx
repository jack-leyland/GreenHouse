import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { epcCertificateObject } from "../types";

interface AppContextState {
  activeLmk: string;
  setActiveLmk: (lmk: string) => void;
  extraHouseInfo: epcCertificateObject["ExtraInfo"] | null;
  setExtraHouseInfo: (data: epcCertificateObject["ExtraInfo"]) => void;
}

const AppContext = createContext({} as AppContextState);

type ContextWrapperProps = {
  children: ReactNode;
};

export function AppContextWrapper({ children }: ContextWrapperProps) {
  const setLmk = (lmk: string) => {
    setState({ ...state, activeLmk: lmk });
  };

  const setHouseInfo = (data: epcCertificateObject["ExtraInfo"]) => {
    setState({ ...state, extraHouseInfo: data });
  };

  const [state, setState] = useState<AppContextState>({
    activeLmk: "",
    setActiveLmk: setLmk,
    extraHouseInfo: null,
    setExtraHouseInfo: setHouseInfo,
  });

  // Cache will only store lmks, cannot be null or empty string. On first time user vist,
  // app will fallback to default blank lmk from context state. Otherwise, cache will contain most recently searched lmk
  useEffect(() => {
    if (state.activeLmk) {
      localStorage.setItem("activeLmk", state.activeLmk);
    }
    if (state.extraHouseInfo) {
      localStorage.setItem(
        "extraHouseInfo",
        JSON.stringify(state.extraHouseInfo)
      );
    }

  }, [state]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
