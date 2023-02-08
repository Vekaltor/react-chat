import { useState } from "react";

enum viewEnums {
  login = "login",
  register = "register",
}

const useView = (): [viewEnums, () => void] => {
  const [view, setView] = useState(viewEnums.login);

  const swapView = (): void => {
    view === viewEnums.login
      ? setView(viewEnums.register)
      : setView(viewEnums.login);
  };

  return [view, swapView];
};

export default useView;
