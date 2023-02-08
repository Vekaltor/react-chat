import { ReactElement } from "react";
import CSSVariables, { S } from "./styles/ToogleSwitch.styles";

type SwitchButtonProps = {
  name: string;
  ariaLabel: string;
  leftLabel: string;
  rightLabel: string;
  checked?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const ToogleSwitch = (props: SwitchButtonProps): ReactElement => {
  const { name, ariaLabel, leftLabel, rightLabel, checked, onChange } = props;
  return (
    <CSSVariables>
      <S.WrapperSwitch>
        <S.Input
          type="checkbox"
          name={name}
          aria-label={ariaLabel}
          left-label={leftLabel}
          right-label={rightLabel}
          checked={checked}
          onChange={onChange}
        />
        <S.SliderRound />
      </S.WrapperSwitch>
    </CSSVariables>
  );
};

export default ToogleSwitch;
