import { ReactElement } from "react";
import { S } from "./styles/ThemeSwitch.styles";

type SwitchButtonProps = {
  theme: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const ThemeSwitch = ({ onChange, theme }: SwitchButtonProps): ReactElement => {
  return (
    <S.ThemeSwitch
      name="theme-switch"
      ariaLabel="Theme toogle"
      leftLabel=""
      rightLabel=""
      checked={theme === "dark"}
      onChange={onChange}
    />
  );
};

export default ThemeSwitch;
