import { useState, useEffect, ChangeEventHandler } from "react";

const useColorMode = (): [string, ChangeEventHandler] => {
  const [theme, setTheme] = useState("dark");

  const setMode = (mode: string): void => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = (): void => {
    theme === "dark" ? setMode("light") : setMode("dark");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  return [theme, themeToggler];
};

export default useColorMode;
