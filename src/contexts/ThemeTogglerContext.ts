import { ChangeEventHandler, createContext } from "react";

type ThemeTogglerContextProps =
  | {
      theme: string;
      themeToggler: ChangeEventHandler<HTMLInputElement>;
    }
  | undefined;

const ThemeTogglerContext = createContext<ThemeTogglerContextProps>(undefined);

export default ThemeTogglerContext;
