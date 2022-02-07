import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AppContextState {
  activeLmk: string;
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
    activeLmk: '',
    setActiveLmk: setLmk,
  });

  // Everytime context state changes, persist desired data in local storage
  useEffect(() => {
    localStorage.setItem('activeLmk', state.activeLmk);
  }, [state]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
