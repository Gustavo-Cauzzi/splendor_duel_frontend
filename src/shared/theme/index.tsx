import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import { theme } from "./Theme";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <MuiThemeProvider theme={theme("light")}>{children}</MuiThemeProvider>;
};
