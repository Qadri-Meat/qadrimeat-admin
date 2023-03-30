import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "./configs/themeConfig";
import ThemeContext from "./context/ThemeContext";
import { Route, Switch } from "react-router-dom";
import routes from "configs/routesConfig";
import LoginPage from "pages/auth/login/LoginPage";
import PrivateRoutes from "utils/PrivateRoutes";

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
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoutes>
              {routes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </PrivateRoutes>
          </Switch>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
