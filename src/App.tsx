import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useColorMode from "./hooks/useColorMode";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/Global";
import { darkTheme, lightTheme } from "./styles/Theme";
import ThemeTogglerContext from "./contexts/ThemeTogglerContext";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import View from "./components/View";

const App: React.FC = (): React.ReactElement => {
  const [theme, themeToggler] = useColorMode();

  return (
    <ThemeTogglerContext.Provider value={{ theme, themeToggler }}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <View>
            <Routes>
              <Route
                path="*"
                element={
                  <ProtectedRoute
                    isAuth={false}
                    path="/"
                    element={<ProfilePage />}
                  />
                }
              />
              <Route path="/login" element={<LoginPage isAuth={false} />} />
            </Routes>
          </View>
        </Router>
      </ThemeProvider>
    </ThemeTogglerContext.Provider>
  );
};

export default App;
