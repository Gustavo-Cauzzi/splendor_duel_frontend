import { createTheme, darken, lighten } from "@mui/material";
type Mode = "light" | "dark";

const background = "#e6e9d9";
export const mainColor = "#BE9768";
export const extraLighColor = lighten(mainColor, 0.65);
export const lightColor = lighten(mainColor, 0.45);
export const darkColor = darken(mainColor, 0.45);

const lightPalette = {
  primary: {
    light: lightColor,
    main: mainColor,
    dark: darkColor,
  },
  background: { default: background },
};

const darkPalette = {
  primary: {
    light: extraLighColor,
    main: darken(extraLighColor, 0.45),
    dark: darken(extraLighColor, 0.65),
  },
  background: { default: "#2B2C29" },
};

const isDarkMode = (mode: Mode) => mode === "dark";
const getCurrentPallete = (mode: Mode) =>
  isDarkMode(mode) ? { mode, ...darkPalette } : { mode, ...lightPalette };

const AutocompletePopperStyles = (mode: Mode) => ({
  backgroundColor: lighten(getCurrentPallete(mode).background.default, 0.1),
  fontSize: "13px",
  color: isDarkMode(mode) ? "rgba(255, 255, 255, 0.64)" : "rgba(0, 0, 0, 0.64)",
  "&.MuiAutocomplete-loading": {
    fontWeight: "bold",
  },
  "&::-webkit-scrollbar": {
    width: "10px",
  },

  "&::-webkit-scrollbar-track": {
    background: lighten(getCurrentPallete(mode).background.default, 0.25),
  },

  "&::-webkit-scrollbar-thumb": {
    background: lighten(getCurrentPallete(mode).primary.light, 0.4),
    borderRadius: "10px",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    background: lighten(getCurrentPallete(mode).primary.light, 0.5),
  },
});

export const theme = (mode: Mode) =>
  createTheme({
    palette: getCurrentPallete(mode),
    components: {
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          placement: "top",
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          listbox: AutocompletePopperStyles(mode),
          noOptions: AutocompletePopperStyles(mode),
          loading: AutocompletePopperStyles(mode),
          inputRoot: {
            padding: "4px 12px",
            paddingBottom: "4px !important",
          },
          root: {
            "& .MuiAutocomplete-inputRoot:not(.Mui-disabled) .MuiAutocomplete-endAdornment":
              {
                svg: {
                  color: isDarkMode(mode)
                    ? getCurrentPallete(mode).primary.light
                    : getCurrentPallete(mode).primary.dark,
                },
              },
            ".MuiAutocomplete-popper": {
              ".MuiPaper-root": {
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: "monospace",
            whiteSpace: "nowrap",
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            textTransform: "none",
            "&.MuiButton-containedPrimary": {
              textTransform: "none",
              color: "#FFF",
              fontWeight: "bold",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
    },
  });
