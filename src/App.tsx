import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useColorMode from "./hooks/useColorMode";
import { GlobalStyles } from "./styles/Global";
import themes, { initialTheme } from "./styles/Theme";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import { useAppSelector } from "./hooks/useAppSelector";
import { useCookies } from "react-cookie";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import View from "./components/View";
import PopupActivatedAcc from "./components/PopupActivatedAcc";

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
        <View>
          <Routes>
            <Route
              path="*"
              element={<ProtectedRoute path="/" element={<ProfilePage />} />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify/:id/:token" element={<PopupActivatedAcc />} />
          </Routes>
        </View>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
