import { StyledLoaderContainer } from "./components/styles/LoaderContainer.styles";
import WheelSpinner from "./components/WheelSpinner";

type LoadingSpinnerProps = {
  Spinner?: React.ReactElement;
  position?: "absolute" | "fixed" | "relative";
  background?: string;
};

const Loader = (props: LoadingSpinnerProps) => {
  const { Spinner, position, background } = props;
  const DefaultSpinner = (
    <WheelSpinner color="#333" size="30px" borderSize="3px" />
  );
  return (
    <StyledLoaderContainer position={position} background={background}>
      {Spinner ? Spinner : DefaultSpinner}
    </StyledLoaderContainer>
  );
};

export default Loader;
