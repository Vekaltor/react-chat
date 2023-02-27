import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useColorMode from "./hooks/useColorMode";
import { GlobalStyles } from "./styles/Global";
import themes, { initialTheme } from "./styles/Theme";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import View from "./components/View";

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
    </ThemeContextProvider>
  );
};

export default App;
