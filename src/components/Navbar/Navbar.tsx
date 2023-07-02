import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Switch, Box } from "@mui/material";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { grey } from "@mui/material/colors";
import { ColorModeContext } from "../hook/DarkModeContext";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

export const Navbar: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "action.disabledBackground",

          color: "text.primary",
        }}>
        <Toolbar>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
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
              <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                iral Nation
              </Typography>
            </Box>
          </a>

          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
            }}>
            <LightModeIcon fontSize="small" />

            <Switch color="default" onClick={colorMode.toggleColorMode} />
            <DarkModeIcon fontSize="small" />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
