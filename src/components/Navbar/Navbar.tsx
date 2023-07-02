import React from "react";
import { AppBar, Toolbar, Typography, Switch, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../hook/DarkModeContext";
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
          padding: "0px 10px ",
          color: "text.primary",
        }}>
        <Toolbar>
          <a
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}>
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
