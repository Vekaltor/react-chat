import { ReactElement, useContext } from "react";
import { S } from "./styles/ThemeSwitch.styles";
import ThemeTogglerContext from "../contexts/theme/ThemeContext";

const ThemeSwitch = (): ReactElement => {
  const themeContext = useContext(ThemeTogglerContext);

  return (
    <S.ThemeSwitch
      name="theme-switch"
      ariaLabel="Theme toogle"
      leftLabel=""
      rightLabel=""
      checked={themeContext?.theme === "dark"}
      onChange={themeContext?.themeToggler}
    />
  );
};

export default ThemeSwitch;
