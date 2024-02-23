import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useColorMode from "./hooks/useColorMode";
import { GlobalStyles } from "./styles/Global";
import themes, { initialTheme } from "./styles/Theme";
import { ThemeContextProvider } from "./contexts/theme/ThemeContextProvider";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import PopupActivatedAcc from "./components/PopupActivatedAcc";
import WrapperBox from "./components/WrapperBox";

const App: React.FC = (): React.ReactElement => {
  const [theme, themeToggler] = useColorMode(initialTheme);

  return (
    <ThemeContextProvider
      theme={theme}
      themeToggler={themeToggler}
      themes={themes}
    >
      <GlobalStyles />
      <Router>
        <WrapperBox typeBg="bgPrimary" style={{ height: "100vh" }}>
          <Routes>
            <Route
              path="*"
              element={<ProtectedRoute path="/" element={<ProfilePage />} />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify/:id/:token" element={<PopupActivatedAcc />} />
          </Routes>
        </WrapperBox>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
