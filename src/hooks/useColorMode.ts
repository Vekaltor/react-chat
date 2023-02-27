import { useState, ChangeEventHandler, useLayoutEffect } from "react";

const useColorMode = (intial: string): [string, ChangeEventHandler] => {
  const [theme, setTheme] = useState<string>(intial);

  const setMode = (mode: string): void => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = (): void => {
    theme === "dark" ? setMode("light") : setMode("dark");
  };

  useLayoutEffect(() => {
    const localTheme: string | null = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [theme, themeToggler];
};

export default useColorMode;
