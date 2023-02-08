import { ReactNode } from "react";
import { WrapperCenterPage } from "./styles/WrapperCenterPage";

type ViewProps = {
  children: ReactNode;
};

const View = ({ children }: ViewProps) => {
  return <WrapperCenterPage>{children}</WrapperCenterPage>;
};

export default View;
