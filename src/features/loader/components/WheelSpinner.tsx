import { StyledWheelSpinner } from "./styles/WheelSpinner.styles";

export type WheelSpinerCssProps = {
  color?: string;
  size?: string;
  borderSize?: string;
};

const WheelSpinner = (props: WheelSpinerCssProps) => {
  return <StyledWheelSpinner {...props} />;
};

export default WheelSpinner;
