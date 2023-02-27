import { useState } from "react";

enum viewEnums {
  login,
  register,
}

const useView = (initial: viewEnums): [viewEnums, () => void] => {
  const [view, setView] = useState<viewEnums>(initial);

  const swapView = (): void => {
    view === viewEnums.login
      ? setView(viewEnums.register)
      : setView(viewEnums.login);
  };

  return [view, swapView];
};

export default useView;
