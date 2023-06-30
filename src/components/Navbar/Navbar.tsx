import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Switch, Box } from "@mui/material";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { grey } from "@mui/material/colors";
import { DarkModeContext } from "../hook/DarkModeContext";

export const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const darkModeColor = {
    color: darkMode ? grey[300] : grey[500],
  };
  const lightModeColor = {
    color: darkMode ? grey[300] : grey[800],
  };
  const theme: Theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#000000" : "#ffffff",
      },
      background: {
        default: darkMode ? "#000000" : "#ffffff",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography
              variant="h3"
              style={{ fontFamily: "DM Serif Display, sans-serif" }}>
              V
            </Typography>

            <Typography
              variant="subtitle2"
              component="div"
              sx={{ flexGrow: 1 }}>
              iral Nation
            </Typography>
          </Box>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
            }}>
            <LightModeIcon sx={lightModeColor} />
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="default"
            />
            <DarkModeIcon sx={darkModeColor} />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
