import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AppContextState {
  activeLmk: string | null;
  setActiveLmk: (lmk: string) => void;
}

const AppContext = createContext({} as AppContextState);

type ContextWrapperProps = {
  children: ReactNode;
};

export function AppContextWrapper({ children }: ContextWrapperProps) {
  const setLmk = (lmk: string) => {
    setState({ ...state, activeLmk: lmk });
  };

  const [state, setState] = useState<AppContextState>({
    activeLmk: "",
    setActiveLmk: setLmk,
  });

  console.log(state);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
