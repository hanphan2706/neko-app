import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();
const { breakpoints } = defaultTheme;

export const theme = {
  ...defaultTheme,
  overrides: {
    MuiButton: {
      root: {
        [breakpoints.down("md")]: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiTypography: {
      body2: {
        [breakpoints.down("md")]: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiInputBase: {
      root: {
        [breakpoints.down("md")]: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiSelect: {
      root: {
        [breakpoints.down("md")]: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiInputLabel: {
      root: {
        [breakpoints.down("md")]: {
          fontSize: "1.5rem",
        },
      },
    },
  },
};
