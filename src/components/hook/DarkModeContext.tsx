import { ThemeProvider, createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: blue,
                divider: grey[200],
                buttons: {
                  default: blue[800],
                },
                action: {
                  hover: grey[400],
                  disabledBackground: "#ffff",
                },
                background: {
                  default: grey[100],
                  paper: grey[200],
                },
                text: {
                  primary: grey[900],
                  secondary: grey[700],
                  disabled: grey[400],
                },
              }
            : {
                // palette values for dark mode
                primary: blue,
                divider: grey[900],
                action: {
                  hover: grey[400],
                  disabledBackground: "#030303",
                },
                background: {
                  default: "#000000",
                  paper: "#101010",
                },
                text: {
                  primary: grey[100],
                  secondary: grey[300],
                  disabled: grey[800],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
