import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./configs/themeConfig";
import ThemeContext from "./context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import routes from "configs/routesConfig";
import LoginPage from "pages/auth/login/LoginPage";

const App = () => {
  const curThemeName = localStorage.getItem("appTheme") || "light";

  const [themeType, setThemeType] = useState(curThemeName);

  const setThemeName = (themeName) => {
    localStorage.setItem("appTheme", themeName);
    setThemeType(themeName);
  };

  const theme = getTheme({
    paletteType: themeType,
  });

  return (
    <ThemeContext.Provider value={{ setThemeName, curThemeName }}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
