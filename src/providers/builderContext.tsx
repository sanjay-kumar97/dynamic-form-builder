import { createContext } from "react";

import { ContextProps } from "@/types";

type ProviderProps = {
  children: React.ReactNode;
  values: ContextProps;
};

export const BuilderContext = createContext<ContextProps>({} as ContextProps);

export const BuilderContextProvider: React.FC<ProviderProps> = ({
  children,
  values,
}) => {
  return (
    <BuilderContext.Provider value={values}>{children}</BuilderContext.Provider>
  );
};
