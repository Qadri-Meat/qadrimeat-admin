import { createTheme } from "@mui/material";

const getTheme = (theme) => {
  return createTheme({
    palette: {
      mode: theme.paletteType,
      primary: {
        main: theme.paletteType === "dark" ? "#ffffff" : "#20262E",
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: theme.paletteType !== "dark" && "#20262E",
          },
        },
      },
    },
  });
};

export default getTheme;
