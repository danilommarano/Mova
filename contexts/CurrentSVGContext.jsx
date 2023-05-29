import { ReactNode, createContext, useState } from "react";

export const CurrentSVGContext = createContext({
  currentSVG: null,
  setCurrentSVG: () => {},
});

export function CurrentSVGProvider(props) {
  const [currentSVG, setCurrentSVG] = useState(null);
  return (
    <CurrentSVGContext.Provider value={{ currentSVG, setCurrentSVG }}>
      {props.children}
    </CurrentSVGContext.Provider>
  );
}
