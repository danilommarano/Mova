import React, { createContext, useState } from 'react';

type SvgContextType = {
  svgString: string | null;
  setSvgString: (svg: string | null) => void;
};

export const SvgContext = createContext<SvgContextType>({
  svgString: null,
  setSvgString: () => {},
});

type SvgContextProviderProps = {
  children: React.ReactNode;
};

export function SvgContextProvider({ children }: SvgContextProviderProps) {
  const [svgString, setSvgString] = useState<string | null>(null);

  const contextValue: SvgContextType = {
    svgString,
    setSvgString,
  };

  return (
    <SvgContext.Provider value={contextValue}>
      {children}
    </SvgContext.Provider>
  );
}
