import { ChangeEventHandler, createContext } from "react";

type ThemeTogglerContextProps =
  | ChangeEventHandler<HTMLInputElement>
  | undefined;

const ThemeTogglerContext = createContext<ThemeTogglerContextProps>(undefined);

export default ThemeTogglerContext;
