import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { PaletteType } from "@material-ui/core";

const getTheme = (mode: any) =>
  responsiveFontSizes(
    createMuiTheme({
      layout: {
        contentWidth: 860,
      },
      palette: mode === "light" ? light : dark,
      typography: {
        fontFamily: "Noto Sans JP", //;"Mono", // Lato.
        h1: {
          fontSize: "1.728rem",
          fontWeight: 700,
          // [breakpoints.up('md')]: {
          //   fontSize: '2.4rem',
          // },
        },
        h2: {
          fontSize: "1.6em",
          fontWeight: 700,
          borderBottom: "1px solid rgba(92,147,187,.17)",
          paddingBottom: ".2em",
          marginBottom: "1.1rem",
        },
        h3: {
          fontSize: "1.2em",
          fontWeight: "bold",
        },
        h4: {
          fontSize: "1.0em",
          fontWeight: "bold",
        },
        body1: {
          fontSize: 16,
        },
        body2: {
          fontSize: 16,
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1100,
      },
    })
  );

export const light = {
  alternate: {
    main: "rgb(247, 249, 250)",
    dark: "#e8eaf6",
  },
  cardShadow: "rgba(23, 70, 161, .11)",
  type: "light" as PaletteType,
  primary: {
    main: "#3f51b5",
    light: "rgb(71, 145, 219)",
    dark: "rgb(17, 82, 147)",
    contrastText: "#fff",
  },
  secondary: {
    light: "#ffb74d",
    main: "#f9b934",
    dark: "#f57c00",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  text: {
    primary: "#2d3748",
    secondary: "#718096",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: "#fff",
    default: "#fff",
    level2: "#f5f5f5",
    level1: "#fff",
    footer: "#1b1642",
  },
};

export const dark = {
  alternate: {
    main: "#2D3748",
    dark: "#24242b",
  },
  cardShadow: "rgba(0, 0, 0, .11)",
  common: {
    black: "#000",
    white: "#fff",
  },
  type: "dark" as PaletteType,
  primary: {
    main: "#90caf9",
    light: "rgb(166, 212, 250)",
    dark: "rgb(100, 141, 174)",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  secondary: {
    light: "#ffb74d",
    main: "#f9b934",
    dark: "#f57c00",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  text: {
    primary: "#EEEEEF",
    secondary: "#AEB0B4",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#1A202C",
    default: "#121212",
    level2: "#333",
    level1: "#2D3748",
    footer: "#18181f",
  },
};

export default getTheme;
